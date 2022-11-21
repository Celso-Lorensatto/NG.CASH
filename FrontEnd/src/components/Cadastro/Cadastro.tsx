import { useState } from "react";
import { setupAPIClient } from "../../utils/Axios";
import PasswordStep from "./steps/PasswordStep";
import Success from "./steps/Success";
import UsernameStep from "./steps/UsernameStep";
import {setCookie} from 'nookies'
import LoadingScreen from "../LoadingScreen";

export default function Cadastro(){
    const api = setupAPIClient();
    const [username, setUsername] = useState('');
    const [userNameStepFinished, setUserNameStepFinished] = useState(false)
    const [passwordStepFinished, setpasswordStepFinished] = useState(false)
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState('');

    async function handleSignin(password:string){
        setpasswordStepFinished(true)
        setIsLoading(true)
        try{
            const response = await api.post('/user/newAccount', {
                username:'@'+username,
                password
            })

            const {token} = response.data

            setCookie(undefined, 'NG.CASH.token', token,{
                maxAge:60*60*24*30,
                path:'/'
            })

        }catch(err){
            console.log(err)
        }

        setIsLoading(false)
        setSuccess(true);
    }
    
    return(
    <section className="signUpSection">
        {!userNameStepFinished && <UsernameStep username={username} setUserName={setUsername} setUserNameStepFinished={setUserNameStepFinished} />}
        {userNameStepFinished && !passwordStepFinished && <PasswordStep password={password} setPassword={setPassword} setPasswordStepFinished={setpasswordStepFinished} username={username} handleSignin={handleSignin} /> }

        {isLoading && <LoadingScreen state={isLoading} textFeedback="Criando Conta ..." className="creatingAccount" />}
           
        
        {success && <Success/>}
    </section>


    
    )
}