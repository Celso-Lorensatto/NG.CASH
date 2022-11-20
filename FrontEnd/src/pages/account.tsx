import { useEffect, useState } from "react";
import Atividade from "../components/Account/Atividade";
import NovaAtividade from "../components/Account/NovaAtividade";
import {destroyCookie} from 'nookies'
import Router from "next/router";
import Link from "next/link";
import { setupAPIClient } from "../utils/Axios";
import { withSSRAuth } from "../utils/withSSRAuth";
import { GetServerSidePropsContext, GetStaticPropsContext } from "next";

export default function Account(){
    const api = setupAPIClient();
    const [ balanceShown, setBalanceShown] = useState(false);

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
        <header>
            <div className="balanceSection">
                <div className="balance">
                    <h3>R${balanceShown ? (<strong>500,00</strong>) : (<img src="/img/icons/line.svg"/>) } </h3>
                    <div className="updateBalance">
                        <img src="/img/icons/arrow-clockwise.svg" alt="" />
                    </div>
                </div>
                <div className="toggleVisibilityButton">
                    <img onClick={() => toggleBalance()} src={balanceShown ? "/img/eye.svg" : "/img/eye_block.svg"} alt="" />
                </div>
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
                <Atividade/>
                <NovaAtividade/>
            </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx:GetServerSidePropsContext) => {
    
        const apiClient = setupAPIClient(ctx);
        const response = await apiClient.get('/user/me');
    
    
        return {
            props: {}
        }
})