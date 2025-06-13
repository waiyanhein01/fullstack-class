import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { errorCode } from "../../../config/errorCode";

interface UserIdRequest extends Request {
  userId?: number;
}

export const getAllPostsByPagination = [
  body("lng", "Language code is invalid.")
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

    res.status(200).json({ message: "Post fetched successfully." });
  },
];

export const getPostById = [
  body("lng", "Language code is invalid.")
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

    res.status(200).json({ message: "Post fetched successfully." });
  },
];
