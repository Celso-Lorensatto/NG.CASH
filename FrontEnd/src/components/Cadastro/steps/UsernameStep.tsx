import Button from "../../Button";
import InputErrorElement from "../../InputErrorElement";

export default function UsernameStep(){
    
    return(
        <div className="usernameStep">
            <img src="/img/ilustra/login.svg" alt="" />
            <h2>Escolha seu nome de usuário exclusivo :)</h2>



            <label htmlFor="username">Nome de usuário</label>
            <div className="inputUsername erro">
                <span>@</span>
                <input type="text" name="username" id="username" />
                <InputErrorElement message="somente letras e números"/>
            </div>

            <p>Dica: No nome de usuário é permitido somente o uso de letras, números e "."</p>

            <Button active={true} text='definir nome de usuário'/>

        </div>
    )
}