import express from "express";
import {
  changeLanguage,
  testPermission,
} from "../../../controllers/dashboard/dashboardController";
import { auth } from "../../../middlewares/auth";

const router = express.Router();

router.post("/change-language", changeLanguage);
router.get("/test-permission", auth, testPermission);

export default router;
