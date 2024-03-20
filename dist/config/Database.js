import mongoose from "mongoose";
import { logger } from '../utills/index.js';
import dotEnv from "dotenv";
dotEnv.config();
mongoose.set("strictQuery", true);
export const dbConnect = () => {
    mongoose
        .connect(process.env.MONGO_URL)
        .then(() => logger.info("DB Connected"))
        .catch((err) => console.log(err));
};
//# sourceMappingURL=Database.js.map