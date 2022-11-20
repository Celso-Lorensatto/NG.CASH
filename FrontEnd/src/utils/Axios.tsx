import axios, { AxiosError } from 'axios';
import { headers } from '../../next.config';
import {parseCookies, destroyCookie} from 'nookies'
import Router from 'next/router';

export function setupAPIClient(ctx:any = undefined) {
    
    const cookies = parseCookies();

    const api = axios.create({
        baseURL:"http://localhost:3001",
        headers:{
            authorization:`Bearer ${cookies['NG.CASH.token']}`
        }
        
    })
    
    function signOut(){
        destroyCookie(null, 'NG.CASH.token')
    
                Router.push('/login')
    }
    
    
    api.interceptors.response.use(response => {
        return response
    }, (erro:any) => {
        if(erro.response?.status === 403){
            if(erro.response?.data?.message === 'Sua Sessão expirou, por favor logue novamente !'){
                signOut()
            }
        }
    
        return Promise.reject(erro);
    })

    return api;
}