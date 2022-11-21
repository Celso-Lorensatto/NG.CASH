import { Decimal } from "@prisma/client/runtime";
import { NextFunction, Request, Response } from "express";
import { PrismaAccountRepository } from "../repository/accountRepositoy/prisma-account-repository";
import { PrismaTransactionRepository } from "../repository/transactionRepository/prisma-transaction-repository";
import { PrismaUserRepository } from "../repository/userRepository/prisma-user-repository";
import { User } from "../repository/userRepository/user-repository";
import { ManyTransactionsFilter } from "../utils/manyTransactionsFilter";

const transactionDb = new PrismaTransactionRepository();
const userDb = new PrismaUserRepository();
const accountDb = new PrismaAccountRepository();

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError')

type Transaction = {
    id?:string;
    value:Decimal;
    createdAt?:Date;
    debitedAccountId:String;
    creditedAccountId:String;
}

exports.newTransaction = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    const {value, username}  = req.body;
    const {user} = res.locals

    if(!value || !username) {
        return next(
            new AppError('Parâmetro "username" obrigatório', 400)
        )
    }

    if(user.username === username){
        return next(
            new AppError('Conta debitada e creditada não podem ser a mesma', 401)
        )
    }

    const userFrom = await userDb.findOne({username:user.username, excludeAccount:false})
    
    const userTo = await userDb.findOne({username, excludeAccount:false})

    const debitedAccount = await accountDb.findOne(userFrom!.accountId);

    const creditedAccount = await accountDb.findOne(userTo!.accountId);

    if(!debitedAccount || !creditedAccount){
        return next(
            new AppError(`Conta expecificada pelo ID do ${debitedAccount ?? 'debitedAccount, '}${creditedAccount ?? 'creditedAccount, '}Não existe(m).`)
        )
    }

    if(debitedAccount.balance < value){
        return next(
            new AppError('Saldo insuficiente para seguir com a operação', 401)
        )
    }

    

    const newTransaction = await transactionDb.newTransition(value, debitedAccount, creditedAccount);

    res.status(201).json({
        status:'Sucesso',
        data:{
            newTransaction
        }
    })
})

exports.manyTransactions = catchAsync(async(req:Request, res:Response, next:NextFunction) => {
    const {type, date, page} = req.query;

    const {user}: {user? : User} = res.locals

    const userObject = await userDb.findOne({id:user!.id, excludeAccount:false})


    if(!userObject){
        return next(
            new AppError('ocorreu um erro ao procurar a conta do usuário tente novamente mais tarde', 404)
        )
    }

    const filter = new ManyTransactionsFilter(userObject?.accountId, transactionDb)

    await filter
        .filterType(type as string)
        .filterDate(date as string)
        .filterPagination(parseInt(page! as string));
    
    
    const result =  await filter.executeFinalQuery();

    res.status(200).json({
        result
    })
})