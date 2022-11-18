import { NextFunction, Request, Response } from "express";
import { PrismaUserRepository } from "../repository/userRepository/prisma-user-repository";
import { usernamePattern } from "./authController";


const userDb = new PrismaUserRepository();

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getUser = catchAsync(async (req:Request, res:Response, next: NextFunction) => {
    const query = req.params.username;

    if(!query){
        return next(
            new AppError('Nenhum usuário inserido', 400)
        )
    }

    const username = usernamePattern(query)

    const user = await userDb.findOne({username})

    if(!user){
        return next(
            new AppError('Nenhum usuário encontrado', 404)
        )
    }

    res.status(200).json({
        status:'ok',
        data:{
            user
        }
    })
})