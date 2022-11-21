import { useEffect, useState } from "react"
import { setupAPIClient } from "../../utils/Axios";
import InputMask from 'react-input-mask'



const options = [ "Cash-in", "Cash-out"]

type UserTransitionsData = {
    currentPage:number;
    results:number;
    totalPages:number;
    transactions:Transaction[]
}

type Transaction = {
    id:string;
    createdAt:string;
    from: string;
    to:string;
    value:number
}

type AtividadeProps = {
    username?:string
    onLoadTransitions: UserTransitionsData
}

export default function Atividade({ username ,onLoadTransitions}: AtividadeProps){

    const api = setupAPIClient();
    const [isThereTransferences, setIsThereTransferences] = useState(true)
    const [isOpen, setIsOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [newUserTransitionsData, setNewUserTransitionsData] = useState({} as UserTransitionsData);
    
    const [selectedOption, setSelectedOption] = useState("");
    const [dateFilter, setDateFilter] = useState('');

    const toggling = () => setIsOpen(!isOpen);

    const onOptionClicked = (value:string) => () => {
        setSelectedOption(value);
        setIsOpen(false);
    }

    
    useEffect(() => {

        api.get(`/transaction?${page != 1 && `page=${page}`}&${!!selectedOption && `type=${selectedOption.toLowerCase()}`}&${!!dateFilter && `date=${dateFilter}`}`).then(response => {
           const {result} = response.data
           setNewUserTransitionsData(result)
        })

    },[selectedOption,dateFilter, page])

    type onChangeDateTypingTimeout = {
        typingTimeout: number | any
    }

    const state : onChangeDateTypingTimeout = {
        typingTimeout:0
    }


    return(
        <div className="activitySection">
            <h1>Atividade</h1>

            <div className="filterSection">
                <div className="filters">
                    <InputMask mask={'9999-99-99'} placeholder='Data AAAA-MM-DD' onChange={(e) => {
                        clearTimeout(state.typingTimeout)                
                        
                        state.typingTimeout = setTimeout(() => {
                            setDateFilter(e.target.value)
                        },700)
                        
                    }} />
                    <div className="dropDownContainer">
                        <div className="dropDownHeader" onClick={toggling}>
                            {selectedOption || "Tipo"}
                             <img src="/img/icons/arrow-down.svg" alt="" />
                        </div>
                        {isOpen && (
                            <div className="dropDownListContainer">
                                <ul className="dropDownList">
                                    {options.map(option =>(
                                        <li className="listItem" onClick={onOptionClicked(option)} key={Math.random()}>
                                            {option}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )

                        }
                    </div>
                    {
                        (dateFilter || selectedOption) && (<a className="clearFilter" onClick={() => {
                            setDateFilter('')
                            setSelectedOption('')
                        }}> Limpar</a>)
                    }
                </div>
                <img src="/img/icons/funnel.svg" alt="" />
            </div>

            <div className="tableContainer">


                {onLoadTransitions?.results ? 
                (

                    <>
                    <table>
                    <thead>
                        <th>Transferência</th>
                        <th>Tipo</th>
                        <th>Data</th>
                        <th>Valor</th>
                    </thead>

                    {selectedOption || page != 1 || dateFilter ? (<>
                        {newUserTransitionsData.transactions.map(transaction => 
                    {
                        let type;
                        if(transaction.from == username){
                            type = 'Cash-out'
                        } else {
                            type = 'Cash-in'
                        }

                        return ( 
                        <tbody key={Math.random()}>
                            <td>{type === 'Cash-out' ? `Transferência para ${transaction.to}` : `Transferência de ${transaction.from}` }</td>
                            <td>{type}</td>
                            <td>{Intl.DateTimeFormat('pt-BR', {
                                day:'2-digit',
                                month:'short',
                                year:'numeric'
                            }).format(new Date(transaction.createdAt))  }</td>
                            <td className={type === 'Cash-out' ? 'debit' : 'credit'}>
                            {type === 'Cash-out' ? '-' : ''}{
                            Intl.NumberFormat('pt-BR', {
                                style:'currency',
                                currency:'BRL'
                            }).format(transaction.value)
                            }</td>
                        </tbody>    
                        )
                    } 
                        )}
                    </>) : (<>
                        {onLoadTransitions.transactions.map(transaction => 
                    {
                        let type;
                        if(transaction.from == username){
                            type = 'Cash-out'
                        } else {
                            type = 'Cash-in'
                        }

                        return ( 
                        <tbody key={Math.random()}>
                            <td>{type === 'Cash-out' ? `Transferência para ${transaction.to}` : `Transferência de ${transaction.from}` }</td>
                            <td>{type}</td>
                            <td>{Intl.DateTimeFormat('pt-BR', {
                                day:'2-digit',
                                month:'short',
                                year:'numeric'
                            }).format(new Date(transaction.createdAt))  }</td>
                            <td className={type === 'Cash-out' ? 'debit' : 'credit'}>
                            {type === 'Cash-out' ? '-' : ''}{
                            Intl.NumberFormat('pt-BR', {
                                style:'currency',
                                currency:'BRL'
                            }).format(transaction.value)
                            }</td>
                        </tbody>    
                        )
                    } 
                        )}
                    </>)}
                    
                    </table>
                    </>
                ) 
                
                :
                    (
                    <div  className="noTransference">
                        <img src="/img/ilustra/money.svg"/>
                        <h1>Não á transferências por aqui ainda ; )</h1>
                    </div>
                    )
                }
                
                
            </div>
                <div className="paginacaoSection">
                    <div className="paginacao">

                    {selectedOption || page != 1 || dateFilter ? 
                    (<>
                    
                    {newUserTransitionsData && (
                            <>
                            { page > 1 && (<a onClick={() => {
                                        setPage(page - 1)
                                        }} >
                                        <img  src="/img/icons/arrow-left.svg" alt="" />
                                        </a>
                                        )
                             }
                             {
                                Array(newUserTransitionsData.totalPages).fill(newUserTransitionsData.totalPages).map((el, i) => {
                                    return (
                                        <a key={Math.random()} className={`${page == i + 1 && 'current'}`} onClick={() => setPage(i+1)} href="#">{i + 1}</a>
                                    )
                                })
                            }
                            {
                                page != newUserTransitionsData.totalPages && (
                                <a onClick={() => {
                                    setPage(page + 1)
                                }} >
                                    <img  src="/img/icons/arrow-right.svg" alt="" />
                                </a>
                                )
                             }
                            </>
                        )}
                    </>): 
                    
                    (<>
                        {onLoadTransitions && (
                            <>
                            { page > 1 && (<a onClick={() => {
                                        setPage(page - 1)
                                        }} >
                                        <img  src="/img/icons/arrow-left.svg" alt="" />
                                        </a>
                                        )
                             }
                             {
                                Array(onLoadTransitions.totalPages).fill(onLoadTransitions.totalPages).map((el, i) => {
                                    return (
                                        <a key={Math.random()} className={`${page == i + 1 && 'current'}`} onClick={() => setPage(i+1)} href="#">{i + 1}</a>
                                    )
                                })
                            }
                            {
                                page != onLoadTransitions.totalPages && (
                                <a onClick={() => {
                                    setPage(page + 1)
                                }} >
                                    <img  src="/img/icons/arrow-right.svg" alt="" />
                                </a>
                                )
                             }
                            </>
                        )}</>)}

                        
                     </div>
                </div>
        </div>
    )
}