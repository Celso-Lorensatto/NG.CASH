import Link from "next/link";

export default function Header(){
    
    return(
    <header>
        <div className="logo">
            <a href="/">
                <img className="logoImg" src="/img/logo.svg" alt="NG.CASH Logo" />
            </a>
        </div>
        <div className="logSection">
            <nav>
                <ul>
                    <li ><Link href='/login'>login</Link></li>
                    <li ><Link href="/cadastro">cadastrar</Link></li>
                </ul>
            </nav>
        </div>
    </header>


    
    )
}