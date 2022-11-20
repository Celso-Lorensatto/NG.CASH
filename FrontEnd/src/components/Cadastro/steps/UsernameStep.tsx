import { useState } from "react";
import { setupAPIClient } from "../../../utils/Axios";
import Button from "../../Button";
import InputErrorElement from "../../InputErrorElement";

type UsernameStepProps = {
    username :string
    setUserName:(username:string)=>void
    setUserNameStepFinished:(state:boolean) =>void
}

export default function UsernameStep({username, setUserName, setUserNameStepFinished}:UsernameStepProps){
    const api = setupAPIClient();
    const [usernameStepValue, setUsernameStepValue] = useState('');
    const [errorState, setErroState] = useState('')


    async function validUsername(){
        setUserName('')
        if(!usernameStepValue.match(/^[a-zA-Z1-9]{3,}$/)){
            return  setErroState('Mínimo 3 caracteres, somente letras e números.')
        } 
        
        const result = await api.get(`/user/${usernameStepValue}`).catch(err => err)
        
        if(result.status == 200){
            return  setErroState('Nome de usuário ja ultilizado')

        }

        setErroState('')
        setUserName(usernameStepValue)
    }

    function handleFinishStep(){
        setUserNameStepFinished(true)
    }
        
    return(
        <div className="usernameStep">
            <img src="/img/ilustra/login.svg" alt="" />
            <h2>Escolha seu nome de usuário exclusivo :)</h2>



            <label htmlFor="username">Nome de usuário</label>
            <div className={`inputUsername ${errorState && 'erro'}`}>
                <span>@</span>
                <input type="text" onBlur={validUsername} onChange={(e) => setUsernameStepValue(e.target.value)} name="username" id="username" />
               {errorState && (<InputErrorElement message={errorState}/>)} 
            </div>

            <p>Dica: No nome de usuário é permitido somente o uso de letras, números e "."</p>

            <Button active={!!username} onClick={handleFinishStep} text='definir nome de usuário'/>

        </div>
    )
}