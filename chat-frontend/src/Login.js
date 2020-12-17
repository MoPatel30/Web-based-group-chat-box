import React from 'react'
import "./login.css"
import {Button} from "@material-ui/core"
import {auth, provider} from "./firebase"
import {actionTypes} from "./reducer"
import {useStateValue} from "./StateProvider"
import store from "./store/index"
import {connect} from "react-redux"


function Login() {

    //const [{user}, dispatch] = useStateValue()

    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then((result) =>{
                console.log(result.user)
                updateUserInfo(result.user.displayName)
            })
            .catch((error) => alert(error.message))    
    }


    function updateUserInfo(userInfo){
        store.dispatch({
            type: "ADD_POST",
            payload: userInfo
        })
    }


    return (
        <div className = "login">
            <div className = "login_container">
                <img src = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.windowscentral.com%2Fsites%2Fwpcentral.com%2Ffiles%2Ftopic_images%2F2015%2Fwhatsapp-messenger-logo.png&f=1&nofb=1" />
            </div>
           
            <div className = "login_text">
                <h1>Sign in to WhatsApp</h1>
            </div>

            <Button type = "submit" onClick = {signIn}>
                Sign In with Google
            </Button>
            
        </div>
    )
}


const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
}
export default connect(mapDispatchToProps)(Login)

