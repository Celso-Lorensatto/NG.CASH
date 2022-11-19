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
                    <li className="" ><a href="/login">login</a></li>
                    <li className=""><a href="/login">cadastrar</a></li>
                </ul>
            </nav>
        </div>
    </header>


    
    )
}