import { Request, Response } from "express";
import { Product, User } from "@/models";
import { UserStatus } from "@/DTO";
import { logger } from "@/utills";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    if (user) {
      const userData = await User.findById(user._id);
      if (!userData) return res.status(404).json({ message: "User not found" });
      if (userData.status !== UserStatus.ACTIVE)
        return res.status(401).json({
          message:
            "Your account must be active before you can perform this action",
        });
      const { name, description, quantity, price, image } = req.body;
      const product = await Product.create({
        name,
        description,
        quantity,
        price,
        image,
        productOwnerId: userData._id.toString(),
      });
      return res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: product,
      });
    }
  } catch (error) {
    logger.error(error);
    res.status(400).send(error);
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    if (user) {
      const userData = await User.findById(user._id);
      if (!userData) return res.status(404).json({ message: "User not found" });
      if (userData.status !== UserStatus.ACTIVE)
        return res.status(401).json({
          message:
            "Your account must be active before you can perform this action",
        });
      const products = await Product.find({
        productOwnerId: userData._id.toString(),
      });
      return res.status(200).json({
        success: true,
        message: "Products fetched successfully",
        data: products,
      });
    }
  } catch (error) {
    logger.error(error);
    res.status(400).send(error);
  }
};
