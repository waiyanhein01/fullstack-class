import express from "express";
import authRoutes from "./auth/authRoutes";
import adminRoutes from "./admin/adminRoutes";
import dashboardRoutes from "./dashboard/dashboardRoutes";
import authorize from "../../middlewares/authorize";
// import healthRoutes from "./healthRoutes";

import { auth } from "../../middlewares/auth";

const router = express.Router();

// router.use("/api/v1", healthRoutes);
router.use("/api/v1", authRoutes);
router.use("/api/v1/dashboard", dashboardRoutes);
router.use("/api/v1/admin", auth, authorize(true, "ADMIN"), adminRoutes);

export default router;
