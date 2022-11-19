import { useState } from "react";
import Button from "../../Button";
import InputErrorElement from "../../InputErrorElement";

export default function PasswordStep(){
    const [ passwordShown, setPasswordShown] = useState(false);
    const [ passwordConfirmShown, setPasswordConfirmShown] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!passwordShown)
    }
    const togglePasswordConfirm = () => {
        setPasswordConfirmShown(!passwordConfirmShown)
    }
    
    return(
        <div className="passwordStep">
            <h2>E ai, @(Usuário)?</h2>
            <p>Crie uma senha para proteger a sua conta. Ela precisa ter <strong>8 caracteres ou mais, ao menos um número e uma letra maiúscula.</strong></p>

            <div className="formgroup">
                <div  className="formControl">
                        <label htmlFor="password">Senha</label>
                        <div className="passwordInputContainer erro">
                            <input placeholder="escreva sua senha aqui"  type={passwordShown ? "text" : "password"} name="password" id="password"/>
                            <img className="passwordEyeIcon" onClick={() => togglePassword()} src={passwordShown ? "/img/eye.svg" : "/img/eye_block.svg"} alt="" />
                            <InputErrorElement message="Senha Invalida"/>
                        </div>
                </div>
            </div>

            <div className="formgroup">
                <div className="formControl">
                        <label htmlFor="passwordConfirm">Confirmar senha</label>
                        <div className="passwordInputContainer erro">
                            <input placeholder="confirme sua senha"  type={passwordConfirmShown ? "text" : "password"} name="passwordConfirm" id="passwordConfirm"/>
                            <img className="passwordEyeIcon" onClick={() => togglePasswordConfirm()} src={passwordConfirmShown ? "/img/eye.svg" : "/img/eye_block.svg"} alt="" />
                            <InputErrorElement message="Senha não confere"/>
                        </div>
                </div>
            </div>
            
            <div className="submit">

                <p>Ao criar sua conta NG.CASH, você concorda com nossos <a href="#">Termos de uso</a> e <a href="#">Política de privacidade</a>.</p>
                <Button active={false} text='criar conta'/>
            </div>

        </div>
    )
}