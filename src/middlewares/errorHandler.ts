import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/customErrors';

const errorHandler = (
  err: AppError, 
  req: Request, 
  res: Response, 
  next: NextFunction
): void => {

  if(err instanceof AppError) {
    res.status(err.statusCode).json({
        error: {
            message: err.message,
            statusCode: err.statusCode
        },
    });
  } else {
    console.error(err);
    res.status(500).json({
        error: {
            message: 'Internal Server Error',
            statusCode: 500
        },
    });
  }
};

export default errorHandler;
