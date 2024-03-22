import express from "express";
import { UserSignUp, UserVerify, RequestOtp, UserLogin } from "@/controller";
import { validateSignUp, validateLogin, Authentication } from "@/middleware";

const router = express.Router();
router.post("/user/signup", validateSignUp, UserSignUp);
router.post("/login", validateLogin, UserLogin);
router.post("/verify", Authentication, UserVerify);
router.post("/request-otp", Authentication, RequestOtp);
export { router as userRouter };
