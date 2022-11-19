import Cadastro from "../components/Cadastro/Cadastro";
import Error from "../components/Error";
import Header from "../components/Header";
import Login from "../components/Login";
import Welcome from "../components/Welcome";

export default function home(){
  return(
    <>
    {/* <Error/> */}
      <div className="container">
        <Header/>
        <div className="content">
          {/* <Welcome/> */}
          <Cadastro/>
          {/* <Login/> */}
        </div>
      </div>
    </>
  )
}