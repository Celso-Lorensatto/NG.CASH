interface LoadingScreenProps {
    state:boolean
    textFeedback:string
    className?:string
}


export default function LoadingScreen({state, textFeedback, className}:LoadingScreenProps){
    return (
            <div className={`${!!className ? className : 'defaultFullScreenLoading'} ${!state && 'loadingHidden'}`}>
                <h1>{textFeedback}</h1>
                <img className="spinner" src="/img/icons/spinner.svg" alt="" />
            </div>
    )
}