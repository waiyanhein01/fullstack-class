import { Request, Response, NextFunction } from "express";
import { body, param, query, validationResult } from "express-validator";
import { errorCode } from "../../../config/errorCode";
import { createError } from "../../utils/errorUtil";
import { getUserById } from "../../services/authService";
import { checkUserIfNotExist } from "../../utils/authUtil";
import { getOrSetCache } from "../../utils/cacheUtil";
import { checkProductIfNotExist } from "../../utils/checkUtil";
import {
  getAllProductsLists,
  getProductWithRelatedData,
} from "../../services/productService";

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

// cursor pagination
// This is a more efficient way to paginate through large datasets
export const getAllProductsByCursorPagination = [
  query("cursor", "Cursor is invalid.").isInt({ gt: 0 }).optional(),
  query("limit", "Limit number is invalid.").isInt({ gt: 2 }).optional(),
  async (req: UserIdRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      return next(createError(errors[0].msg, 400, errorCode.invalid));
    }

    const lastCursor = req.query.cursor; // Default to cursor 1 if not provided
    const limit = req.query.limit || 5; // Default to 5 items per page
    const category = req.query.category;
    const type = req.query.type;

    const userId = req.userId;
    const user = await getUserById(userId!);
    checkUserIfNotExist(user);

    // for req query custom category and type validation
    let categoryList: number[] = [];
    let typeList: number[] = [];

    if (category) {
      categoryList = category
        .toString()
        .split(",")
        .map((c) => Number(c))
        .filter((c) => c > 0);
    }

    if (type) {
      typeList = type
        .toString()
        .split(",")
        .map((t) => Number(t))
        .filter((t) => t > 0);
    }

    // for filter by category and type
    const where: any = {
      AND: [
        categoryList.length > 0 ? { categoryId: { in: categoryList } } : {},
        typeList.length > 0 ? { typeId: { in: typeList } } : {},
      ],
    };

    const options = {
      where,
      cursor: lastCursor ? { id: +lastCursor } : undefined, // Convert cursor to number if provided
      take: +limit + 1, // Fetch one more item to check if there is a next page
      skip: lastCursor ? 1 : 0, // Skip the cursor item if provided
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        discount: true,
        inventory: true,
        status: true,
        images: {
          select: {
            id: true,
            path: true,
          },
          take: 1, // Limit to one image per product
        },
      },
      orderBy: {
        id: "desc", // Order by ID in descending order
      },
    };

    const cacheKey = `products:${JSON.stringify(req.query)}`;
    const products = await getOrSetCache(cacheKey, async () => {
      return getAllProductsLists(options);
    });

    const hasNextPage = products.length > +limit; // Check if there is a next page
    if (hasNextPage) {
      products.pop(); // Remove the last item if it exceeds the limit
    }

    const nextCursor =
      products.length > 0 ? products[products.length - 1].id : null;

    res.status(200).json({
      message: "Get all products by cursor pagination.",
      prevCursor: lastCursor,
      nextCursor,
      hasNextPage,
      products,
    });
  },
];

export const getCategoryType = [
  async (req: UserIdRequest, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const user = await getUserById(userId!);
    checkUserIfNotExist(user);

    res.status(200).json({ message: "Get all category and type." });
  },
];
