import { Request, Response, NextFunction } from "express";
import {
  userSignUp,
  userVerify,
  userLogin,
  userUpdateProfile,
} from "../utills";

export const validateSignUp = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = userSignUp.validate(req.body);
  if (error) {
    return res.status(400).send({ errors: error.details });
  }
  next();
};

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = userLogin.validate(req.body);
  if (error) {
    return res.status(400).send({ errors: error.details });
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
