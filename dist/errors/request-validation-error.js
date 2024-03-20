import { CustomError } from './custom-error.js';
export class RequestValidationError extends CustomError {
    errors;
    statusCode = 400;
    constructor(errors) {
        super('Invalid request parameters');
        this.errors = errors;
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    serializeErrors() {
        return this.errors.map((err) => {
            if (err.type === 'field') {
                return { message: err.msg, field: err.path };
            }
            return { message: err.msg };
        });
    }
}
//# sourceMappingURL=request-validation-error.js.map