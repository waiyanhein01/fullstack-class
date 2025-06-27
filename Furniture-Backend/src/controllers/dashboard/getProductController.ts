import { Request, Response, NextFunction } from "express";
import { body, param, query, validationResult } from "express-validator";
import { errorCode } from "../../../config/errorCode";
import { createError } from "../../utils/errorUtil";
import { getUserById } from "../../services/authService";
import { checkUserIfNotExist } from "../../utils/authUtil";
import { getOrSetCache } from "../../utils/cacheUtil";
import { checkProductIfNotExist } from "../../utils/checkUtil";
import { getProductWithRelatedData } from "../../services/productService";

interface UserIdRequest extends Request {
  userId?: number;
}

export const getProduct = [
  param("id", "Product ID is required.").isInt({ gt: 0 }),
  async (req: UserIdRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      return next(createError(errors[0].msg, 400, errorCode.invalid));
    }

    const productId = req.params.id;
    const userId = req.userId;
    const user = await getUserById(userId!);
    checkUserIfNotExist(user);

    const cacheKey = `products:${JSON.stringify(productId)}`;
    const product = await getOrSetCache(cacheKey, async () => {
      return await getProductWithRelatedData(+productId);
    });

    checkProductIfNotExist(product);
    res.status(200).json({ message: "Product fetched successfully.", product });
  },
];
