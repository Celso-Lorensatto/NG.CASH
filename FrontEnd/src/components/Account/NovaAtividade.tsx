import { useEffect, useState } from "react";
import { setupAPIClient } from "../../utils/Axios";
import Button from "../Button";
import InputErrorElement from "../InputErrorElement";

type NovaAtividadeProps = {
    currentUser:string
    balance:string
}

export default function NovaAtividade({currentUser, balance}:NovaAtividadeProps){
    const api = setupAPIClient();
    const [username, setUsername] = useState('')
    const [value, setValue] = useState('');
    const [usernameErrorState, setUsernameErrorState] = useState('')
    const [valueErrorState, setValueErrorState] = useState('')

    async function validUsername(){
        if(!username){
            return  setUsernameErrorState('')

        }
        
        const result = await api.get(`/user/${username}`).catch(err => err)

        if(currentUser == '@'+username){
            return  setUsernameErrorState('Não é possível transferir para sí mesmo !')

        }

        
        if(result.response?.status == 404){
            return  setUsernameErrorState('Usuário não existe')

        }

        setUsernameErrorState('')
    }

    return(
        <div className="newActivitySection">
        
            <h1>Nova transferência</h1>

            <label htmlFor="username">Nome de usuário</label>
            <div className={`inputUsername ${usernameErrorState && 'erro'}`}>
                    <span>@</span>
                    <input type="text" onBlur={validUsername} name="username" onChange={e => {
                        setUsername(e.target.value)
                        console.log(e.target.value, currentUser)
                        if('@'+e.target.value == currentUser){
                            setUsernameErrorState('Não é possível transferir para sí mesmo !')
                        }
                        
                        }} placeholder="(usuário)" id="username" />
                   {usernameErrorState && (<InputErrorElement message={usernameErrorState}/>)} 
            </div>
            
            <label htmlFor="valor">Valor</label>
            <div className={`inputValue ${valueErrorState ? "erro":""}`}>
                    <span>R$</span>
                    <input type="number" placeholder="1.000,00" onChange={(e) => {
                        setValue(e.target.value)
                        if(parseFloat(e.target.value) > parseFloat(balance)){
                            return setValueErrorState('Saldo insuficiente para operação')
                        }

                        setValueErrorState('')
                    }} name="valor" id="valor" />
                    {valueErrorState && (<InputErrorElement message={valueErrorState}/>)}
            </div>


            <Button className="sendMoneyButton" active={false} text="enviar quantia"/>
        </div>
    )
}