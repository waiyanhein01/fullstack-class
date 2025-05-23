import { Request, Response, NextFunction } from "express";
import { getUserById } from "../services/authService";
import { errorCode } from "../../config/errorCode";

interface UserIdRequest extends Request {
  userId?: number;
  user?: any;
}

// authorize(true, "ADMIN", "AUTHOR") deny "USER"
// authorize(false, "USER") allow "ADMIN", "AUTHOR"

const authorize = (permission: boolean, ...roles: string[]) => {
  return async (req: UserIdRequest, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const user = await getUserById(userId!);
    if (!user) {
      const error: any = new Error("This account has not registered yet.");
      error.status = 403;
      error.errorCode = errorCode.unauthorized;
      return next(error);
    }

    const result = roles.includes(user.role);
    // console.log(result);

    if (permission && !result) {
      const error: any = new Error("Admin can do this action.");
      error.status = 403;
      error.errorCode = errorCode.unauthorized;
      return next(error);
    }

    if (!permission && result) {
      const error: any = new Error("This action is not allowed.");
      error.status = 403;
      error.errorCode = errorCode.unauthorized;
      return next(error);
    }

    // Noted
    // authorize(true, "ADMIN", "AUTHOR") deny "USER"
    // if (true && !true) {
    //   const error: any = new Error("Admin can do this action.");
    //   error.status = 403;
    //   error.errorCode = errorCode.unauthorized;
    //   return next(error);
    // }

    req.user = user;
    next();
  };
};

export default authorize;
