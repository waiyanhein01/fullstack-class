import express from "express";
import healthController from "../controllers/healthController";
import { check } from "../middlewares/check";

const router = express.Router();

router.get("/health", check, healthController);

export default router;

// app.get("/health", check,
