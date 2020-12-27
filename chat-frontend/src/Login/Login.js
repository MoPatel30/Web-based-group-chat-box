import React from 'react'
import "./Login.css"
import {auth, provider} from "../firebase"
import store from "../store/index"
import {connect} from "react-redux"
import firebase from "firebase" 


function Login() {

    const signIn = () => {
        auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(function() {
                auth
                .signInWithPopup(provider)
                .then((result) =>{
                    
                    updateUserInfo(result.user.displayName, result)
    
                })
                .catch((error) => alert(error.message)) 
            })
    }


    function updateUserInfo(username, userInfo){
        store.dispatch({
            type: "ADD_POST",
            payload: {
                username: username,
                userInfo: userInfo

            } 
        })
    }


    return (
        <div id = "login-pos">
            <div className = "login-screen">
                <h1 id = "welcome"><i>Welcome to ChatUp</i></h1>
                <p id = "slogan"><i>Chat with anyone with internet connection!</i></p>
                <h2 id = "title"> Sign In </h2>
                <button id = "google-btn" onClick = {signIn}>Google</button>
            </div>        
        </div>
    )
}


const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
}
export default connect(mapDispatchToProps)(Login)

/*
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
*/