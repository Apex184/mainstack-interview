import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    status: {
        type: String,
        enum: ["active", "inactive", "blocked", "deleted"],
        default: "inactive",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    salt: { type: String, required: true },
    otp: { type: String, required: true },
    otp_expiry: { type: Date, required: true },
});
export const User = mongoose.model("User", userSchema);
//# sourceMappingURL=userModel.js.map