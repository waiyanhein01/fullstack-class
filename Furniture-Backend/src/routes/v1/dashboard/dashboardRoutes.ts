import express from "express";
import upload, { uploadMemory } from "../../../middlewares/fileUpload";

import {
  changeLanguage,
  testPermission,
  profileImageUpload,
  profileImageUploadMultiple,
  profileImageOptimizedUpload,
  userProfile,
  changePassword,
} from "../../../controllers/dashboard/profileController";
import { auth } from "../../../middlewares/auth";
import {
  getAllPostsByInfinitePagination,
  getAllPostsByOffsetPagination,
  getPost,
} from "../../../controllers/dashboard/getPostController";
import {
  favouriteProductToggle,
  getAllProductsByCursorPagination,
  getAllProductsByOffsetPagination,
  getCategoryType,
  getProduct,
} from "../../../controllers/dashboard/getProductController";

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
router.get("/products", auth, getAllProductsByOffsetPagination);
router.get("/products/infinite", auth, getAllProductsByCursorPagination);
router.get("/products/:id", auth, getProduct);

// Favourite Product toggle route
router.patch("/products/favourite-toggle", auth, favouriteProductToggle);

// Get Category and Type
router.get("/category-type", auth, getCategoryType);

// profile
router.get("/profile", auth, userProfile);

//change password
router.patch("/change-password", auth, changePassword);

export default router;
