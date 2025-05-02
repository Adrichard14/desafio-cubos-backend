class AppError extends Error {
    public readonly statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
}

class ValidationError extends AppError {
    constructor(message: string) {
        super(message, 400);
    }
}

class NotFoundError extends AppError {
    constructor(message: string) {
        super(message, 404);
    }
}

class UnauthorizedError extends AppError {
    constructor(message: string) {
        super(message, 401);
    }
}
class UnprocessableEntityError extends AppError {
    constructor(message: string) {
        super(message, 422);
    }
}

export {
    AppError,
    ValidationError,
    NotFoundError,
    UnauthorizedError,
    UnprocessableEntityError,
};
