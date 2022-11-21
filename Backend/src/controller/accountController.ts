import { Decimal } from "@prisma/client/runtime";
import { NextFunction, Request, Response } from "express";
import { PrismaAccountRepository } from "../repository/accountRepositoy/prisma-account-repository";
import { PrismaTransactionRepository } from "../repository/transactionRepository/prisma-transaction-repository";
import { PrismaUserRepository } from "../repository/userRepository/prisma-user-repository";
import { ManyTransactionsFilter } from "../utils/manyTransactionsFilter";

const userDb = new PrismaUserRepository();
const transactionDb = new PrismaTransactionRepository();

const catchAsync = require('../utils/catchAsync')

type Transaction = {
    id:string;
    value:Decimal;
    createdAt:Date;
    debitedAccountId:string;
    creditedAccountId:string;
  }

type Account = {
    id:string;
    balance:Decimal;
}

type User = {
    id:string;
    username:string;
    accountId?:string;
    account?: Account;
    Transactions?:Transaction
}

exports.getData = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    const {user} : {user? : User} = res.locals
    
    const userData = await userDb.findOne({username:user?.username, excludeAccount:false}) as User;

    const filter = new ManyTransactionsFilter(userData!.accountId!, transactionDb);

    await filter.filterType().filterDate().filterPagination();


    const result = await filter.executeFinalQuery();

    res.status(200).json({
        username: userData?.username,
        balance:userData.account?.balance,        
        transactions:result
    })
})