import Joi from "joi";

export const userSignUp = Joi.object({
  email: Joi.string().trim().lowercase().required(),
  password: Joi.string().required(),
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  phoneNumber: Joi.string().required(),
  image: Joi.string().trim(),
  isVerified: Joi.boolean().default(false),
});

export const userLogin = Joi.object({
  email: Joi.string().trim().lowercase().required(),
  password: Joi.string().required(),
});

export const userVerify = Joi.object({
  email: Joi.string().trim().lowercase().required(),
  otp: Joi.number().required(),
});

export const userForgotPassword = Joi.object({
  email: Joi.string().trim().lowercase().required(),
});

export const userResetPassword = Joi.object({
  email: Joi.string().trim().lowercase().required(),
  otp: Joi.number().required(),
});

export const userUpdatePassword = Joi.object({
  email: Joi.string().trim().lowercase().required(),
  password: Joi.string().required(),
});

export const userUpdateProfile = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  image: Joi.string().trim(),
});
