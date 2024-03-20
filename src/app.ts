import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotEnv from "dotenv";
import express from "express";
import "express-async-errors";
import helmet from "helmet";
import { NotFoundError } from "./errors";
import { errorHandler, httpLogger } from "./middleware";
import { healthCheckerRouter } from "./routes";

export const app = express();
dotEnv.config();
app.set("trust proxy", true);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(compression());

app.use(httpLogger);

app.use(healthCheckerRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);
