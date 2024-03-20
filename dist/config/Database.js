import mongoose from "mongoose";
import dotEnv from "dotenv";
const MONGO_URL = process.env.MONGO_URL;
dotEnv.config();
mongoose.set("strictQuery", true);
export const dbConnect = () => {
    mongoose
        .connect(process.env.MONGO_URL)
        .then(() => console.log("DB Connected"))
        .catch((err) => console.log(err));
};
//# sourceMappingURL=Database.js.map