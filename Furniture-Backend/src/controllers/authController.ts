import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { getUserByPhone } from "../services/authService";
import { checkUserExist } from "../utils/authUtils";

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

    res.status(200).json({ message: phone });
  },
];

export const verifyOtp = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: "verify-otp" });
};

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
