import { useState } from "react"

const options = [ "Cash-in", "Cash-out"]

export default function Atividade(){
    const [isThereTransferences, setIsThereTransferences] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");

    const toggling = () => setIsOpen(!isOpen);

    const onOptionClicked = (value:string) => () => {
        setSelectedOption(value);
        setIsOpen(false);
    }

    
    const [typeFilter, setTypeFilter] = useState('')


    return(
        <div className="activitySection">
            <h1>Atividade</h1>

            <div className="filterSection">
                <div className="filters">
                    <input placeholder="Data(DD/MM/AAAA)" type="text" />
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
                </div>
                <img src="/img/icons/funnel.svg" alt="" />
            </div>

            <div className="tableContainer">
                
                {isThereTransferences ? (
                    <>
                <table>
                <thead>
                    <th>Transferência</th>
                    <th>Tipo</th>
                    <th>Data</th>
                    <th>Valor</th>
                </thead>
                <tbody>
                    <td>Transferência para @redrum</td>
                    <td>Cash-out</td>
                    <td>01 Jun 2022</td>
                    <td className="debit">-R$1,00</td>
                </tbody>
                <tbody>
                    <td>Transferência de @redrum</td>
                    <td>Cash-in</td>
                    <td>01 Jun 2022</td>
                    <td className="credit">R$200,00</td>
                </tbody>
                <tbody>
                    <td>Transferência de @redrum</td>
                    <td>Cash-in</td>
                    <td>01 Jun 2022</td>
                    <td className="credit">R$200,00</td>
                </tbody>
                <tbody>
                    <td>Transferência de @redrum</td>
                    <td>Cash-in</td>
                    <td>01 Jun 2022</td>
                    <td className="credit">R$200,00</td>
                </tbody>
                <tbody>
                    <td>Transferência de @redrum</td>
                    <td>Cash-in</td>
                    <td>01 Jun 2022</td>
                    <td className="credit">R$200,00</td>
                </tbody>
                <tbody>
                    <td>Transferência de @redrum</td>
                    <td>Cash-in</td>
                    <td>01 Jun 2022</td>
                    <td className="credit">R$200,00</td>
                </tbody>
                <tbody>
                    <td>Transferência de @redrum</td>
                    <td>Cash-in</td>
                    <td>01 Jun 2022</td>
                    <td className="credit">R$200,00</td>
                </tbody>
                <tbody>
                    <td>Transferência de @redrum</td>
                    <td>Cash-in</td>
                    <td>01 Jun 2022</td>
                    <td className="credit">R$200,00</td>
                </tbody>
                <tbody>
                    <td>Transferência de @redrum</td>
                    <td>Cash-in</td>
                    <td>01 Jun 2022</td>
                    <td className="credit">R$200,00</td>
                </tbody>
                <tbody>
                    <td>Transferência de @redrum</td>
                    <td>Cash-in</td>
                    <td>01 Jun 2022</td>
                    <td className="credit">R$200,00</td>
                </tbody>
                </table>
                </>
                ) : (<div  className="noTransference">
                    <img src="/img/ilustra/money.svg"/>
                    <h1>Não á transferências por aqui ainda ; )</h1>
                </div>)}
            </div>
                <div className="paginacaoSection">
                    <div className="paginacao">
                        <a href="#">
                            <img  src="/img/icons/arrow-left.svg" alt="" />
                        </a>
                        <a className="current" href="#">1</a>
                        <a href="#">2</a>
                        <a href="#">3</a>
                        <a href="#">
                            <img src="/img/icons/arrow-right.svg" alt="" />
                        </a>
                    </div>
                </div>

        </div>
    )
}