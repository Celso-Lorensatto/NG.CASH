import { Decimal } from "@prisma/client/runtime";


interface transactionCreateData{
    value:Decimal;
    debitedAccountId:string;
    creditedAccountId:string;
}

interface Transaction{
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


export interface TransactionRepository{
    newTransition:(value:Decimal, debitedAccount:Account, creditedAccount:Account) => Promise<Transaction>;
    customQuery:(query:string) => Promise<any>
}