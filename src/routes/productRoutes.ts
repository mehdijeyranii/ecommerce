import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
} from "../controllers/productController";
import { admin, protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", protect, admin, createProduct);

export default router;
