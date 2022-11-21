import { useContext, useEffect, useState } from "react";
import Atividade from "../components/Account/Atividade";
import NovaAtividade from "../components/Account/NovaAtividade";
import {destroyCookie} from 'nookies'
import Router from "next/router";
import Link from "next/link";
import { setupAPIClient } from "../utils/Axios";
import { withSSRAuth } from "../utils/withSSRAuth";
import { GetServerSidePropsContext } from "next";
import { useQuery } from "react-query";
import LoadingScreen from "../components/LoadingScreen";




type Transaction = {
    id:string;
    createdAt:string;
    from: string;
    to:string;
    value:string
}


type User = {
    username:string;
}



type ResultLoadQuery = {
    username:string
    balance:string;
    transactions:Transaction[]
}

export default function Account(){
    const api = setupAPIClient();
    const [ balanceShown, setBalanceShown] = useState
    (false);
    const {data, isLoading, error, refetch} = useQuery('Account', async () => {
        const response = {result:{}}

        response.result = await api.get('/account').then((data) => data.data)

        return response
    })




   const account = data?.result as ResultLoadQuery

    function logOut(){
        destroyCookie(null, 'NG.CASH.token')
        Router.push('/')
    }
    

    const toggleBalance = () => {
        setBalanceShown(!balanceShown)
    }

        



  return(
    <>
      <div className="container">

        
         <LoadingScreen state={!data && isLoading} textFeedback="Carregando seus dados..."/>

        <header>
            <div className="balanceSection">
                <div className="balance">
                    <h3>{balanceShown ? Intl.NumberFormat('pt-BR', {
                                style:'currency',
                                currency:'BRL'
                            }).format(account?.balance) : (<>
                            <h3 style={{display:"inline"}}>R$</h3>
                            <img src="/img/icons/line.svg" />
                            </>
                            )
                        }</h3>
                    <div className="updateBalance">
                        <img src="/img/icons/arrow-clockwise.svg" alt="" />
                    </div>

                </div>
                <div className="toggleVisibilityButton">
                    <img onClick={() => toggleBalance()} src={balanceShown ? "/img/eye.svg" : "/img/eye_block.svg"} alt="" />
                </div>
                {isLoading && <img className="spinner" src="/img/icons/spinner.svg" alt="" />}
                   
            </div>
            <div className="logSection">
                <nav>
                    <ul>
                        <li><Link href='/' onClick={logOut}>sair</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
        <div className="content">
            <div className="contentContainer">
                <h1>Saudações, {account?.username}</h1>
                <div className="transactionsContent">
                    <Atividade username={account?.username} onLoadTransitions={account?.transactions}/>
                    <NovaAtividade balance={account?.balance} updateTransactions={refetch} currentUser={account?.username}/>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx:GetServerSidePropsContext) => {
    
        const apiClient = setupAPIClient(ctx);
        const result = await apiClient.get('/user/me');
    
        return {
            props: {

            }
        }
})