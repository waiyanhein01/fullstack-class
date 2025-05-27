import express from "express";
import { getAllUsers } from "../../../controllers/admin/adminController";
import { setMaintenanceMode } from "../../../controllers/admin/systemController";

const router = express.Router();

router.get("/users", getAllUsers);
router.post("/maintenance", setMaintenanceMode);

export default router;
