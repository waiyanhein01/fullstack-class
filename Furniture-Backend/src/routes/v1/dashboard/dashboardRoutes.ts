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

const router = express.Router();

router.post("/change-language", changeLanguage);
router.get("/test-permission", auth, testPermission);
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

//for optimized image upload
router.patch(
  "/profile/uploads/optimized",
  auth,
  upload.single("avatar"),
  profileImageOptimizedUpload
);

export default router;
