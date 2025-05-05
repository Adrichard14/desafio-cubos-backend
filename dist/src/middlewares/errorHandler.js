"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customErrors_1 = require("../errors/customErrors");
const errorHandler = (err, req, res, next) => {
    if (err instanceof customErrors_1.AppError) {
        res.status(err.statusCode).json({
            error: {
                message: err.message,
                statusCode: err.statusCode
            },
        });
    }
    else {
        console.error(err);
        res.status(500).json({
            error: {
                message: 'Internal Server Error',
                statusCode: 500
            },
        });
    }
};
exports.default = errorHandler;
