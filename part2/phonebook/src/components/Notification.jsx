function Notification({message, isAlert}){
    return <p className={isAlert? "alert" : "notify"}>{message}</p>
}

export default Notification