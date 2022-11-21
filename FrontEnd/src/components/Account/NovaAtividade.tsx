import { useEffect, useState } from "react";
import { QueryObserverResult, useQuery } from "react-query";
import { setupAPIClient } from "../../utils/Axios";
import Button from "../Button";
import InputErrorElement from "../InputErrorElement";

type NovaAtividadeProps = {
    currentUser:string
    balance:string
    updateTransactions:() => void
}

export default function NovaAtividade({currentUser, balance, updateTransactions}:NovaAtividadeProps){
    const api = setupAPIClient();
    const [username, setUsername] = useState('')
    const [value, setValue] = useState('');
    const [usernameErrorState, setUsernameErrorState] = useState('')
    const [valueErrorState, setValueErrorState] = useState('')
    const [sending, setSending] = useState(false);
    const [newActivityMessage, setNewActivityMessage] = useState('')

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

    async function handleNewActivity(){
        setSending(true)
        const result = await api.post('/transaction/new', {
            value:parseFloat(value),
            username:'@'+username
        }).catch(err => {
            setNewActivityMessage('Algo de errado ocorreu :(')
            setTimeout(() => {
                setNewActivityMessage('')
            }, 3000)
            setSending(false)
        })

        setNewActivityMessage('Quantia enviada com sucesso !')
        setTimeout(() => {
            setNewActivityMessage('')
        }, 3000)
        setSending(false)
        setUsername('')
        setValue('')
        updateTransactions()
    }

    return(
        <div className="newActivitySection">

            {
                newActivityMessage && (

            <div className="newActivityMessage">
                <span>{newActivityMessage}</span>
            </div>
                )
            }

        
            <h1>Nova transferência</h1>

            <label htmlFor="username">Nome de usuário</label>
            <div className={`inputUsername ${usernameErrorState && 'erro'}`}>
                    <span>@</span>
                    <input type="text" onBlur={validUsername} name="username" onChange={e => {
                        setUsername(e.target.value)
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

            {sending ? 
            <div className="sendingMoney">
                <h1>enviando quantia...</h1>
                <img className="spinner sendingMoney" src="/img/icons/spinner.svg" alt="" />
            </div>
            : 
            <Button className="sendMoneyButton" onClick={handleNewActivity} active={!!username && !!value && !usernameErrorState && !valueErrorState } text="enviar quantia"/>}
            
        </div>
    )
}