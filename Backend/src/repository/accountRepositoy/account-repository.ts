import { Decimal } from "@prisma/client/runtime";

export interface Account{
    id:string;
    balance: Decimal
}

export interface AccountRepository{
    create:() => Promise<Account>;
    findOne:(id:string) => Promise<Account>;
    updateOne:(id:string, newAccount:Account) => Promise<any>;
}