import { Application, NextFunction, Request, Response } from "express";

const userRoutes = require('./routes/userRoutes')
const globalErrorHandler = require('./controller/errorController')

const express = require('express')
const cookieParser = require('cookie-parser')

const app : Application = express();

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

//Dependencia para facilitar o acesso aos cookies dentro dos request
app.use(cookieParser());


app.use('/user', userRoutes);

app.all('*', (req : Request, res : Response, next : NextFunction) => {
    return res.status(404).json({message:'not found !'})
  });

app.use(globalErrorHandler);
    
module.exports = app;