import { useContext, useState } from "react";
import Button from "./Button";
import InputErrorElement from "./InputErrorElement";
import { AuthContext } from '../../contexts/AuthContext';

export default function Login(){
    const [erroMessage, setErroMessage] = useState('')
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!passwordShown)
    }

    const {signIn} = useContext(AuthContext);

    async function handleSubmitLogin(formUsername:string, formPassword:string){
        try{
            await signIn({username:formUsername, password:formPassword})
        } catch (err : any){
            if(err.response.status === 401){
                setErroMessage(err.response.data.message)
            }
        }
    }

    
    return(
        <div className="loginContainer">
            {erroMessage && (<div className='erroMessageBox'>{erroMessage}</div>)}
            <div className="loginContent">
                <img src="/img/logo2.jpg" alt="" />

                
                <div  className="formControl">
                    <label htmlFor="username">Nome de usuário</label>
                    <div className={`inputUsername ${!!erroMessage && 'erro'}`}>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="usuário" name="username" id="username" />
                    </div>
                </div>

                <div  className="formControl">
                        <label htmlFor="password">Senha</label>
                        <div className={`inputPassword ${!!erroMessage && 'erro'}`}>
                            <input placeholder="sua senha aqui" value={password} onChange={(e) => setPassword(e.target.value)}  type={passwordShown ? "text" : "password"} name="password" id="password"/>
                            <img className="passwordEyeIcon" onClick={() => togglePassword()} src={passwordShown ? "/img/eye.svg" : "/img/eye_block.svg"} alt="" />
                        </div>
                </div>

                <Button onClick={() => handleSubmitLogin(username, password)} className="loginButton" active={!!username && !!password} text='entrar'/>
            </div>
        </div>
    )
}