interface ButtonState{
    active:boolean
    text:string
    className?:string
}

export default function Button({active, text, className}:ButtonState){
    return(
    <button disabled={!active} className={className}>
        {text}
    </button>
    )
}