import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Cadastro from "../components/Cadastro/Cadastro";
import Error from "../components/Error";
import Header from "../components/Header";
import Login from "../components/Login";
import Welcome from "../components/Welcome";
import {parseCookies} from 'nookies'

export default function home(){
  const router = useRouter();
  const {asPath} = router;

  return(
    <>
    {/* <Error/> */}
      <div className="container">
        <Header/>
        <div className="content">
          {asPath == '/' && (<Welcome/>)}
          {asPath == '/login' && (<Login/>)}
          {asPath == '/cadastro' && (<Cadastro/> )}
        </div>
      </div>
    </>
  )
}

export const getServerSideProps:GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx)

  if(cookies['NG.CASH.token']){
    return{
      redirect:{
        destination:'/account',
        permanent:false
      }
    }
  }

  return{
    props:{}
  }
}