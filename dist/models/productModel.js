import mongoose, { Schema } from "mongoose";
import { ProductStatus } from "../DTO/index.js";
const productSchema = new Schema({
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
    category: {
        type: String,
        required: true,
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
export const Product = mongoose.model("Product", productSchema);
//# sourceMappingURL=productModel.js.map