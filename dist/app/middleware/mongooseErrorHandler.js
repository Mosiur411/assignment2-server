"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongooseErrorHandler = void 0;
const mongoose_1 = require("mongoose");
const mongooseErrorHandler = (err) => {
    if (err instanceof mongoose_1.Error.ValidationError) {
        const formattedErrors = Object.keys(err.errors).reduce((acc, key) => {
            const error = err.errors[key];
            acc[key] = {
                message: error.message,
                name: error.name,
                properties: error,
                kind: error.kind,
                path: error.path,
                value: error.value,
            };
            return acc;
        }, {});
        const response = {
            message: 'Validation failed',
            success: false,
            error: {
                name: err.name,
                errors: formattedErrors,
            },
            stack: err.stack,
        };
        return response;
    }
    return err;
};
exports.mongooseErrorHandler = mongooseErrorHandler;
