import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserIdRequest extends Request {
  userId?: number;
}

export const auth = (req: UserIdRequest, res: Response, next: NextFunction) => {
  const accessToken = req.cookies ? req.cookies.accessToken : null;
  const refreshToken = req.cookies ? req.cookies.refreshToken : null;

  if (!refreshToken) {
    const error: any = new Error("You are unauthenticated user");
    error.status = 401;
    error.errorCode = "Error_Unauthenticated";
    return next(error);
  }

  if (!accessToken) {
    const error: any = new Error("Token has expired");
    error.message = "Token has expired";
    error.status = 401;
    error.errorCode = "Error_TokenExpired";
    return next(error);
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRETS!
    ) as {
      id: number;
    };
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      error.message = "Token has expired";
      error.status = 401;
      error.errorCode = "Error_TokenExpired";
    } else {
      error.message = "Token is invalid";
      error.status = 400;
      error.errorCode = "Error_Attack";
    }
    return next(error);
  }

  req.userId = decodedToken.id;

  next();
};
