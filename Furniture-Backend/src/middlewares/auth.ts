import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { errorCode } from "../../config/errorCode";

interface UserIdRequest extends Request {
  userId?: number;
}

export const auth = (req: UserIdRequest, res: Response, next: NextFunction) => {
  const accessToken = req.cookies ? req.cookies.accessToken : null;
  const refreshToken = req.cookies ? req.cookies.refreshToken : null;

  if (!refreshToken) {
    const error: any = new Error("You are unauthenticated user.");
    error.status = 401;
    error.errorCode = errorCode.unauthenticated;
    return next(error);
  }

  if (!accessToken) {
    const error: any = new Error("Token has expired.");
    error.status = 401;
    error.errorCode = errorCode.accessTokenExpired;
    return next(error);
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET!
    ) as {
      id: number;
    };
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      error.message = "Token has expired.";
      error.status = 401;
      error.errorCode = errorCode.accessTokenExpired;
    } else {
      error.message = "Token is invalid.";
      error.status = 400;
      error.errorCode = errorCode.attack;
    }
    return next(error);
  }

  req.userId = decodedToken.id;

  next();
};
