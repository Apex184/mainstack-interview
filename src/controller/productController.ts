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
      const { name, description, quantity, price, image, category } = req.body;
      const product = await Product.create({
        name,
        description,
        quantity,
        price,
        image,
        productOwnerId: userData._id.toString(),
        category,
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

export const getProductById = async (req: Request, res: Response) => {
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
      const { productId } = req.params;
      const product = await Product.findOne({
        productOwnerId: userData._id.toString(),
        _id: productId,
      });
      if (!product)
        return res.status(404).json({ message: "Product not found" });
      return res.status(200).json({
        success: true,
        message: "Product fetched successfully",
        data: product,
      });
    }
  } catch (error) {
    logger.error(error);
    return res.status(400).send(error);
  }
};

export const updateProductById = async (req: Request, res: Response) => {
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
      const { productId } = req.params;
      const product = await Product.findOne({
        productOwnerId: userData._id.toString(),
        _id: productId,
      });
      if (!product)
        return res.status(404).json({ message: "Product not found" });
      const { name, description, quantity, price, image } = req.body;
      await Product.updateOne(
        { _id: productId },
        {
          name,
          description,
          quantity,
          price,
          image,
        },
      );
      return res.status(200).json({
        success: true,
        message: "Product updated successfully",
      });
    }
  } catch (error) {
    logger.error(error);
    return res.status(400).send(error);
  }
};

export const deleteProductById = async (req: Request, res: Response) => {
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
      const { productId } = req.params;
      const product = await Product.findOne({
        productOwnerId: userData._id.toString(),
        _id: productId,
      });
      if (!product)
        return res.status(404).json({ message: "Product not found" });
      await Product.deleteOne({ _id: productId });
      return res.status(200).json({
        success: true,
        message: "Product deleted successfully",
      });
    }
  } catch (error) {
    logger.error(error);
    return res.status(400).send(error);
  }
};

export const searchProduct = async (req: Request, res: Response) => {
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
      const { search } = req.query;
      const products = await Product.find({
        productOwnerId: userData._id.toString(),
        name: { $regex: search, $options: "i" },
      });
      return res.status(200).json({
        success: true,
        message: "Products fetched successfully",
        data: products,
      });
    }
  } catch (error) {
    logger.error(error);
    return res.status(400).send(error);
  }
};

export const filterProduct = async (req: Request, res: Response) => {
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
      const { filter } = req.query;
      const products = await Product.find({
        productOwnerId: userData._id.toString(),
        price: { $lte: filter },
      });
      return res.status(200).json({
        success: true,
        message: "Products fetched successfully",
        data: products,
      });
    }
  } catch (error) {
    logger.error(error);
    return res.status(400).send(error);
  }
};

export const sortProduct = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const userData = await User.findById(user._id);
    if (!userData) return res.status(404).json({ message: "User not found" });
    if (userData.status !== UserStatus.ACTIVE)
      return res.status(401).json({
        message:
          "Your account must be active before you can perform this action",
      });

    const { sort } = req.query;
    let sortOptions: { [key: string]: "asc" | "desc" } = {};
    if ((typeof sort === "string" && sort === "asc") || sort === "desc") {
      sortOptions = { price: sort };
    }

    const products = await Product.find({
      productOwnerId: userData._id.toString(),
    }).sort(sortOptions);

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    logger.error(error);
    return res.status(400).send(error);
  }
};

export const paginateProduct = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const userData = await User.findById(user._id);
    if (!userData) return res.status(404).json({ message: "User not found" });
    if (userData.status !== UserStatus.ACTIVE)
      return res.status(401).json({
        message:
          "Your account must be active before you can perform this action",
      });

    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    const products = await Product.find({
      productOwnerId: userData._id.toString(),
    })
      .limit(limit)
      .skip((page - 1) * limit);

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    logger.error(error);
    return res.status(400).send(error);
  }
};

export const getProductsByStatus = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const userData = await User.findById(user._id);
    if (!userData) return res.status(404).json({ message: "User not found" });
    if (userData.status !== UserStatus.ACTIVE)
      return res.status(401).json({
        message:
          "Your account must be active before you can perform this action",
      });
    const { status } = req.query;
    const products = await Product.find({ status }).populate(
      "productOwnerId",
      "firstName lastName email phoneNumber",
    );
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    logger.error(error);
    return res.status(400).send(error);
  }
};

export const updateProductStatus = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const userData = await User.findById(user._id);
    if (!userData) return res.status(404).json({ message: "User not found" });
    if (userData.status !== UserStatus.ACTIVE)
      return res.status(401).json({
        message:
          "Your account must be active before you can perform this action",
      });

    const { productId } = req.params;
    const { status } = req.body;
    await Product.updateOne({ _id: productId }, { status });
    return res.status(200).json({
      success: true,
      message: "Product status updated successfully",
    });
  } catch (error) {
    logger.error(error);
    return res.status(400).send(error);
  }
};

export const getProductsByCategory = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const userData = await User.findById(user._id);
    if (!userData) return res.status(404).json({ message: "User not found" });
    if (userData.status !== UserStatus.ACTIVE)
      return res.status(401).json({
        message:
          "Your account must be active before you can perform this action",
      });
    const { category } = req.query;
    if (!category) {
      return res
        .status(400)
        .json({ message: "Category parameter is required" });
    }
    const products = await Product.find({ category });

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
