import { Request, Response, NextFunction } from "express";
import { checkUserIfNotExist } from "../../utils/authUtil";

interface UserIdRequest extends Request {
  user?: any;
}

export const getAllUsers = (
  req: UserIdRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  checkUserIfNotExist(user);

  res.status(200).json({
    message: req.t("welcome"),
    currentRole: user!.role,
  });
};
