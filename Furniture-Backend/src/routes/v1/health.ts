import express from "express";
import { check } from "../../middlewares/check";
import { healthController } from "../../controllers/healthController";

const router = express.Router();

router.get("/health", check, healthController);

export default router;
