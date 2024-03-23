import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  deleteProductById,
  searchProduct,
  filterProduct,
  sortProduct,
  paginateProduct,
  updateProductStatus,
  getProductsByCategory,
} from "@/controller";
import { Authentication, validateProduct } from "@/middleware";

const router = express.Router();
router.post("/products", Authentication, validateProduct, createProduct);
router.get("/products", Authentication, getProducts);
router.get("/products/:productId", Authentication, getProductById);
router.put("/products/:productId", Authentication, updateProductStatus);
router.delete("/products/:productId", Authentication, deleteProductById);
router.get("/products/search", Authentication, searchProduct);
router.get("/products/filter", Authentication, filterProduct);
router.get("/products/sort", Authentication, sortProduct);
router.get("/products/paginate", Authentication, paginateProduct);
router.get("/products", Authentication, getProductsByCategory);
export { router as productRouter };
