import mongoose, { Schema } from "mongoose";
import { ProductAttributes } from "@/DTO";

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
  status: {
    type: String,
    enum: ["active", "inactive", "blocked", "deleted", "sold"],
    default: "inactive",
  },
});

export const Product = mongoose.model<ProductAttributes>(
  "Product",
  productSchema,
);
