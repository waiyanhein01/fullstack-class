import express from "express";
import {
  adminLogin,
  getAllUsers,
} from "../../../controllers/admin/adminController";
import { setMaintenanceMode } from "../../../controllers/admin/systemController";
import upload from "../../../middlewares/fileUpload";
import {
  createPost,
  deletePost,
  updatePost,
} from "../../../controllers/admin/postController";
import {
  createProduct,
  deleteProduct,
  updateProduct,
  // deleteProduct,
} from "../../../controllers/admin/productController";

const router = express.Router();

router.get("/users", getAllUsers);
router.post("/maintenance", setMaintenanceMode);

//Posts CRUD route
router.post("/posts", upload.single("image"), createPost);
router.patch("/posts/:id", upload.single("image"), updatePost);
router.delete("/posts/:id", deletePost);

//Products CRUD route
router.post("/products", upload.array("images", 4), createProduct);
router.patch("/products/:id", upload.array("images", 4), updateProduct);
router.delete("/products/:id", deleteProduct);

//admin login route
router.post("login", adminLogin);

export default router;
