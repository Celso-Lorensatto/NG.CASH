import Button from "../../Button";

export default function Success(){

    
    return(
        <div className="successStep">
            <div className="successContent">
                <img src="/img/logo2.jpg" alt="" />
                <h1>Parabéns,</h1>
                <h2>agora você faz parte da revolução NG.CASH!</h2>

                <p>Você deu o primeiro passo em direção a independência financeira.</p>

                <Button active={true} text='entrar na minha conta'/>
            </div>
        </div>
    )
}