import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { AuthPayload } from "../DTO/Auth.dto";
import { logger } from "./logger";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const generateSignature = async (payload: AuthPayload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
};

export const validateSignature = async (req: Request, res: Response) => {
  const signature = req.get("Authorization")?.replace("Bearer ", "");

  if (!signature) {
    return false;
  }

  try {
    const payload = jwt.verify(signature, JWT_SECRET);
    res.locals.user = payload;

    return true;
  } catch (error) {
    return false;
  }
};

export const generateSalt = async () => {
  return await bcrypt.genSalt();
};

export const generatePassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};

export const hashedOtpData = async (otp: number, saltRounds: number = 10) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedOtp = await bcrypt.hash(String(otp), salt);

    return hashedOtp;
  } catch (error) {
    logger.error(error);
  }
};

export const compareOTP = async (plainOTP: string, hashedOTP: string) => {
  try {
    const isMatch = await bcrypt.compare(plainOTP, hashedOTP);
    return isMatch;
  } catch (error) {
    logger.error(error);
  }
};

export const validatePassword = async (
  password: string,
  salt: string,
  hashedPassword: string,
) => {
  const newHashedPassword = await generatePassword(password, salt);
  return newHashedPassword === hashedPassword;
};
