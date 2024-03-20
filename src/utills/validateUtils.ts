import Joi from 'joi';

export const userSignUp = Joi.object({
  email: Joi.string().trim().lowercase().required(),
});

export const userLogin = Joi.object({
  email: Joi.string().trim().lowercase().required(),
});

export const userVerify = Joi.object({
  email: Joi.string().trim().lowercase().required(),
  otp: Joi.number().required(),
  type: Joi.string().trim().lowercase().required(),
  // userType: Joi.string().trim().lowercase().required(),
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

export const homeworkValidationSchema = Joi.object({
  classId: Joi.string().required(),
  subjectId: Joi.string().required(),
  topic: Joi.string().required(),
  textFind: Joi.string().required(),
  pageNumber: Joi.string().required(),
  exercisePage: Joi.string().required(),
  noteForParent: Joi.string().allow('').optional(),
});
