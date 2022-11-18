import { Decimal } from "@prisma/client/runtime";
import { prisma } from "../../prisma";
import { TransactionRepository } from "./transaction-repository";

type transactionCreateData = {
  value:Decimal;
  debitedAccountId:string;
  creditedAccountId:string;
}

type Transaction = {
  id:string;
  value:Decimal;
  createdAt:Date;
  debitedAccountId:string;
  creditedAccountId:string;
}

type Account = {
  id:string;
  balance:Decimal
}

export class PrismaTransactionRepository implements TransactionRepository{

    
    async newTransition(value:Decimal, debitedAccount:Account, creditedAccount:Account){
      
      const [r1, r2, r3]: [Account, Account, Transaction] = await prisma.$transaction([
        prisma.accounts.update({data:{balance:Decimal.sub(debitedAccount.balance,value)}, where:{id:debitedAccount.id}}),
        prisma.accounts.update({data:{balance:Decimal.sum(creditedAccount.balance,value)}, where:{id:creditedAccount.id}}),
        prisma.transactions.create({data:{value, debitedAccountId:debitedAccount.id, creditedAccountId:creditedAccount.id}})
      ])
      
      return r3;      
    }
  
    async customQuery(query:string){
      return await prisma.$queryRawUnsafe(query)
    }

    
}