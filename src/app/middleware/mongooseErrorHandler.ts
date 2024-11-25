
import { Error } from "mongoose";

type ValidationErrorResponse = {
    message: string;
    name: string;
    properties?: {
        message: string;
        type?: string;
        [key: string]: any;
    };
    kind?: string;
    path?: string;
    value?: any;
}

type CustomErrorResponse = {
    message: string;
    success: boolean;
    error: {
        name: string;
        errors: Record<string, ValidationErrorResponse>;
    };
    stack?: string;
}

export const mongooseErrorHandler = (err: any) => {
    if (err instanceof Error.ValidationError) {
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
        }, {} as Record<string, ValidationErrorResponse>);
        const response: CustomErrorResponse = {
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
