interface InputErrorElementProps{
    message:string
}

export default function InputErrorElement({message}:InputErrorElementProps){
    return(
        <span className="inputErrorElement" >{message}</span>
    )
}