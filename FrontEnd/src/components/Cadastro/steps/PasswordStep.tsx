import { useState } from "react";
import Button from "../../Button";
import InputErrorElement from "../../InputErrorElement";

type PasswordStepProps = {
    username :string
    password :string
    setPassword:(password:string) => void
    setPasswordStepFinished:(state:boolean) => void
    handleSignin:(password:string) => void
}

export default function PasswordStep({username, password, setPassword, setPasswordStepFinished, handleSignin}:PasswordStepProps){
    const [ passwordShown, setPasswordShown] = useState(false);
    const [ passwordConfirmShown, setPasswordConfirmShown] = useState(false);
    const [ passwordStepValue, setPasswordStepValue] = useState('');
    const [ passwordConfirmStepValue, setPasswordConfirmStepValue] = useState('');
    const [ errorState, setErroState] = useState('')
    const [ errorConfirmState, setErroConfirmState] = useState('')

    const togglePassword = () => {
        setPasswordShown(!passwordShown)
    }
    const togglePasswordConfirm = () => {
        setPasswordConfirmShown(!passwordConfirmShown)
    }

    function validPassword(){
        setErroState('')
        if(!passwordStepValue.match(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)){
            setErroState('Mínimo 8 caracteres, 1 Letra Maiúscula')
        }
    }
    function validPasswordConfirm(){
        setErroConfirmState('')
        if(passwordStepValue != passwordConfirmStepValue){
            setErroConfirmState('Senhas Não conferem')
        }
    }
    
    return(
        <div className="passwordStep">
            <h2>E ai, @{username} ?</h2>
            <p>Crie uma senha para proteger a sua conta. Ela precisa ter <strong>8 caracteres ou mais, ao menos um número e uma letra maiúscula.</strong></p>

            <div className="formgroup">
                <div  className="formControl">
                        <label htmlFor="password">Senha</label>
                        <div className={`passwordInputContainer ${errorState && 'erro'}`}>
                            <input placeholder="escreva sua senha aqui" onBlur={validPassword} value={passwordStepValue} onChange={(e) => setPasswordStepValue(e.target.value)} type={passwordShown ? "text" : "password"} name="password" id="password"/>
                            <img className="passwordEyeIcon" onClick={() => togglePassword()} src={passwordShown ? "/img/eye.svg" : "/img/eye_block.svg"} alt="" />
                            {errorState && <InputErrorElement message={errorState}/>}
                        </div>
                </div>
            </div>

            <div className="formgroup">
                <div className="formControl">
                        <label htmlFor="passwordConfirm">Confirmar senha</label>
                        <div className={`passwordInputContainer ${errorConfirmState && 'erro'}`}>
                            <input placeholder="confirme sua senha" value={passwordConfirmStepValue} onBlur={validPasswordConfirm} onChange={(e) => {setPasswordConfirmStepValue(e.target.value)}} type={passwordConfirmShown ? "text" : "password"} name="passwordConfirm" id="passwordConfirm"/>
                            <img className="passwordEyeIcon" onClick={() => togglePasswordConfirm()} src={passwordConfirmShown ? "/img/eye.svg" : "/img/eye_block.svg"} alt="" />
                            {!!errorConfirmState && <InputErrorElement message={errorConfirmState}/> }
                        </div>
                </div>
            </div>
            
            <div className="submit">

                <p>Ao criar sua conta NG.CASH, você concorda com nossos <a href="#">Termos de uso</a> e <a href="#">Política de privacidade</a>.</p>
                <Button active={!errorState && !errorConfirmState && !!passwordConfirmStepValue && !!passwordStepValue && passwordConfirmStepValue == passwordStepValue} onClick={() => handleSignin(passwordStepValue)} text='criar conta'/>
            </div>

        </div>
    )
}