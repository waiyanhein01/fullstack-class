import { checkOtpErrorIfSameDate } from "./../utils/authUtils";
import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import {
  createOtp,
  getOtpByPhone,
  getUserByPhone,
  updateOtp,
} from "../services/authService";
import { checkUserExist } from "../utils/authUtils";
import { generateOtp, generateRememberToken } from "../utils/generateOtpUtils";
import bcrypt from "bcrypt";
import { exit } from "process";

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
    const token = generateRememberToken();

    // hash otp
    const salt = await bcrypt.genSalt(10);
    const hashedOtp = await bcrypt.hash(otp.toString(), salt);

    //check otp exist is not by phone
    const isExistOtp = await getOtpByPhone(phone);
    let result;
    if (!isExistOtp) {
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
        isExistOtp.updatedAt
      ).toLocaleDateString();
      const todayDate = new Date().toLocaleDateString();
      const isSameDate = lastRequestDate === todayDate;
      checkOtpErrorIfSameDate(isSameDate, isExistOtp.error);
      if (!isSameDate) {
        const otpData = {
          phone,
          otp: hashedOtp,
          rememberToken: token,
          count: 1,
        };
        result = await updateOtp(isExistOtp.id, otpData);
      } else {
        if (isExistOtp.count === 3) {
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
          result = await updateOtp(isExistOtp.id, otpData);
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
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      const error: any = new Error(errors[0].msg);
      error.status = 400;
      error.errorCode = "Error_Invalid";
      return next(error);
    }
    res.status(200).json({ message: "Verify otp successful" });
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
