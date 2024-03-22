import { userSignUp, userVerify, userLogin, userUpdateProfile, productCreate, options, } from "../utills/index.js";
export const validateSignUp = (req, res, next) => {
    const validateSignupData = userSignUp.validate(req.body, options);
    if (validateSignupData.error) {
        return res.status(400).json({
            status: 400,
            message: validateSignupData.error?.details[0]?.message,
        });
    }
    next();
};
export const validateLogin = (req, res, next) => {
    const validateLoginData = userLogin.validate(req.body);
    if (validateLoginData.error) {
        return res.status(400).json({
            status: 400,
            message: validateLoginData.error?.details[0]?.message,
        });
    }
    next();
};
export const validateVerify = (req, res, next) => {
    const { error } = userVerify.validate(req.body);
    if (error) {
        return res.status(400).send({ errors: error.details });
    }
    next();
};
export const validateProfile = (req, res, next) => {
    const { error } = userUpdateProfile.validate(req.body);
    if (error) {
        return res.status(400).send({ errors: error.details });
    }
    next();
};
export const validateProduct = (req, res, next) => {
    const validateProduct = productCreate.validate(req.body, options);
    if (validateProduct.error) {
        return res.status(400).json({
            status: 400,
            message: validateProduct.error?.details[0]?.message,
        });
    }
    next();
};
//# sourceMappingURL=validateInput.js.map