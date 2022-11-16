import { application, Application, NextFunction, Request, Response } from "express";

const express = require('express')
const cookieParser = require('cookie-parser')

const app : Application = express();

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

//Dependencia para facilitar o acesso aos cookies dentro dos request
app.use(cookieParser());


app.all('*', (req : Request, res : Response, next : NextFunction) => {
    return res.status(404).json({message:'not found !'})
  });
  
  module.exports = app;

  /* //Routes
  app.use('/', viewRouter);
  app.use('/api/v1/tours', tourRouter);
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/reviews', reviewRouter);
  app.use('/api/v1/bookings', bookingRouter);
  
  app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server !`, 404));
  });
  
  app.use(globalErrorHandler); */