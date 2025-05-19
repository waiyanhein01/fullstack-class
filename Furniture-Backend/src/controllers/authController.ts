import { userData } from "./../../prisma/seed";
import {
  checkOtpErrorIfSameDate,
  checkOtpExistRow,
  checkUserIfNotExist,
} from "../utils/authUtil";
import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import {
  createOtp,
  createUser,
  getOtpByPhone,
  getUserByPhone,
  updateOtp,
  updateUser,
} from "../services/authService";
import { checkUserExist } from "../utils/authUtil";
import { generateOtp, generateToken } from "../utils/generateOtpUtil";
import bcrypt from "bcrypt";
import moment from "moment";
import jwt from "jsonwebtoken";

export const register = [
  body("phone", "Invalid phone number")
    .trim()
    .notEmpty()
    .matches("^[0-9]+$")
    .isLength({ min: 5, max: 12 }),
  async (req: Request, res: Response, next: NextFunction) => {
    // error handling
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      const error: any = new Error(errors[0].msg);
      error.status = 400;
      error.errorCode = "Error_Invalid";
      return next(error);
    }
    // slice user input phone 09
    let phone = req.body.phone;
    if (phone.slice(0, 2) === "09") {
      phone = phone.substring(2, phone.length);
    }
    // check user exist
    const user = await getUserByPhone(phone);
    checkUserExist(user);

    // generate otp and token
    const otp = "123456"; // For development
    // const otp = generateOtp(); For production
    const token = generateToken(); // For remember token

    // hash otp
    const salt = await bcrypt.genSalt(10);
    const hashedOtp = await bcrypt.hash(otp.toString(), salt);

    //check otp exist is not by phone
    const isExistOtpRow = await getOtpByPhone(phone);
    let result;
    if (!isExistOtpRow) {
      // send otp data to database
      const otpData = {
        phone,
        otp: hashedOtp,
        rememberToken: token,
        count: 1,
      };

      // create otpTable in database process
      result = await createOtp(otpData);
    } else {
      const lastRequestDate = new Date(
        isExistOtpRow.updatedAt
      ).toLocaleDateString();
      const todayDate = new Date().toLocaleDateString();
      const isSameDate = lastRequestDate === todayDate;
      checkOtpErrorIfSameDate(isSameDate, isExistOtpRow.error);
      if (!isSameDate) {
        const otpData = {
          phone,
          otp: hashedOtp,
          rememberToken: token,
          count: 1,
        };
        result = await updateOtp(isExistOtpRow.id, otpData);
      } else {
        if (isExistOtpRow.count === 3) {
          const error: any = new Error("OTP limit has been exceeded");
          error.status = 405;
          error.errorCode = "Error_LimitExceeded";
          return next(error);
        } else {
          const otpData = {
            phone,
            otp: hashedOtp,
            rememberToken: token,
            count: {
              increment: 1,
            },
          };
          result = await updateOtp(isExistOtpRow.id, otpData);
        }
      }
    }

    res.status(200).json({
      message: `Otp has been sent successfully to your phone 09${result.phone}`,
      phone: result.phone,
      token: result.rememberToken,
    });
  },
];

export const verifyOtp = [
  body("phone", "Invalid phone number")
    .trim()
    .notEmpty()
    .matches("^[0-9]+$")
    .isLength({ min: 5, max: 12 }),
  body("otp", "Invalid otp")
    .trim()
    .notEmpty()
    .matches("^[0-9]+$")
    .isLength({ min: 6, max: 6 }),
  body("token", "Invalid token").trim().notEmpty().escape(),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      const error: any = new Error(errors[0].msg);
      error.status = 400;
      error.errorCode = "Error_Invalid";
      return next(error);
    }

    const { phone, otp, token } = req.body;
    // check user exist with this phone number
    const user = await getUserByPhone(phone);
    checkUserExist(user);

    //check phone number correct or not in otp row
    const isExistOtpRow = await getOtpByPhone(phone);
    checkOtpExistRow(isExistOtpRow);

    // check request otp last date with updatedUp in table OTP and today date
    const lastVerifyOtpDate = new Date(
      isExistOtpRow!.updatedAt
    ).toLocaleDateString();
    const todayDate = new Date().toLocaleDateString();
    const isSameDate = lastVerifyOtpDate === todayDate;
    checkOtpErrorIfSameDate(isSameDate, isExistOtpRow!.error);

    // check otp remember token and user input token is same or not and over limit
    const isSameToken = isExistOtpRow?.id !== token;

    // token is wrong
    if (!isSameToken) {
      const otpData = {
        error: 5,
      };
      await updateOtp(isExistOtpRow!.id, otpData);

      const error: any = new Error("Invalid token.");
      error.status = 400;
      error.errorCode = "Error_InvalidToken";
      return next(error);
    }

    // check otp is expired or not
    const isExpired = moment().diff(isExistOtpRow!.updatedAt, "minutes") > 2;

    // otp is expired
    if (isExpired) {
      const error: any = new Error("OTP is expired.");
      error.status = 403;
      error.errorCode = "Error_Expired";
      return next(error);
    }

    //otp is wrong
    const isMatchOtp = await bcrypt.compare(otp, isExistOtpRow!.otp);
    if (!isMatchOtp) {
      if (isSameDate) {
        // if not first time otp is wrong same date
        const otpData = {
          error: {
            increment: 1,
          },
        };
        await updateOtp(isExistOtpRow!.id, otpData);
      } else {
        //if first time
        const otpData = {
          error: 1,
        };
        await updateOtp(isExistOtpRow!.id, otpData);
      }
      const error: any = new Error("OTP is incorrect.");
      error.status = 400;
      error.errorCode = "Error_InvalidOtp";
      return next(error);
    }

    //all are ok
    const verifyToken = generateToken();
    const otpData = {
      verifyToken,
      error: 0,
      count: 1,
    };
    const result = await updateOtp(isExistOtpRow!.id, otpData);

    res.status(200).json({
      message: "OTP verification successfully.",
      token: result.verifyToken,
      phone: result.phone,
    });
  },
];

export const confirmPassword = [
  body("phone", "Invalid phone number")
    .trim()
    .notEmpty()
    .matches("^[0-9]+$")
    .isLength({ min: 5, max: 12 }),
  body("password", "Invalid password")
    .trim()
    .notEmpty()
    .matches("^[0-9]+$")
    .isLength({ min: 8, max: 8 }),
  body("token", "Invalid token").trim().notEmpty().escape(),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      const error: any = new Error(errors[0].msg);
      error.status = 400;
      error.errorCode = "Error_Invalid";
      return next(error);
    }

    const { phone, password, token } = req.body;

    // check user exist in user table with this phone number
    const user = await getUserByPhone(phone);
    checkUserExist(user);

    //check phone number correct or not in otp row
    const isExistOtpRow = await getOtpByPhone(phone);
    checkOtpExistRow(isExistOtpRow);

    //check otp error count is over limit
    if (isExistOtpRow?.error === 5) {
      const error: any = new Error("This request is invalid.");
      error.status = 400;
      error.errorCode = "Error_RequestInvalid";
      return next(error);
    }

    //Check token is valid or not
    const isSameToken = isExistOtpRow!.verifyToken === token;
    if (!isSameToken) {
      const otpData = {
        error: 5,
      };
      await updateOtp(isExistOtpRow!.id, otpData);

      const error: any = new Error("Invalid token.");
      error.status = 400;
      error.errorCode = "Error_InvalidToken";
      return next(error);
    }

    // check user request is expired or not
    const isUserRequestExpired =
      moment().diff(isExistOtpRow!.updatedAt, "minutes") > 10;
    if (isUserRequestExpired) {
      const error: any = new Error("Your request is expired.Please try again.");
      error.status = 403;
      error.errorCode = "Error_Expired";
      return next(error);
    }

    //create acc
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      phone,
      password: hashedPassword,
      randToken: "This will be replaced later",
    };

    const newUser = await createUser(userData);

    //jwt token
    const acceptTokenPayload = {
      userId: newUser.id,
    };

    const refreshTokenPayload = {
      phone: newUser.phone,
      userId: newUser.id,
    };

    const acceptToken = jwt.sign(
      acceptTokenPayload,
      process.env.ACCESS_TOKEN_SECRETS!,
      {
        expiresIn: 60 * 15,
      }
    );

    const refreshToken = jwt.sign(
      refreshTokenPayload,
      process.env.REFRESH_TOKEN_SECRETS!,
      {
        expiresIn: "30d",
      }
    );

    await updateUser(newUser.id, {
      randToken: refreshToken,
    });
    res
      .cookie("accessToken", acceptToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 15 * 60 * 1000, // 15 minutes
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      })
      .status(201)
      .json({
        message: "Your account has been created.",
        userId: newUser.id,
      });
  },
];

export const login = [
  body("phone", "Invalid phone number")
    .trim()
    .notEmpty()
    .matches("^[0-9]+$")
    .isLength({ min: 5, max: 12 }),
  body("password", "Password must be 8 digits")
    .trim()
    .notEmpty()
    .matches("^[0-9]+$")
    .isLength({ min: 8, max: 8 }),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      const error: any = new Error(errors[0].msg);
      error.status = 400;
      error.errorCode = "Error_Invalid";
      return next(error);
    }
    const password = req.body.password;
    let phone = req.body.phone;

    if (phone.slice(0, 2) === "09") {
      phone = phone.substring(2, phone.length);
    }

    // check user not exist
    const user = await getUserByPhone(phone);
    checkUserIfNotExist(user);

    // check status is freeze
    if (user?.status === "FREEZE") {
      const error: any = new Error(
        "Your account is freeze. Please contact to us."
      );
      error.status = 403;
      error.errorCode = "Error_AccountFreeze";
      return next(error);
    }

    // check incorrect password
    const isMatchPassword = await bcrypt.compare(password, user!.password);
    if (!isMatchPassword) {
      const lastRequestDate = new Date(user!.updatedAt).toLocaleDateString();
      const loginSameDate = lastRequestDate === new Date().toLocaleDateString();
      if (!loginSameDate) {
        const userData = {
          errorLoginCount: 1,
        };
        await updateUser(user!.id, userData);
      } else {
        if (user!.errorLoginCount >= 2) {
          const userData = {
            status: "FREEZE",
          };
          await updateUser(user!.id, userData);
        } else {
          const userData = {
            errorLoginCount: {
              increment: 1,
            },
          };
          await updateUser(user!.id, userData);
        }
      }
      const error: any = new Error("Password is incorrect.");
      error.status = 400;
      error.errorCode = "Error_InvalidPassword";
      return next(error);
    }

    // all are ok
    const acceptTokenPayload = {
      userId: user!.id,
    };

    const refreshTokenPayload = {
      phone: user!.phone,
      userId: user!.id,
    };

    const acceptToken = jwt.sign(
      acceptTokenPayload,
      process.env.ACCESS_TOKEN_SECRETS!,
      {
        expiresIn: 60 * 15,
      }
    );

    const refreshToken = jwt.sign(
      refreshTokenPayload,
      process.env.REFRESH_TOKEN_SECRETS!,
      {
        expiresIn: "30d",
      }
    );

    await updateUser(user!.id, {
      errorLoginCount: 0,
      randToken: refreshToken,
    });
    res
      .cookie("accessToken", acceptToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 15 * 60 * 1000, // 15 minutes
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

    res.status(200).json({ message: "Login successfully.", userId: user!.id });
  },
];
