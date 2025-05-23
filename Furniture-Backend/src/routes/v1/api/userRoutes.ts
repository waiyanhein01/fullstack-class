import express from "express";
import {
  changeLanguage,
  testPermission,
} from "../../../controllers/api/userController";
import { auth } from "../../../middlewares/auth";

const router = express.Router();

router.post("/change-language", changeLanguage);
router.get("/test-permission", auth, testPermission);

export default router;
