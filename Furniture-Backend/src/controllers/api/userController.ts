import { auth } from "./../../middlewares/auth";
import { Request, Response, NextFunction } from "express";
import { query, validationResult } from "express-validator";
import { errorCode } from "../../../config/errorCode";
import { checkUserIfNotExist } from "../../utils/authUtil";
import { title } from "process";
import { authorizeUtil } from "../../utils/authoriseUtil";
import { getUserById } from "../../services/authService";

interface UserIdRequest extends Request {
  userId?: number;
  user?: any;
}

export const changeLanguage = [
  query("lng", "Language code is invalid.")
    .trim()
    .notEmpty()
    .matches("^[a-z]+$")
    .isLength({ min: 2, max: 3 }),
  async (req: UserIdRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      const error: any = new Error(errors[0].msg);
      error.status = 400;
      error.errorCode = errorCode.invalid;
      return next(error);
    }

    const { lng } = req.query;
    res.cookie("i18next", lng);
    res.status(200).json({ message: req.t("changeLan", { lang: lng }) });
  },
];

export const testPermission = async (
  req: UserIdRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId;
  const user = await getUserById(userId!);
  checkUserIfNotExist(user);

  const info: any = {
    title: "This is title",
  };

  const authorizeUser = authorizeUtil(true, "AUTHOR", user!.role);

  if (authorizeUser) {
    info.content = "This is content";
  }
  res.status(200).json({
    currentRole: user!.role,
    info,
  });
};
