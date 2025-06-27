import { Request, Response, NextFunction } from "express";
import { body, param, query, validationResult } from "express-validator";
import { errorCode } from "../../../config/errorCode";
import { createError } from "../../utils/errorUtil";
import { getUserById } from "../../services/authService";
import { checkUserIfNotExist } from "../../utils/authUtil";
import {
  getAllPostsLists,
  getPostWithRelatedData,
} from "../../services/postService";
import { getOrSetCache } from "../../utils/cacheUtil";
import { checkPostIfNotExist } from "../../utils/checkUtil";

interface UserIdRequest extends Request {
  userId?: number;
}

// offset pagination
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

    // const posts = await getAllPostsByPagination(options);
    const cacheKey = `posts:${JSON.stringify(req.query)}`;
    const posts = await getOrSetCache(cacheKey, async () => {
      return getAllPostsLists(options);
    });

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

// cursor pagination
// This is a more efficient way to paginate through large datasets
export const getAllPostsByInfinitePagination = [
  query("cursor", "Cursor is invalid.").isInt({ gt: 0 }).optional(),
  query("limit", "Limit number is invalid.").isInt({ gt: 4 }).optional(),
  async (req: UserIdRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      return next(createError(errors[0].msg, 400, errorCode.invalid));
    }

    const lastCursor = req.query.cursor; // Default to cursor 1 if not provided
    const limit = req.query.limit || 5; // Default to 5 items per page
    const userId = req.userId;
    const user = await getUserById(userId!);
    checkUserIfNotExist(user);

    const options = {
      cursor: lastCursor ? { id: +lastCursor } : undefined, // Convert cursor to number if provided
      take: +limit + 1, // Fetch one more item to check if there is a next page
      skip: lastCursor ? 1 : 0, // Skip the cursor item if provided
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
        id: "asc",
      },
    };

    // const posts = await getAllPostsByPagination(options);
    const cacheKey = `posts:${JSON.stringify(req.query)}`;
    const posts = await getOrSetCache(cacheKey, async () => {
      return getAllPostsLists(options);
    });

    const hasNextPage = posts.length > +limit; // Check if there is a next page
    if (hasNextPage) {
      posts.pop(); // Remove the last item if it exceeds the limit
    }

    const nextCursor = posts.length > 0 ? posts[posts.length - 1].id : null;

    res.status(200).json({
      message: "Get all posts by cursor pagination.",
      nextCursor,
      hasNextPage,
      posts,
    });
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

    // const post = await getPostWithRelatedData(+postId); // + for string to number

    const cacheKey = `posts:${JSON.stringify(postId)}`;
    const post = await getOrSetCache(cacheKey, async () => {
      return await getPostWithRelatedData(+postId);
    });

    checkPostIfNotExist(post);
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
