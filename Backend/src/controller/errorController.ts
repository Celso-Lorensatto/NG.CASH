import {NextFunction, Request, Response} from 'express'


const AppError = require('../utils/appError');


const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in agains', 401);

const sendErrorDev = (err: any, req : Request, res : Response) => {
  const errorObj = {
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  };
  console.log(errorObj);
  return res.status(err.statusCode).json(errorObj);

};

const sendErrorProd = (err : any, req : Request, res: Response) => {
    if (!err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }

    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
};

module.exports = (err : any, req : Request, res : Response, next : NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;
    console.log(err);




    if (error.name === 'JsonWebTokenError') error = handleJWTError();

    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  }
};