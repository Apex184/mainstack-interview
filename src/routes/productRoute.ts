import express from "express";
import { createProduct, getProducts } from "@/controller";
import { Authentication, validateProduct } from "@/middleware";

const router = express.Router();
router.post("/products", Authentication, validateProduct, createProduct);
router.get("/products", Authentication, getProducts);
router.get("/products/:id", Authentication, createProduct);
router.patch("/products/:id", Authentication, createProduct);
router.delete("/products", Authentication, createProduct);
router.delete("/products/:id", Authentication, createProduct);

export { router as productRouter };
