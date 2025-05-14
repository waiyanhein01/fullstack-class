import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const register = [
  body("register", "Invalid phone number")
    .trim()
    .notEmpty()
    .matches("^[0-9]+$")
    .isLength({ min: 5, max: 12 }),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      const error: any = new Error(errors[0].msg);
      error.status = 400;
      error.errorCode = "Error_Invalid";
      return next(error);
    }
    res.status(200).json({ message: "Register success" });
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
