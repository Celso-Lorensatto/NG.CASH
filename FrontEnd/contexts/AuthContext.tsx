import Router from 'next/router';
import {setCookie} from 'nookies'
import {createContext, ReactNode, useEffect, useState} from 'react';
import {setupAPIClient} from '../src/utils/Axios';

type User = {
    username:string;
}

type SignInCredentials = {
    username:string;
    password:string;
}

type AuthContextData = {
    signIn(credentials:SignInCredentials):Promise<void>;
    isAuthenticated:boolean
}

type AuthProviderProps = {
    children:ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({children}:AuthProviderProps){
    const api = setupAPIClient();
    const [user, setUser] = useState<User>();
    const isAuthenticated = !!user;

    useEffect(() => {
        api.get('/user/me').then(response => {
            const {username} = response.data
            setUser({username})
        })
    },[])

    async function signIn({username, password}:SignInCredentials){
        const response = await api.post('/user/login',{
            username,
            password
        })

        const {token} = response.data

        setCookie(undefined, 'NG.CASH.token', token,{
            maxAge:60*60*24*30,
            path:'/'
        })
        
        setUser({username})

        api.defaults.headers['authorization'] = `Bearer ${token}`

        Router.push('/account')
    }

    return(
        <AuthContext.Provider value={{signIn, isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}