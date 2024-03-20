import { logger } from '../utills/index.js';
import { CustomError } from '../errors/custom-error.js';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err, req, res, next) => {
    logger.error(err, 'Original error:');
    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }
    res.status(400).send({
        errors: [{ message: 'Something went wrong' }],
    });
};
//# sourceMappingURL=errorHandler.js.map