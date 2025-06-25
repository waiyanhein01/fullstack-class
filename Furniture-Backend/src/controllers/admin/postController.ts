import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { errorCode } from "../../../config/errorCode";
import { createError } from "../../utils/errorUtil";
import {
  checkImageFromMulterSupport,
  checkPostIfNotExist,
} from "../../utils/checkUtil";
import {
  createOnePost,
  deletePostById,
  getPostById,
  PostArg,
  updatePostById,
} from "../../services/postService";

import ImageQueue from "../../jobs/queues/imageQueue";
import sanitizeHtml from "sanitize-html";
import path from "node:path";
import safeUnlink from "../../utils/safeUnlink";
import cacheQueue from "../../jobs/queues/cacheQueue";

interface UserIdRequest extends Request {
  userId?: number;
  user?: any;
}

const removeFile = async (
  originalFile: string,
  optimizedFile: string | null
) => {
  try {
    const originalFilePath = path.join(
      __dirname,
      "../../..",
      "/uploads/images",
      originalFile
    );
    await safeUnlink(originalFilePath);

    if (optimizedFile) {
      const optimizedFilePath = path.join(
        __dirname,
        "../../..",
        "/uploads/optimized",
        optimizedFile
      );
      await safeUnlink(optimizedFilePath);
    }
  } catch (error) {
    console.error("Unlink failed:", error);
  }
};

export const createPost = [
  body("title", "Title is required.").trim().notEmpty().escape(),
  body("content", "Content is required.").trim().notEmpty().escape(),
  body("body", "Body is required.")
    .trim()
    .notEmpty()
    .customSanitizer((value) => sanitizeHtml(value))
    .notEmpty(),
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
      if (req.file) {
        await removeFile(req.file.filename, null);
      }
      return next(createError(errors[0].msg, 400, errorCode.invalid));
    }

    const { title, content, body, category, type, tags } = req.body;
    const user = req.user;
    const image = req.file;
    checkImageFromMulterSupport(image);

    const splitFileName = req.file?.filename.split(".")[0];

    await ImageQueue.add(
      "optimize-image",
      {
        filePath: req.file?.path,
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

    const data: PostArg = {
      title,
      content,
      body,
      image: req.file!.filename,
      authorId: user!.id,
      category,
      type,
      tags,
    };

    const createdPost = await createOnePost(data);

    await cacheQueue.add("cache-posts", {
      pattern: "posts:*",
    });

    res.status(200).json({
      message: "A new post created successfully.",
      postId: createdPost.id,
    });
  },
];

export const updatePost = [
  body("postId", "PostId is required.").isInt({ gt: 0 }),
  body("title", "Title is required.").trim().notEmpty().escape(),
  body("content", "Content is required.").trim().notEmpty().escape(),
  body("body", "Body is required.")
    .trim()
    .notEmpty()
    .customSanitizer((value) => sanitizeHtml(value))
    .notEmpty(),
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
      if (req.file) {
        await removeFile(req.file.filename, null);
      }
      return next(createError(errors[0].msg, 400, errorCode.invalid));
    }

    const { postId, title, content, body, category, type, tags } = req.body;
    const user = req.user;

    const post = await getPostById(+postId); // + for string to number
    if (!post) {
      if (req.file) {
        await removeFile(req.file.filename, null);
      }

      return next(
        createError("This post does not exist.", 401, errorCode.invalid)
      );
    }

    if (user.id !== post.authorId) {
      if (req.file) {
        await removeFile(req.file.filename, null);
      }
      return next(
        createError(
          "You can not update this post.",
          403,
          errorCode.unauthorized
        )
      );
    }

    let data: any = {
      title,
      content,
      body,
      image: req.file,
      category,
      type,
      tags,
    };

    if (req.file) {
      data.image = req.file.filename;

      const splitFileName = req.file.filename.split(".")[0];
      await ImageQueue.add(
        "optimize-image",
        {
          filePath: req.file?.path,
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

      const optimizedFile = post.image.split(".")[0] + ".webp";
      await removeFile(post.image, optimizedFile);
    }

    const updatedPost = await updatePostById(post.id, data);
    await cacheQueue.add("cache-posts", {
      pattern: "posts:*",
    });

    res
      .status(200)
      .json({ message: "Post updated successfully.", postId: updatedPost.id });
  },
];

export const deletePost = [
  body("postId", "PostId is required.").isInt({ gt: 0 }),
  async (req: UserIdRequest, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array({ onlyFirstError: true });
    if (errors.length > 0) {
      return next(createError(errors[0].msg, 400, errorCode.invalid));
    }

    const user = req.user;
    const postId = req.body.postId;
    const post = await getPostById(+postId); // + for string to number
    checkPostIfNotExist(post);

    if (user!.id !== post!.authorId) {
      return next(
        createError(
          "You can not delete this post.",
          403,
          errorCode.unauthorized
        )
      );
    }

    const deletedPost = await deletePostById(post!.id);

    const optimizedFile = post!.image.split(".")[0] + ".webp";
    await removeFile(post!.image, optimizedFile);

    await cacheQueue.add("cache-posts", {
      pattern: "posts:*",
    });

    res
      .status(200)
      .json({ message: "Post deleted successfully.", postId: deletedPost.id });
  },
];
