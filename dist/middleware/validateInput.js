import { userSignUp, userVerify, userLogin, userUpdateProfile, } from "../utills/index.js";
export const validateSignUp = (req, res, next) => {
    const { error } = userSignUp.validate(req.body);
    if (error) {
        return res.status(400).send({ errors: error.details });
    }
    next();
};
export const validateLogin = (req, res, next) => {
    const { error } = userLogin.validate(req.body);
    if (error) {
        return res.status(400).send({ errors: error.details });
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
//# sourceMappingURL=validateInput.js.map