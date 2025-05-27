import express from "express";
import {
  changeLanguage,
  testPermission,
  profileImageUpload,
} from "../../../controllers/dashboard/dashboardController";
import { auth } from "../../../middlewares/auth";
import upload from "../../../middlewares/fileUpload";
import { profile } from "console";

const router = express.Router();

router.post("/change-language", changeLanguage);
router.get("/test-permission", auth, testPermission);
router.patch(
  "/profile/upload",
  auth,
  upload.single("avatar"),
  profileImageUpload
);

export default router;
