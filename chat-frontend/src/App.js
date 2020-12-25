import './App.css';
import React, { useEffect, useState} from 'react';
import Sidebar from "./Sidebar/Sidebar"
import Chat from "./Chat/Chat"
import Pusher from "pusher-js"
import axios from "./axios"
import Login from './Login/Login'
import {BrowserRouter, Switch} from 'react-router-dom'
import {connect} from "react-redux"


function App({ username }){
  const [messages, setMessages] = useState([])

  console.log(username)

  useEffect(() => {
    axios.get("/messages/sync")
      .then((response) => {
        setMessages(response.data)
      })
    
  }, [])

  useEffect(() => {
    const pusher = new Pusher("bf0afb4e692b20977013", {
      cluster: "us2"
    })

    const channel = pusher.subscribe("messages")
    channel.bind("inserted", (newMessage) => {
      alert(newMessage)
      setMessages([...messages, newMessage])
    })
    
    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
  
  }, [messages])


  return(
    <div className="app">
      {username ? (
        <div className = "app_body">
         
          <BrowserRouter>
            
            <Switch>
              <Sidebar /> 
            </Switch>

          </BrowserRouter>
  
          <Chat messages = {messages} />

        </div>
             
      )
    : (
      <div>
        <Login />

      </div>
        
    )    
    }
     
    </div>
  )
}


const mapStateToProps = state => {
  return {username: state.username}
}


export default connect(mapStateToProps)(App);

/*
        <BrowserRouter>
          <Sidebar />
          
          <Switch>
            <Route path = "/">
              <Login />
            </Route>

            <Route path = "/rooms/:roomId">
              <Chat />
            </Route>

            <Route path = "/login">
              <h1>Home Screen</h1>
              <Login />
            </Route>
          </Switch>

      </BrowserRouter>    


*/
