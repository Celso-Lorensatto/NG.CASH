export interface UserCreateData{
    username:string;
    password:string;
    accountId:string;
}

export interface User{
    id:string;
    username:string;
    password?:string;
    accountId:string;
}



export interface UserRepository{
    create:(data:UserCreateData) => Promise<User>;
    findOne:({}:{
        id?:string
        username:string
        password?:boolean
      }) => Promise<User>
}