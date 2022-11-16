import { Decimal } from "@prisma/client/runtime";
import { prisma } from "../../prisma";
import { AccountRepository} from './account-repository'

type Account = {
  id:string;
  balance: Decimal
}


export class PrismaAccountRepository implements AccountRepository{
    
    async create(){
        const account = await prisma.accounts.create({data:{}})
        return account as Account;
    }

    async findOne(id:string) {
       
      const account = await prisma.accounts.findUnique({where:{id}})

        return account as Account;
    };
}