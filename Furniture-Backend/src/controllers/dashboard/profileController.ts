import { Request, Response, NextFunction } from "express";
import { query, validationResult } from "express-validator";
import { errorCode } from "../../../config/errorCode";
import { checkUserIfNotExist } from "../../utils/authUtil";
import { authorizeUtil } from "../../utils/authoriseUtil";
import { getUserById, updateUser } from "../../services/authService";
import { checkImageFromMulterSupport } from "../../utils/checkUtil";
import { unlink } from "fs/promises";
import path from "path";
import sharp from "sharp";

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

//single profile image
export const profileImageUpload = async (
  req: UserIdRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId;
  const user = await getUserById(userId!);
  checkUserIfNotExist(user);

  const image = req.file;
  checkImageFromMulterSupport(image);

  const fileName = image?.filename;

  if (user?.image) {
    try {
      const filePath = path.join(
        __dirname,
        `../../../uploads/images/${user?.image}`
      );
      await unlink(filePath);
    } catch (error) {
      console.log(error);
    }
  }

  const userData = {
    image: fileName,
  };

  await updateUser(userId!, userData);
  res
    .status(200)
    .json({ message: "Upload profile image successfully.", image: fileName });
};

//multiple profile image
export const profileImageUploadMultiple = async (
  req: UserIdRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId;
  const user = await getUserById(userId!);
  checkUserIfNotExist(user);

  const images = req.files;
  checkImageFromMulterSupport(images);

  console.log(images);

  res.status(200).json({ message: "Multiple upload image successfully." });
};

//optimized profile image
export const profileImageOptimizedUpload = async (
  req: UserIdRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId;
  const user = await getUserById(userId!);
  checkUserIfNotExist(user);

  const image = req.file;
  checkImageFromMulterSupport(image);

  const fileName = Date.now() + "-" + `${Math.round(Math.random() * 1e9)}.webp`;

  const filePath = path.join(__dirname, `../../../uploads/images/${fileName}`);
  try {
    await sharp(req.file?.buffer)
      .resize(200, 200)
      .webp({ quality: 50 })
      .toFile(filePath);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Optimized upload image failed." });
    return;
  }

  if (user?.image) {
    try {
      const filePath = path.join(
        __dirname,
        `../../../uploads/images/${user?.image}`
      );
      await unlink(filePath);
    } catch (error) {
      console.log(error);
    }
  }

  const userData = {
    image: fileName,
  };

  await updateUser(userId!, userData);

  res
    .status(200)
    .json({ message: "Optimized upload image successfully.", image: fileName });
};
