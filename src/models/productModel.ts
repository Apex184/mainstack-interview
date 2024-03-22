import mongoose, { Schema } from "mongoose";
import { ProductAttributes, ProductStatus } from "@/DTO";

const productSchema = new Schema<ProductAttributes>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  productOwnerId: {
    type: String,
    ref: "User",
    required: true,
  },
  ProductStatus: {
    type: String,
    enum: [
      ProductStatus.PUBLISHED,
      ProductStatus.UNPUBLISHED,
      ProductStatus.BLOCKED,
      ProductStatus.DELETED,
      ProductStatus.SOLD,
    ],
    default: ProductStatus.UNPUBLISHED,
  },
});

export const Product = mongoose.model<ProductAttributes>(
  "Product",
  productSchema,
);
