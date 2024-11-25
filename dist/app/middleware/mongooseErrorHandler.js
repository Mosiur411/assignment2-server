"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongooseErrorHandler = void 0;
const mongoose_1 = require("mongoose");
// Mongoose Validation Error Handler
const mongooseErrorHandler = (err, req, res, next) => {
    if (err instanceof mongoose_1.Error.ValidationError) {
        // Format Mongoose validation errors
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
            stack: err.stack, // Optional, remove in production
        };
        return res.status(400).json(response);
    }
    // Pass to the next error handler if not a Mongoose error
    next(err);
};
exports.mongooseErrorHandler = mongooseErrorHandler;
