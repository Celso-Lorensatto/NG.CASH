import { prisma } from "../../prisma";
import {UserRepository, UserCreateData, User as UserObj} from './user-repository'

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
  username:string
  password?:boolean
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

    async findOne({username, password}:FindUserOptions) {
      let user;  
      user = await prisma.users.findUnique({where:{username}})
        if(!password){
          user = exclude(user,['password'])
        }
        return user as User;
    };
}