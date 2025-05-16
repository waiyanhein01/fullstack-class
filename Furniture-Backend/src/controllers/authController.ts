import {
  checkOtpErrorIfSameDate,
  checkOtpExistRow,
} from "./../utils/authUtils";
import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import {
  createOtp,
  getOtpByPhone,
  getUserByPhone,
  updateOtp,
} from "../services/authService";
import { checkUserExist } from "../utils/authUtils";
import { generateOtp, generateToken } from "../utils/generateOtpUtils";
import bcrypt from "bcrypt";
import { exit } from "process";
import moment from "moment";

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
    let result = await updateOtp(isExistOtpRow!.id, otpData);

    res.status(200).json({
      message: "OTP verification successfully.",
      token: result.verifyToken,
      phone: result.phone,
    });
  },
];

export const confirmPassword = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200).json({ message: "confirm-password" });
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: "login" });
};
