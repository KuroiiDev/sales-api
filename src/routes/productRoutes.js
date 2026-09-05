import express from "express";
import { ProductController } from "../controllers/productController.js";
const router = express.Router();
router.get("/", ProductController.getAll);
router.get("/category/:categoryId", ProductController.getByCategory);
router.get("/:id", ProductController.getById);
router.post("/", ProductController.create);
router.put("/:id", ProductController.update);

router.delete("/:id", ProductController.remove);
export default router;