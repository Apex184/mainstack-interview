import mongoose from "mongoose";
import { logger } from '@/utills';
import dotEnv from "dotenv";


dotEnv.config()
mongoose.set("strictQuery", true);

export const dbConnect = () => {
    mongoose
        .connect(process.env.MONGO_URL as string)
        .then(() => logger.info("DB Connected"))
        .catch((err) => console.log(err));
};


