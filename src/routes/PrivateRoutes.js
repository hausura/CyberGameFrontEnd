import { UserContext } from "../context/UserContext"
import { useContext, } from "react"
import { Alert } from "react-bootstrap"
import { useSelector } from "react-redux"

const PrivateRoute = (props) =>{

    const user = useSelector(state => state.user.account)
    if(!user || !user.auth ){
        return(
        <Alert variant="danger" dismissible>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>
            Permission Denied
            </p>
        </Alert>
    )
}
    return(
        <>
            {props.children}
        </>    
    )
}
export default  PrivateRoute