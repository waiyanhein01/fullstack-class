import express from "express";
import { getAllUsers } from "../../../controllers/admin/usersController";

const router = express.Router();

router.get("/users", getAllUsers);

export default router;
