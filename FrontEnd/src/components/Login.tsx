import { useState } from "react";
import Button from "./Button";
import InputErrorElement from "./InputErrorElement";

export default function Login(){
    const [ passwordShown, setPasswordShown] = useState(false);
    const [ passwordConfirmShown, setPasswordConfirmShown] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!passwordShown)
    }
    const togglePasswordConfirm = () => {
        setPasswordConfirmShown(!passwordConfirmShown)
    }

    
    return(
        <div className="loginContainer">
            <div className="loginContent">
                <img src="/img/logo2.jpg" alt="" />
                
                <div  className="formControl">
                    <label htmlFor="username">Nome de usuário</label>
                    <div className="inputUsername erro">
                        <input type="text" placeholder="usuário" name="username" id="username" />
                        <InputErrorElement message="Usuário não existe"/>
                    </div>
                </div>

                <div  className="formControl">
                        <label htmlFor="password">Senha</label>
                        <div className="inputPassword erro">
                            <input placeholder="sua senha aqui"  type={passwordShown ? "text" : "password"} name="password" id="password"/>
                            <img className="passwordEyeIcon" onClick={() => togglePassword()} src={passwordShown ? "/img/eye.svg" : "/img/eye_block.svg"} alt="" />
                            <InputErrorElement message="Senha Incorreta"/>
                        </div>
                </div>

                <Button className="loginButton" active={true} text='entrar'/>
            </div>
        </div>
    )
}