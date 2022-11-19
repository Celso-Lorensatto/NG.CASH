import { useState } from "react";
import Atividade from "../components/Account/Atividade";
import NovaAtividade from "../components/Account/NovaAtividade";

export default function Account(){

    const [ balanceShown, setBalanceShown] = useState(false);
    

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
                        <li><a href="/login">sair</a></li>
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