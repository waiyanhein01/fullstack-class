import express from "express";
import upload from "../../../middlewares/fileUpload";

import {
  changeLanguage,
  testPermission,
  profileImageUpload,
  profileImageUploadMultiple,
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

export default router;
