import express from "express";
import authRoutes from "./auth/authRoutes";
import adminRoutes from "./admin/adminRoutes";
import dashboardRoutes from "./dashboard/dashboardRoutes";
import authorize from "../../middlewares/authorize";
// import healthRoutes from "./healthRoutes";

import { auth } from "../../middlewares/auth";
import { maintenance } from "../../middlewares/maintenance";

const router = express.Router();

// router.use("/api/v1", healthRoutes);
router.use("/api/v1", authRoutes);
router.use("/api/v1/dashboard", dashboardRoutes);
router.use("/api/v1/admin", auth, authorize(true, "ADMIN"), adminRoutes);

// if u want to use the maintenance mode, uncomment the following lines
// router.use("/api/v1", maintenance, authRoutes);
// router.use("/api/v1/dashboard", maintenance, dashboardRoutes);
// router.use(
//   "/api/v1/admin",
//   maintenance,
//   auth,
//   authorize(true, "ADMIN"),
//   adminRoutes
// );

export default router;
