import mongoose, { Schema } from "mongoose";
import { UserAttributes, UserStatus } from "@/DTO";

const userSchema = new Schema<UserAttributes>({
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
    enum: [
      UserStatus.ACTIVE,
      UserStatus.INACTIVE,
      UserStatus.BLOCKED,
      UserStatus.DELETED,
    ],
    default: UserStatus.INACTIVE,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  salt: { type: String, required: true },
  otp: { type: String, required: true },
  otp_expiry: { type: Date, required: true },
});

export const User = mongoose.model<UserAttributes>("User", userSchema);
