import { Request, Response, NextFunction } from "express"
import * as yup from 'yup';
import * as bcrypt from 'bcrypt'
import { PrismaAccountRepository } from "../repository/accountRepositoy/prisma-account-repository.ts";
import {PrismaUserRepository} from '../repository/userRepository/prisma-user-repository.ts'


const userDb = new PrismaUserRepository();
const accountDb = new PrismaAccountRepository();

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


type UserRequestData = {
    username?:string
    password?:string
    errors?:string[]
}

type User = {
    id:string;
    username:string;
    password?:string;
    accountId:string;
}



const userValidation = async (userObj :UserRequestData) =>{
    const userSchema = yup.object({
        username: yup.string().min(4).matches(/^(@)/, "Sem o @ no início").required("inclusão do usuário é obrigatório"),
        password:yup.string().min(8, "A senha deve ter no mínimo 8 caracteres").matches(/^(?=.*[0-9])(?=.*[A-Z])([A-Z0-9]+)$/, "A Senha deve contar no mínimo uma letra maiúscula e um número").required('A Senha é obrigatório')
    })
    return userSchema.validate(userObj).catch(err => err)
}


export const hashpass = (password:string) => bcrypt.hash(password,12)



exports.newAccount = catchAsync(async (req : Request,res : Response, next : NextFunction) => {
const {username, password} = req.body;
const result:UserRequestData = await userValidation({username, password})

if(result.errors){
    return next(
        new AppError(result.errors.join('\n'),400)
    )
}

const user = await userDb.findOne({username, password:true})

if(user){
    return next(
        new AppError('Usuário já tem uma conta !', 400)
    )
}

const newAccount : {id:string} = await accountDb.create()
const hashadPass = await hashpass(password)
const newUser:User = await userDb.create({username, password:hashadPass, accountId:newAccount.id})

delete newUser.password;



res.status(201).json({
    message:'o usuário foi criado com sucesso !',
    newUser
})
})