import { Request, Response, NextFunction } from "express";
import { getUserById } from "../services/authService";
import { errorCode } from "../../config/errorCode";
import { createError } from "../utils/errorUtil";

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
      return next(
        createError(
          "This account has not registered yet.",
          403,
          errorCode.unauthorized
        )
      );
    }

    const result = roles.includes(user.role);
    // console.log(result);

    if (permission && !result) {
      return next(
        createError("Admin can do this action.", 403, errorCode.unauthorized)
      );
    }

    if (!permission && result) {
      return next(
        createError("This action is not allowed.", 403, errorCode.unauthorized)
      );
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
