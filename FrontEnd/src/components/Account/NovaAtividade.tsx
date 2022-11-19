import { useEffect, useState } from "react";
import Button from "../Button";
import InputErrorElement from "../InputErrorElement";

export default function NovaAtividade(){
    const [hasErrors, setHasErrors] = useState(true)
    return(
        <div className="newActivitySection">
        
            <h1>Nova transferência</h1>

            <label htmlFor="username">Nome de usuário</label>
            <div className={`inputUsername ${hasErrors ? "erro":""}`}>
                    <span>@</span>
                    <input type="text" name="username" placeholder="(usuário)" id="username" />
                    <InputErrorElement message="Usuário não existe"/>
            </div>
            
            <label htmlFor="valor">Valor</label>
            <div className={`inputValue ${hasErrors ? "erro":""}`}>
                    <span>R$</span>
                    <input type="number" placeholder="1.000,00" name="valor" id="valor" />
                    <InputErrorElement message="Saldo insufiente"/>
            </div>


            <Button className="sendMoneyButton" active={false} text="enviar quantia"/>
        </div>
    )
}