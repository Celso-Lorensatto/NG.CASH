import { Decimal } from "@prisma/client/runtime";
import { prisma } from "../../prisma";
import { PrismaAccountRepository } from "../accountRepositoy/prisma-account-repository";
import {UserRepository, UserCreateData, User as UserObj} from './user-repository'

const accountDb = new PrismaAccountRepository();

function exclude<UserObj, Key extends keyof UserObj>(
  user: UserObj,
  keys: Key[] | string[]
): Omit<UserObj, Key> {
  for (let key of keys as Key[]) {
    delete user[key]
  }
  return user
}


type User = {
 id:string
 username:string;
 password?: string;
 accountId:string;
}

type FindUserOptions = {
  id?:string;
  username?:string
  excludePassword?:boolean
  excludeAccount?:boolean
}

export class PrismaUserRepository implements UserRepository{
    
    async create({username, password, accountId} : UserCreateData){
        return await prisma.users.create({
            data:{
                username,
                password,
                accountId
            }
        })
    }

    async findOne({id, username, excludePassword = true, excludeAccount = true}:FindUserOptions) {
      let user;  
      user = await prisma.users.findUnique({where:{username, id}, include:{account:!excludeAccount}}) as User

      if(!user){
        return null
      }
        
        if(excludePassword){
          user = exclude(user,['password'])
        }
        
        if(excludeAccount){
          user = exclude(user, ['accountId'])
        } 

        return user as User;
    };
}