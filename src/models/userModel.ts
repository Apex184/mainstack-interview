import mongoose, { Schema, model } from "mongoose";

export interface UserAtrributes {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const userSchema = new Schema<UserAtrributes>({
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
});

export const UserData = mongoose.model<UserAtrributes>("User", userSchema);
