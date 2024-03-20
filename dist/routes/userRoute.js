import express from "express";
import { RegisterUser } from "../controller/index.js";
const router = express.Router();
router.post('/register', RegisterUser);
export { router as userRouter };
//# sourceMappingURL=userRoute.js.map