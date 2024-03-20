import { NextFunction, Request, Response } from "express";
import { logger, validateSignature } from "@/utills";

export const Authentication = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validate = await validateSignature(req, res);

    if (validate) {
      next();
    } else {
      logger.error(req.headers, "Authentication failed. Request headers:");
      return res.status(403).json({
        success: false,
        message: "User is not authorized",
      });
    }
  } catch (error) {
    logger.error(error, "Error occurred during authentication:");
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
