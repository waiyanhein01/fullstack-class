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
  getCategoryTypeLists,
  getProductWithRelatedData,
  getTypeLists,
} from "../../services/productService";
import {
  addProductToFavourite,
  removeProductFromFavourite,
} from "../../services/userService";
import cacheQueue from "../../jobs/queues/cacheQueue";
import { prisma } from "../../services/prismaClientService";

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
      return await getProductWithRelatedData(+productId, user!.id);
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

export const getAllProductsByOffsetPagination = [
  query("page", "Page number is invalid.").isInt({ gt: 0 }).optional(),
  query("limit", "Limit number is invalid.").isInt({ gt: 4 }).optional(),
  async (req: UserIdRequest, res: Response, next: NextFunction) => {
    // --- Validation (No changes, this is good) ---
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      return next(createError(errors[0].msg, 400, errorCode.invalid));
    }

    // --- Setup and Authentication (No changes) ---
    const userId = req.userId;
    const user = await getUserById(userId!);
    checkUserIfNotExist(user);

    // --- Improved Pagination Logic ---
    // 1. Use parseInt for safer type conversion
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 5;
    const skip = (page - 1) * limit;

    // 2. Create a more stable cache key
    const cacheKey = `products:page:${page}:limit:${limit}`;

    // 3. Get paginated data and total count from cache or DB
    const { products, totalProducts } = await getOrSetCache(
      cacheKey,
      async () => {
        // Use a transaction to get both data and count in one DB roundtrip
        const [products, total] = await prisma.$transaction([
          prisma.product.findMany({
            skip: skip,
            take: limit, // Only fetch the exact number needed for the page
            select: {
              id: true,
              name: true,
              description: true,
              price: true,
              discount: true,
              inventory: true,
              status: true,
              images: {
                select: { id: true, path: true },
                take: 1,
              },
            },
            orderBy: { id: "desc" },
          }),
          prisma.product.count(), // Get the total count of all products
        ]);
        return { products: products, totalProducts: total };
      }
    );

    // 4. Calculate pagination metadata based on the total count
    const totalPages = Math.ceil(totalProducts / limit);
    const currentPage = page;
    const hasNextPage = currentPage < totalPages;
    const hasPreviousPage = currentPage > 1;
    const nextPage = hasNextPage ? currentPage + 1 : null;
    const previousPage = hasPreviousPage ? currentPage - 1 : null;

    // --- Final Response ---
    res.status(200).json({
      message: "Get all products by offset pagination.",
      pagination: {
        totalProducts,
        totalPages,
        currentPage,
        hasNextPage,
        hasPreviousPage,
        nextPage,
        previousPage,
      },
      products,
    });
  },
];

export const getCategoryType = [
  async (req: UserIdRequest, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const user = await getUserById(userId!);
    checkUserIfNotExist(user);

    const categories = await getCategoryTypeLists();
    const types = await getTypeLists();
    res
      .status(200)
      .json({ message: "Get all category and type.", categories, types });
  },
];

export const favouriteProductToggle = [
  body("productId", "Product ID is invalid.").isInt({ gt: 0 }),
  body("favourite", "Favourite status is invalid.").isBoolean(),
  async (req: UserIdRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      return next(createError(errors[0].msg, 400, errorCode.invalid));
    }

    const userId = req.userId;
    const user = await getUserById(userId!);
    checkUserIfNotExist(user);

    const { productId, favourite } = req.body;

    if (favourite) {
      await addProductToFavourite(user!.id, productId);
    } else {
      await removeProductFromFavourite(user!.id, productId);
    }

    cacheQueue.add(
      "cache-product-favourite",
      {
        pattern: "products:*",
      },
      // This is optional, but can be useful for debugging
      {
        jobId: `Invalidate - ${Date.now()}`,
        priority: 1,
      }
    );

    res.status(200).json({
      message: `Product ${favourite ? "added to" : "removed from"} favourite.`,
    });
  },
];
