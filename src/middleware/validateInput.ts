import { Request, Response, NextFunction } from "express";
import {
  userSignUp,
  userVerify,
  userLogin,
  userUpdateProfile,
  productCreate,
  options,
} from "../utills";

export const validateSignUp = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validateSignupData = userSignUp.validate(req.body, options);
  if (validateSignupData.error) {
    return res.status(400).json({
      status: 400,
      message: validateSignupData.error?.details[0]?.message,
    });
  }
  next();
};

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validateLoginData = userLogin.validate(req.body);
  if (validateLoginData.error) {
    return res.status(400).json({
      status: 400,
      message: validateLoginData.error?.details[0]?.message,
    });
  }
  next();
};

export const validateVerify = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = userVerify.validate(req.body);
  if (error) {
    return res.status(400).send({ errors: error.details });
  }
  next();
};

export const validateProfile = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = userUpdateProfile.validate(req.body);
  if (error) {
    return res.status(400).send({ errors: error.details });
  }
  next();
};

export const validateProduct = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validateProduct = productCreate.validate(req.body, options);
  if (validateProduct.error) {
    return res.status(400).json({
      status: 400,
      message: validateProduct.error?.details[0]?.message,
    });
  }
  next();
};
