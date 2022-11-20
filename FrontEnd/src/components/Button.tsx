interface ButtonState{
    active:boolean
    text:string
    className?:string
    onClick?:() => any
}

export default function Button({active, text, className, onClick}:ButtonState){
    return(
    <button disabled={!active} onClick={onClick} className={className}>
        {text}
    </button>
    )
}