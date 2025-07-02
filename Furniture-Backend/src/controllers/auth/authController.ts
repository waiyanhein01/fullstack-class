import { Request, Response, NextFunction } from "express";
import {
  checkOtpErrorIfSameDate,
  checkOtpExistRow,
  checkUserIfNotExist,
} from "../../utils/authUtil";
import { body, validationResult } from "express-validator";
import {
  createOtp,
  createUser,
  getOtpByPhone,
  getUserById,
  getUserByPhone,
  updateOtp,
  updateUser,
} from "../../services/authService";
import { checkUserExist } from "../../utils/authUtil";
import { generateOtp, generateToken } from "../../utils/generateOtpUtil";
import { errorCode } from "../../../config/errorCode";
import { createError } from "../../utils/errorUtil";

import bcrypt from "bcrypt";
import moment from "moment";
import jwt from "jsonwebtoken";

interface UserIdRequest extends Request {
  userId?: number;
}

export const register = [
  body("phone", "Invalid phone number.")
    .trim()
    .notEmpty()
    .matches("^[0-9]+$")
    .isLength({ min: 5, max: 12 }),
  async (req: Request, res: Response, next: NextFunction) => {
    // error handling
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      return next(createError(errors[0].msg, 400, errorCode.invalid));
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
          return next(
            createError("OTP limit has been exceeded", 405, errorCode.overLimit)
          );
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
  body("phone", "Invalid phone number.")
    .trim()
    .notEmpty()
    .matches("^[0-9]+$")
    .isLength({ min: 5, max: 12 }),
  body("otp", "Invalid otp.")
    .trim()
    .notEmpty()
    .matches("^[0-9]+$")
    .isLength({ min: 6, max: 6 }),
  body("token", "Invalid token.").trim().notEmpty().escape(),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      return next(createError(errors[0].msg, 400, errorCode.invalid));
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
    const isSameToken = isExistOtpRow?.rememberToken === token;

    // token is wrong
    if (!isSameToken) {
      const otpData = {
        error: 5,
      };
      await updateOtp(isExistOtpRow!.id, otpData);

      return next(createError("Invalid token.", 400, errorCode.invalid));
    }

    // check otp is expired or not
    const isExpired = moment().diff(isExistOtpRow!.updatedAt, "minutes") > 2;

    // otp is expired
    if (isExpired) {
      return next(createError("OTP is expired.", 403, errorCode.otpExpired));
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
      return next(createError("OTP is incorrect.", 400, errorCode.otpExpired));
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
      phone: result.phone,
      token: result.verifyToken,
    });
  },
];

export const confirmPassword = [
  body("phone", "Invalid phone number.")
    .trim()
    .notEmpty()
    .matches("^[0-9]+$")
    .isLength({ min: 5, max: 12 }),
  body("password", "Invalid password.")
    .trim()
    .notEmpty()
    .matches("^[0-9]+$")
    .isLength({ min: 8, max: 8 }),
  body("token", "Invalid token.").trim().notEmpty().escape(),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      return next(createError(errors[0].msg, 400, errorCode.invalid));
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
      return next(
        createError("This request is over limit.", 400, errorCode.overLimit)
      );
    }

    //Check token is valid or not
    const isSameToken = isExistOtpRow!.verifyToken === token;
    if (!isSameToken) {
      const otpData = {
        error: 5,
      };
      await updateOtp(isExistOtpRow!.id, otpData);

      return next(createError("Invalid token.", 400, errorCode.invalid));
    }

    // check user request is expired or not
    const isUserRequestExpired =
      moment().diff(isExistOtpRow!.updatedAt, "minutes") > 10;
    if (isUserRequestExpired) {
      return next(
        createError(
          "Your request is expired. Please try again.",
          403,
          errorCode.requestExpired
        )
      );
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
      id: newUser.id,
    };

    const refreshTokenPayload = {
      phone: newUser.phone,
      id: newUser.id,
    };

    const acceptToken = jwt.sign(
      acceptTokenPayload,
      process.env.ACCESS_TOKEN_SECRET!,
      {
        expiresIn: 60 * 15,
      }
    );

    const refreshToken = jwt.sign(
      refreshTokenPayload,
      process.env.REFRESH_TOKEN_SECRET!,
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
  body("phone", "Invalid phone number.")
    .trim()
    .notEmpty()
    .matches("^[0-9]+$")
    .isLength({ min: 5, max: 12 }),
  body("password", "Password must be 8 digits.")
    .trim()
    .notEmpty()
    .matches("^[0-9]+$")
    .isLength({ min: 8, max: 8 }),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      return next(createError(errors[0].msg, 400, errorCode.invalid));
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
    if (user!.status === "FREEZE") {
      return next(
        createError(
          "Your account is freeze. Please contact to us.",
          403,
          errorCode.accountFreeze
        )
      );
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

      return next(
        createError("Password is incorrect.", 400, errorCode.invalid)
      );
    }

    // authorization token
    const accessTokenPayload = {
      id: user!.id,
    };

    const refreshTokenPayload = {
      phone: user!.phone,
      id: user!.id,
    };

    const accessToken = jwt.sign(
      accessTokenPayload,
      process.env.ACCESS_TOKEN_SECRET!,
      {
        expiresIn: 60 * 15,
      }
    );

    const refreshToken = jwt.sign(
      refreshTokenPayload,
      process.env.REFRESH_TOKEN_SECRET!,
      {
        expiresIn: "30d",
      }
    );

    const userData = {
      errorLoginCount: 0,
      randToken: refreshToken,
    };

    await updateUser(user!.id, userData);

    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 15 * 60 * 1000, // 15 minutes
        path: "/",
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        path: "/",
      });

    res.status(200).json({ message: "Login successfully.", userId: user!.id });
  },
];

export const forgetPassword = [
  body("phone", "Invalid phone number.")
    .trim()
    .notEmpty()
    .matches("^[0-9]+$")
    .isLength({ min: 5, max: 12 }),
  async (req: Request, res: Response, next: NextFunction) => {
    // error handling
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      return next(createError(errors[0].msg, 400, errorCode.invalid));
    }

    // slice user input phone 09
    let phone = req.body.phone;
    if (phone.slice(0, 2) === "09") {
      phone = phone.substring(2, phone.length);
    }
    // check user not exist
    const user = await getUserByPhone(phone);
    checkUserIfNotExist(user);

    // generate otp and token
    const otp = "123456"; // For development
    // const otp = generateOtp(); For production

    // hash otp
    const salt = await bcrypt.genSalt(10);
    const hashedOtp = await bcrypt.hash(otp.toString(), salt);
    const token = generateToken(); // For remember token

    //check otp exist is not by phone
    const isExistOtpRow = await getOtpByPhone(phone);

    let result;
    const lastRequestDate = new Date(
      isExistOtpRow!.updatedAt
    ).toLocaleDateString();
    const todayDate = new Date().toLocaleDateString();
    const isSameDate = lastRequestDate === todayDate;
    checkOtpErrorIfSameDate(isSameDate, isExistOtpRow!.error);
    if (!isSameDate) {
      const otpData = {
        otp: hashedOtp,
        rememberToken: token,
        count: 1,
        error: 0,
      };
      result = await updateOtp(isExistOtpRow!.id, otpData);
    } else {
      if (isExistOtpRow!.count === 3) {
        return next(
          createError("OTP limit has been exceeded", 405, errorCode.overLimit)
        );
      } else {
        const otpData = {
          otp: hashedOtp,
          rememberToken: token,
          count: {
            increment: 1,
          },
        };
        result = await updateOtp(isExistOtpRow!.id, otpData);
      }
    }

    res.status(200).json({
      message: `Reset password OTP has been sent to 09${result.phone}`,
      phone: result.phone,
      token: result.rememberToken,
    });
  },
];

export const verifyResetOtp = [
  body("phone", "Invalid phone number.")
    .trim()
    .notEmpty()
    .matches("^[0-9]+$")
    .isLength({ min: 5, max: 12 }),
  body("otp", "Invalid otp.")
    .trim()
    .notEmpty()
    .matches("^[0-9]+$")
    .isLength({ min: 6, max: 6 }),
  body("token", "Invalid token.").trim().notEmpty().escape(),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      return next(createError(errors[0].msg, 405, errorCode.invalid));
    }

    const { phone, otp, token } = req.body;
    // check user exist with this phone number
    const user = await getUserByPhone(phone);
    checkUserIfNotExist(user);

    //check phone number correct or not in otp row
    const isExistOtpRow = await getOtpByPhone(phone);

    // check request otp last date with updatedUp in table OTP and today date
    const lastVerifyOtpDate = new Date(
      isExistOtpRow!.updatedAt
    ).toLocaleDateString();
    const todayDate = new Date().toLocaleDateString();
    const isSameDate = lastVerifyOtpDate === todayDate;
    checkOtpErrorIfSameDate(isSameDate, isExistOtpRow!.error);

    // check otp remember token and user input token is same or not and over limit
    const isSameToken = isExistOtpRow?.rememberToken === token;

    // token is wrong
    if (!isSameToken) {
      const otpData = {
        error: 5,
      };
      await updateOtp(isExistOtpRow!.id, otpData);

      return next(createError("Invalid token.", 400, errorCode.invalid));
    }

    // check otp is expired or not
    const isExpired = moment().diff(isExistOtpRow!.updatedAt, "minutes") > 2;

    // otp is expired
    if (isExpired) {
      return next(createError("OTP is expired.", 403, errorCode.otpExpired));
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

      return next(createError("OTP is incorrect.", 400, errorCode.invalid));
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
      phone: result.phone,
      token: result.verifyToken,
    });
  },
];

export const resetPassword = [
  body("phone", "Invalid phone number.")
    .trim()
    .notEmpty()
    .matches("^[0-9]+$")
    .isLength({ min: 5, max: 12 }),
  body("password", "Invalid password.")
    .trim()
    .notEmpty()
    .matches("^[0-9]+$")
    .isLength({ min: 8, max: 8 }),
  body("token", "Invalid token.").trim().notEmpty().escape(),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      return next(createError(errors[0].msg, 405, errorCode.invalid));
    }

    const { phone, password, token } = req.body;

    // check user exist in user table with this phone number
    const user = await getUserByPhone(phone);
    checkUserIfNotExist(user);

    //check phone number correct or not in otp row
    const isExistOtpRow = await getOtpByPhone(phone);

    //check otp error count is over limit
    if (isExistOtpRow?.error === 5) {
      return next(
        createError("This request is over limit.", 400, errorCode.overLimit)
      );
    }

    //Check token is valid or not
    const isSameToken = isExistOtpRow!.verifyToken === token;
    if (!isSameToken) {
      const otpData = {
        error: 5,
      };
      await updateOtp(isExistOtpRow!.id, otpData);

      return next(createError("Invalid token.", 400, errorCode.invalid));
    }

    // check user request is expired or not
    const isUserRequestExpired =
      moment().diff(isExistOtpRow!.updatedAt, "minutes") > 10;
    if (isUserRequestExpired) {
      return next(
        createError(
          "Your request is expired. Please try again.",
          403,
          errorCode.requestExpired
        )
      );
    }

    //create acc
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //jwt token
    const acceptTokenPayload = {
      id: user!.id,
    };

    const refreshTokenPayload = {
      phone: user!.phone,
      id: user!.id,
    };

    const acceptToken = jwt.sign(
      acceptTokenPayload,
      process.env.ACCESS_TOKEN_SECRET!,
      {
        expiresIn: 60 * 15,
      }
    );

    const refreshToken = jwt.sign(
      refreshTokenPayload,
      process.env.REFRESH_TOKEN_SECRET!,
      {
        expiresIn: "30d",
      }
    );

    const updateUserData = {
      password: hashedPassword,
      randToken: refreshToken,
    };
    await updateUser(user!.id, updateUserData);

    res
      .cookie("accessToken", acceptToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 15 * 60 * 1000, // 15 minutes
        path: "/",
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        path: "/",
      })
      .status(200)
      .json({
        message: "Password changed successfully.",
        userId: user!.id,
      });
  },
];

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // get refresh token
  const refreshToken = req.cookies ? req.cookies.refreshToken : null;
  if (!refreshToken) {
    return next(
      createError(
        "You are not authenticated user.",
        401,
        errorCode.unauthenticated
      )
    );
  }

  // verify refresh token
  let decodedRefreshToken;
  try {
    decodedRefreshToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    ) as {
      id: number;
      phone: string;
    };
  } catch (error) {
    return next(
      createError(
        "You are not authenticated user.",
        401,
        errorCode.unauthenticated
      )
    );
  }

  // check user
  if (isNaN(decodedRefreshToken.id)) {
    return next(
      createError(
        "You are not authenticated user.",
        401,
        errorCode.unauthenticated
      )
    );
  }
  const user = await getUserById(decodedRefreshToken.id);
  checkUserIfNotExist(user);

  // check phone
  if (user!.phone !== decodedRefreshToken.phone) {
    return next(
      createError(
        "You are not authenticated user.",
        401,
        errorCode.unauthenticated
      )
    );
  }

  // update rand token
  const userData = {
    randToken: generateToken(),
  };

  await updateUser(user!.id, userData);

  // clear cookie
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    path: "/",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    path: "/",
  });

  res.status(200).json({ message: "Logout successfully." });
};

export const authCheck = async (
  req: UserIdRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId;
  const user = await getUserById(userId!);
  checkUserIfNotExist(user);

  res.status(200).json({
    message: "You are authenticated user.",
    userId: user?.id,
    userName: user?.firstName + " " + user?.lastName,
    userImage: user?.image,
  });
};
