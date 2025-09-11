import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import { checkUserIfNotExist } from "../../utils/authUtil";
import { body, validationResult } from "express-validator";
import { createError } from "../../utils/errorUtil";
import { errorCode } from "../../../config/errorCode";
import { getAdminByName } from "../../services/adminService";

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

// login
export const adminLogin = [
  body("name", "Invalid username.")
    .trim()
    .notEmpty()
    .isLength({ min: 3, max: 52 }),
  body("password", "Password must be 8 digits.")
    .trim()
    .notEmpty()
    .matches("^[0-9]+$")
    .isLength({ min: 8, max: 8 }),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      return next(createError(errors[0].msg, 400, errorCode.invalid));
    }
    const password = req.body.password;
    let name = req.body.name;

    const admin = await getAdminByName(name);
    checkUserIfNotExist(admin);

    // check incorrect password
    const isMatchPassword = await bcrypt.compare(password, admin!.password);
    if (!isMatchPassword) {
      return next(
        createError("Password is incorrect.", 400, errorCode.invalid)
      );
    }

    res
      .status(200)
      .json({ message: "Login successfully.", adminId: admin!.id });
  },
];
