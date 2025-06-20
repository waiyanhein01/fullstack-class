import { Request, Response, NextFunction } from "express";
import { body, param, query, validationResult } from "express-validator";
import { errorCode } from "../../../config/errorCode";
import { createError } from "../../utils/errorUtil";
import { getUserById } from "../../services/authService";
import { checkUserIfNotExist } from "../../utils/authUtil";
import {
  getAllPostsByOffsetPaginationData,
  getPostWithRelatedData,
} from "../../services/postService";

interface UserIdRequest extends Request {
  userId?: number;
}

export const getAllPostsByOffsetPagination = [
  query("page", "Page number is invalid.").isInt({ gt: 0 }).optional(),
  query("limit", "Limit number is invalid.").isInt({ gt: 4 }).optional(),
  async (req: UserIdRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      return next(createError(errors[0].msg, 400, errorCode.invalid));
    }

    const page = req.query.page || 1; // Default to page 1 if not provided
    const limit = req.query.limit || 5; // Default to 5 items per page
    const userId = req.userId;
    const user = await getUserById(userId!);
    checkUserIfNotExist(user);

    const skip = (+page - 1) * +limit; // Calculate the number of items to skip like 1-1 * 5 or 2-1 * 5

    const options = {
      skip,
      take: +limit + 1,
      select: {
        id: true,
        title: true,
        content: true,
        image: true,
        author: {
          select: {
            fullName: true,
          },
        },
        updatedAt: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    };

    const posts = await getAllPostsByOffsetPaginationData(options);
    const currentPage = +page;
    let nextPage = null;
    const hasNextPage = posts.length > +limit; // Check if there is a next page
    const previousPage = currentPage > 1 ? currentPage - 1 : null;
    if (hasNextPage) {
      posts.pop(); // Remove the last item if it exceeds the limit
      nextPage = currentPage + 1;
    }

    res.status(200).json({
      message: "Get all posts by offset pagination.",
      currentPage,
      hasNextPage,
      previousPage,
      nextPage,
      posts,
    });
  },
];

export const getAllPostsByInfinitePagination = [
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

export const getPost = [
  param("id", "Post ID is required.").isInt({ gt: 0 }),
  async (req: UserIdRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      return next(createError(errors[0].msg, 400, errorCode.invalid));
    }

    const postId = req.params.id;
    const userId = req.userId;
    const user = await getUserById(userId!);
    checkUserIfNotExist(user);

    const post = await getPostWithRelatedData(+postId); // + for string to number

    // const modifiedPost = {
    //   id: post?.id,
    //   title: post?.title,
    //   content: post?.content,
    //   body: post?.body,
    //   image: "/optimized/" + post?.image.split(".")[0] + ".webp", // Assuming image is stored in optimized folder
    //   fullName:
    //     (post?.author.firstName ?? "") + " " + (post?.author.lastName ?? ""),
    //   category: post?.category.name,
    //   type: post?.type.name,
    //   tags:
    //     post?.tags && post.tags.length > 0
    //       ? post.tags.map((tag: { name: string }) => tag.name)
    //       : null,
    //   updatedAt: post?.updatedAt.toLocaleDateString("en-US", {
    //     year: "numeric",
    //     month: "long",
    //     day: "numeric",
    //   }),
    // };
    res.status(200).json({ message: "Post fetched successfully.", post });
  },
];
