import { Request, Response, NextFunction } from "express";
export const register = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: "Register" });
};

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
