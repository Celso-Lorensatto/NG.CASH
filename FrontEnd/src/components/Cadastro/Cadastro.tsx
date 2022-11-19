import PasswordStep from "./steps/PasswordStep";
import Success from "./steps/Success";
import UsernameStep from "./steps/UsernameStep";

export default function Cadastro(){
    
    return(
    <section className="signUpSection">
        {/* <UsernameStep/> */}
        <PasswordStep/>

        {/* <Success/> */}
    </section>


    
    )
}