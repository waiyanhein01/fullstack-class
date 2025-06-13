import express from "express";
import { getAllUsers } from "../../../controllers/admin/adminController";
import { setMaintenanceMode } from "../../../controllers/admin/systemController";
import upload from "../../../middlewares/fileUpload";
import {
  createPost,
  deletePost,
  updatePost,
} from "../../../controllers/admin/postController";

const router = express.Router();

router.get("/users", getAllUsers);
router.post("/maintenance", setMaintenanceMode);

//Post CRUD route
router.post("/posts", upload.single("image"), createPost);
router.patch("/posts/:id", upload.single("image"), updatePost);
router.delete("/posts/:id", deletePost);

export default router;
