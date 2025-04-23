import { Request, Response, NextFunction } from "express";

interface userIdRequest extends Request {
  userId?: number;
}

export const check = (
  req: userIdRequest,
  res: Response,
  next: NextFunction
) => {
  req.userId = 1234;
  next();
};
