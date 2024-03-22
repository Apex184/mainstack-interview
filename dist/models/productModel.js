import mongoose, { Schema } from "mongoose";
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
    status: {
        type: String,
        enum: ["active", "inactive", "blocked", "deleted", "sold"],
        default: "inactive",
    },
});
export const Product = mongoose.model("Product", productSchema);
//# sourceMappingURL=productModel.js.map