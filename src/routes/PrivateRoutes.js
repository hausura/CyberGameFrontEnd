import { UserContext } from "../context/UserContext"
import { useContext, } from "react"
import { Alert } from "react-bootstrap"

const PrivateRoute = (props) =>{

    const {user} =useContext(UserContext);
    console.log('check private: ',user)
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