import express from "express";
import upload, { uploadMemory } from "../../../middlewares/fileUpload";

import {
  changeLanguage,
  testPermission,
  profileImageUpload,
  profileImageUploadMultiple,
  profileImageOptimizedUpload,
} from "../../../controllers/dashboard/profileController";
import { auth } from "../../../middlewares/auth";
import {
  getAllPostsByInfinitePagination,
  getAllPostsByOffsetPagination,
  getPost,
} from "../../../controllers/dashboard/getPostController";
import { getProduct } from "../../../controllers/dashboard/getProductController";

const router = express.Router();

router.post("/change-language", changeLanguage);
router.get("/test-permission", auth, testPermission);

// for normal image upload
router.patch(
  "/profile/uploads",
  auth,
  upload.single("avatar"),
  profileImageUpload
);

router.patch(
  "/profile/uploads/multiple",
  auth,
  upload.array("avatar"),
  profileImageUploadMultiple
);

// for optimized image upload
router.patch(
  "/profile/uploads/optimized",
  auth,
  upload.single("avatar"),
  profileImageOptimizedUpload
);

// Get Post route
router.get("/posts", auth, getAllPostsByOffsetPagination);
router.get("/posts/infinite", auth, getAllPostsByInfinitePagination);
router.get("/posts/:id", auth, getPost);

// Get Product route
router.get("/products/:id", auth, getProduct);

export default router;
