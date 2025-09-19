import { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";
import { errorCode } from "../../../config/errorCode";
import { createError } from "../../utils/errorUtil";
import {
  getProductById,
  createOneProduct,
  updateProductById,
  deleteProductById,
} from "../../services/productService";
import {
  checkImageFromMulterSupport,
  checkProductIfNotExist,
} from "../../utils/checkUtil";

import ImageQueue from "../../jobs/queues/imageQueue";
import path from "node:path";
// import safeUnlink from "../../utils/safeUnlink";
import cacheQueue from "../../jobs/queues/cacheQueue";
import { unlink } from "fs/promises";

interface UserIdRequest extends Request {
  userId?: number;
  user?: any;
  files?: any;
}

const removeFile = async (
  originalFiles: string[],
  optimizedFiles: string[] | null
) => {
  try {
    for (const originalFile of originalFiles) {
      const originalFilePath = path.join(
        __dirname,
        "../../..",
        "/uploads/images",
        originalFile
      );
      await unlink(originalFilePath);
    }

    for (const optimizedFile of optimizedFiles || []) {
      if (optimizedFile) {
        const optimizedFilePath = path.join(
          __dirname,
          "../../..",
          "/uploads/optimized",
          optimizedFile
        );
        await unlink(optimizedFilePath);
      }
    }
  } catch (error) {
    console.error("Unlink failed:", error);
  }
};

export const createProduct = [
  body("name", "Name is required.").trim().notEmpty().escape(),
  body("description", "Description is required.").trim().notEmpty().escape(),
  body("price", "Price is required.")
    .isFloat({ min: 0.1 })
    .isDecimal({ decimal_digits: "1,2" }),
  body("discount", "Discount is required.")
    .isFloat({ min: 0 })
    .isDecimal({ decimal_digits: "1,2" }),
  body("inventory", "Inventory is required.").isInt({ min: 0 }),
  body("category", "Category is required.").trim().notEmpty().escape(),
  body("type", "Type is required.").trim().notEmpty().escape(),
  body("tags", "Tags is invalid")
    .optional({ nullable: true })
    .customSanitizer((value) => {
      if (value) {
        return value.split(",").filter((tag: string) => tag.trim() !== "");
      }
      return value;
    }),

  async (req: UserIdRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      if (req.files && req.files.length > 0) {
        const originalFiles = req.files.map((file: any) => file.filename);
        await removeFile(originalFiles, null);
      }
      return next(createError(errors[0].msg, 400, errorCode.invalid));
    }

    const {
      name,
      description,
      price,
      discount,
      inventory,
      category,
      type,
      tags,
    } = req.body;
    const image = req.files && req.files.length > 0;
    checkImageFromMulterSupport(image);

    await Promise.all(
      req.files?.map(async (file: any) => {
        const splitFileName = file.filename.split(".")[0];
        return ImageQueue.add(
          "optimize-image",
          {
            filePath: file.path,
            fileName: `${splitFileName}.webp`,
            width: 835,
            height: 577,
            quality: 100,
          },
          {
            attempts: 3,
            backoff: {
              type: "exponential",
              delay: 1000,
            },
          }
        );
      })
    );

    const data: any = {
      name,
      description,
      price,
      discount,
      inventory: +inventory, // Convert to number
      images: req.files.map((file: any) => ({ path: file.filename })),
      category,
      type,
      tags,
    };

    const createProduct = await createOneProduct(data);

    await cacheQueue.add("cache-products", {
      pattern: "products:*",
    });

    res.status(201).json({
      message: "A new product created successfully.",
      productId: createProduct.id,
    });
  },
];

export const updateProduct = [
  body("productId", "ProductId is required.").isInt({ gt: 0 }),
  body("name", "Name is required.").trim().notEmpty().escape(),
  body("description", "Description is required.").trim().notEmpty().escape(),
  body("price", "Price is required.")
    .isFloat({ min: 0.1 })
    .isDecimal({ decimal_digits: "1,2" }),
  body("discount", "Discount is required.")
    .isFloat({ min: 0 })
    .isDecimal({ decimal_digits: "1,2" }),
  body("inventory", "Inventory is required.").isInt({ min: 0 }),
  body("category", "Category is required.").trim().notEmpty().escape(),
  body("type", "Type is required.").trim().notEmpty().escape(),
  body("tags", "Tags is invalid")
    .optional({ nullable: true })
    .customSanitizer((value) => {
      if (value) {
        return value.split(",").filter((tag: string) => tag.trim() !== "");
      }
      return value;
    }),

  async (req: UserIdRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      if (req.files && req.files.length > 0) {
        const originalFiles = req.files.map((file: any) => file.filename);
        await removeFile(originalFiles, null);
      }
      return next(createError(errors[0].msg, 400, errorCode.invalid));
    }

    const {
      productId,
      name,
      description,
      price,
      discount,
      inventory,
      category,
      type,
      tags,
    } = req.body;

    // check product in database
    const product = await getProductById(+productId);
    if (!product) {
      if (req.files && req.files.length > 0) {
        const originalFiles = req.files.map((file: any) => file.filename);
        await removeFile(originalFiles, null);
      }
      return next(
        createError("This product does not exist.", 404, errorCode.notFound)
      );
    }

    //if image is uploaded
    let originalUploadFilesName = [];
    if (req.files && req.files.length > 0) {
      originalUploadFilesName = req.files.map((file: any) => ({
        path: file.filename,
      }));
    }

    const data: any = {
      productId,
      name,
      description,
      price,
      discount,
      inventory: +inventory, // Convert to number
      category,
      type,
      tags,
      images: originalUploadFilesName,
    };

    // optimize uploaded images
    if (req.files && req.files.length > 0) {
      await Promise.all(
        req.files?.map(async (file: any) => {
          const splitFileName = file.filename.split(".")[0];
          return ImageQueue.add(
            "optimize-image",
            {
              filePath: file.path,
              fileName: `${splitFileName}.webp`,
              width: 835,
              height: 577,
              quality: 100,
            },
            {
              attempts: 3,
              backoff: {
                type: "exponential",
                delay: 1000,
              },
            }
          );
        })
      );
      // remove old images
      const originalFiles = product.images.map((img: any) => img.path);
      const optimizedFiles = product.images.map(
        (img: any) => img.path.split(".")[0] + ".webp"
      );
      await removeFile(originalFiles, optimizedFiles);
    }

    // update product
    const updatedProduct = await updateProductById(product.id, data);
    await cacheQueue.add("cache-products", {
      pattern: "products:*",
    });

    res.status(200).json({
      message: "Product updated successfully.",
      productId: updatedProduct.id,
    });
  },
];

export const deleteProduct = [
  // validate id from URL param (route: /products/:id)
  param("id", "ProductId is required.").isInt({ gt: 0 }),
  async (req: UserIdRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      return next(createError(errors[0].msg, 400, errorCode.invalid));
    }

    // read id from params
    const productId = req.params.id;
    // check product in database
    const product = await getProductById(+productId);
    checkProductIfNotExist(product);

    // remove old images
    const originalFiles = product!.images.map((img: any) => img.path);
    const optimizedFiles = product!.images.map(
      (img: any) => img.path.split(".")[0] + ".webp"
    );
    await removeFile(originalFiles, optimizedFiles);

    // delete product
    const deletedProduct = await deleteProductById(product!.id);

    await cacheQueue.add("cache-products", {
      pattern: "products:*",
    });

    res.status(200).json({
      message: "Product deleted successfully.",
      productId: deletedProduct.id,
    });
  },
];
