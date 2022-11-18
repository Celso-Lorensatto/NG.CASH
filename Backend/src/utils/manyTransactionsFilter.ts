import { Decimal } from "@prisma/client/runtime";
import { PrismaTransactionRepository } from "../repository/transactionRepository/prisma-transaction-repository";


type queryResultRows = [{total: string}]

type Transaction = {
    id:string;
    value:Decimal;
    createdAt:Date;
    debitedAccountId:string;
    creditedAccountId:string;
}


export class ManyTransactionsFilter {
    private accountId: string;
    private pagination:number = 10;
    private queryString: string;
    private transactionDb: PrismaTransactionRepository;
    private totalPages: number = 0;
    private page: number = 0;


    constructor(accountId:string, transactionDb: PrismaTransactionRepository){
        this.accountId = accountId;
        this.queryString = `SELECT * FROM "Transactions" WHERE `
        this.transactionDb = transactionDb;
    }

    private chainQueryTest(){
        if(this.queryString != `SELECT * FROM "Transactions" WHERE `) this.queryString += ' AND '
    }

    public filterType(type:string){

        this.chainQueryTest()

        if(type){

            if(type === 'cash-in'){
                this.queryString += `"creditedAccountId"  = '${this.accountId}'`
            }

            if(type === 'cash-out'){
                this.queryString += `"debitedAccountId"  = '${this.accountId}'`
            }

        } else {
            this.queryString += `"debitedAccountId" = '${this.accountId}' OR "creditedAccountId"  = '${this.accountId}' `
        }

        return this;
    }

    public filterDate(date:string){
        if(date){
            this.chainQueryTest()
            const convertedDate = new Date(date);
            const rangeDate = new Date(convertedDate.setDate(convertedDate.getDate()+1)) 
            convertedDate.setDate(convertedDate.getDate()-1)
            this.queryString += `"createdAt"  BETWEEN '${convertedDate.toISOString()}' AND '${rangeDate.toISOString()}' `
        } else {
            this.queryString += ` ORDER BY "createdAt" DESC `
        }

        return this;
    }

    

    public async filterPagination(page:number){
        const [total] = await this.transactionDb.customQuery(this.queryString.replace('*',`COUNT(*) as total`).replace('ORDER BY "createdAt" DESC', " ")) as queryResultRows
        this.totalPages = parseInt(total.total) / this.pagination > Math.round(parseInt(total.total) / this.pagination) 
        ? Math.round(parseInt(total.total) / this.pagination) + 1 :  parseInt(total.total) / this.pagination
        if(page){
            const indexRowStart = page * this.pagination+(page -1) - this.pagination
            this.page = page;
            this.queryString +=  `OFFSET ${indexRowStart} ROWS FETCH NEXT ${this.pagination} ROWS ONLY`   
        } else {
            this.page = 1
            this.queryString +=  `OFFSET 0 ROWS FETCH NEXT ${this.pagination} ROWS ONLY`   
        }

        return this;
    }

    public async executeFinalQuery(){
        const transactions = await this.transactionDb.customQuery(this.queryString) as Transaction[];

        return {
            totalPages:this.totalPages,
            currentPage: this.page,
            results:transactions.length,
            transactions
        }        
    }



}