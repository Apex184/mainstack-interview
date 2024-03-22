import express from "express";
import { UserSignUp, UserVerify, RequestOtp, UserLogin } from "../controller/index.js";
import { validateSignUp, validateLogin, Authentication } from "../middleware/index.js";
const router = express.Router();
router.post("/signup", validateSignUp, UserSignUp);
router.post("/login", validateLogin, UserLogin);
router.post("/verify", Authentication, UserVerify);
router.post("/request-otp", Authentication, RequestOtp);
export { router as userRouter };
//# sourceMappingURL=userRoute.js.map