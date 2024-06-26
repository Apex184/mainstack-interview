import "dotenv/config";
import { app } from "./app";
import { dbConnect } from "@/config";
import { logger } from "@/utills";
import dotEnv from "dotenv";

dotEnv.config();
const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    dbConnect();
    app.listen(PORT, () => {
      logger.info(`Listening on port ${PORT} !!`);
    });
  } catch (error) {
    logger.fatal(error, `Error connecting to the Database:`);
    process.exit(1);
  }
};

start();
