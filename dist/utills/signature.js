import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { logger } from "./logger.js";
const JWT_SECRET = process.env.JWT_SECRET || "secret";
export const generateSignature = async (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
};
export const validateSignature = async (req, res) => {
    const signature = req.get("Authorization")?.replace("Bearer ", "");
    if (!signature) {
        return false;
    }
    try {
        const payload = jwt.verify(signature, JWT_SECRET);
        res.locals.user = payload;
        return true;
    }
    catch (error) {
        return false;
    }
};
export const generateSalt = async () => {
    return await bcrypt.genSalt();
};
export const generatePassword = async (password, salt) => {
    return await bcrypt.hash(password, salt);
};
export const hashedOtpData = async (otp, saltRounds = 10) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedOtp = await bcrypt.hash(String(otp), salt);
        return hashedOtp;
    }
    catch (error) {
        logger.error(error);
    }
};
export const compareOTP = async (plainOTP, hashedOTP) => {
    try {
        const isMatch = await bcrypt.compare(plainOTP, hashedOTP);
        return isMatch;
    }
    catch (error) {
        logger.error(error);
    }
};
export const validatePassword = async (password, salt, hashedPassword) => {
    const newHashedPassword = await generatePassword(password, salt);
    return newHashedPassword === hashedPassword;
};
//# sourceMappingURL=signature.js.map