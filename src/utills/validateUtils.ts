import Joi from "joi";

export const userSignUp = Joi.object({
  email: Joi.string().trim().lowercase().required(),
  password: Joi.string().required(),
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  phoneNumber: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .required(),
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

export const productCreate = Joi.object({
  name: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  quantity: Joi.number().required(),
  price: Joi.number().required(),
  image: Joi.string().trim(),
});

export const productUpdate = Joi.object({
  name: Joi.string().trim(),
  description: Joi.string().trim(),
  quantity: Joi.number(),
  price: Joi.number(),
  image: Joi.string().trim(),
});

export const options = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};
