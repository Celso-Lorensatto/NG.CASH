import { Request, Response, NextFunction } from "express"
import * as yup from 'yup';
import * as bcrypt from 'bcrypt'
import { PrismaAccountRepository } from "../repository/accountRepositoy/prisma-account-repository";
import {PrismaUserRepository} from '../repository/userRepository/prisma-user-repository';
import * as jwt from 'jsonwebtoken'
import { promisify } from "util";


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


const userValidation = (userObj :UserRequestData) =>{
    const userSchema = yup.object({
        username: yup.string().min(4).matches(/^(@)/, "Sem o @ no início").required("inclusão do usuário é obrigatória"),
        password:yup.string().min(8, "A senha deve ter no mínimo 8 caracteres").matches(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/, "A Senha deve contar no mínimo uma letra maiúscula e um número").required('A Senha é obrigatório')
    })
    return userSchema.validate(userObj).catch(err => err)
}

export const usernamePattern = (username: string) => {
    if(username.startsWith('@')){
        return username
    } else {
        return `@${username}`
    }
}

const hashPass = async (password:string) => await bcrypt.hash(password,12)

const verifyHashPass = async (passHash:string, password:string) => await bcrypt.compare(password, passHash)

const signToken = (id:string) => jwt.sign({id}, process.env.JWT_SECRET!,{
    expiresIn:process.env.JWT_EXPIRES_IN
})

const createSendToken = (user : User, statusCode: number, res: Response) => {
    const token = signToken(user.id);
    const cookieOptions = {
        expiresIn:new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN! as any * 24 * 60 * 60 * 1000
        ),
        httpOnly:true
    };
    res.cookie('jwt', token, cookieOptions)

    //Remove password from the output
    user.password = undefined;

    res.status(statusCode).json({
        status:'success',
        token,
        data:{
            user,
        }
    })
}

type jwtKeyType = jwt.SigningKeyCallback & {
    id?:string
}

exports.isLoggedIn = async(req : Request, res :Response, next : NextFunction) => {
    if(req.cookies.jwt) {
        try{
            const decoded: jwtKeyType = await promisify(jwt.verify)(
                req.cookies.jwt,
                // @ts-ignore
                process.env.JWT_SECRET
                );

            const currentUser = await userDb.findOne({id:decoded.id});
            if(!currentUser){
                return next();
            }

            res.locals.user = currentUser;
            return next();
        } catch(err){
            return next();
        }
    }
    next();
}

exports.protect = catchAsync(async (req:Request,res:Response,next:NextFunction) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }
    
    if (req.cookies.jwt){
        token = req.cookies.jwt
    }
    
    if(!token || token === 'null') {
        return next (
            new AppError('Você não esta autenticado ! Por favor logue na sua conta', 401)
        )
    }

    try{
        const decoded: jwtKeyType = await promisify(jwt.verify)(token, 
            //@ts-ignore
            process.env.JWT_SECRET);
        const currentUser = await userDb.findOne({id:decoded.id})
        res.locals.user = currentUser;

    }catch (err : any) {
        if (err.message === 'jwt expired'){
            return next(
                new AppError('Sua Sessão expirou, por favor logue novamente !',403 )
            )
        }
    }

    next();
})

exports.login = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    const {username, password} = req.body;
    
    if(!username || !password){
        return next(
            new AppError("Por favor informe username e password(senha)", 400)
        )
    }

    const newUsername = usernamePattern(username)

    const user = await userDb.findOne({username:newUsername, excludePassword:false})

    if(!user || !(await verifyHashPass(user.password!, password))){
        return next(
            new AppError("Nome do usuário ou senha estão incorretos", 401)
        )
    }

    delete user.password;

    createSendToken(user, 200, res)
})

exports.logout = (req : Request, res: Response) => {
    res.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });
    res.status(204).json({ status: 'success' });
  };


exports.newAccount = catchAsync(async (req : Request,res : Response, next : NextFunction) => {
const {username, password} = req.body;
username.toLowerCase()
const result:UserRequestData = await userValidation({username, password})

if(result.errors){
    return next(
        new AppError(result.errors.join('\n'),400)
    )
}

const user = await userDb.findOne({username})

if(user){
    return next(
        new AppError('Usuário já tem uma conta !', 400)
    )
}

const newAccount : {id:string} = await accountDb.create()
const hashadPass = await hashPass(password)
const newUser:User = await userDb.create({username, password:hashadPass, accountId:newAccount.id})

delete newUser.password;


createSendToken(newUser, 201, res)
})