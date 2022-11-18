import { Decimal } from "@prisma/client/runtime";
import { NextFunction, Request, Response } from "express";
import { PrismaAccountRepository } from "../repository/accountRepositoy/prisma-account-repository";
import { PrismaUserRepository } from "../repository/userRepository/prisma-user-repository";

const accountDb = new PrismaAccountRepository();
const userDb = new PrismaUserRepository();

const catchAsync = require('../utils/catchAsync')

type Account = {
    id:string;
    balance:Decimal;
}

type User = {
    id:string;
    username:string;
    accountId?:string;
    account?: Account;
}

exports.getData = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    const {user} : {user? : User} = res.locals
    
    const completeUser = await userDb.findOne({username:user?.username, excludeAccount:false})


    res.status(200).json({
        completeUser
    })
})