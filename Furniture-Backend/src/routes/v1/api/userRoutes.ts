import express from "express";
import { changeLanguage } from "../../../controllers/api/userController";

const router = express.Router();

router.post("/change-language", changeLanguage);

export default router;
