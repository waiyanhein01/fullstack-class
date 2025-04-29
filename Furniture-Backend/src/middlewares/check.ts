import { Request, Response, NextFunction } from "express";

interface userIdRequest extends Request {
  userId?: number;
}

export const check = (
  req: userIdRequest,
  res: Response,
  next: NextFunction
) => {
  // const error: any = new Error("Token has expired or is invalid");
  // error.status = 401;
  // error.errorCode = "TokenExpiredOrInvalid";
  // return next(error);

  req.userId = 123456;
  next();
};
