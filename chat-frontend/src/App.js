import './App.css';
import React, { useEffect, useState } from 'react';
import Sidebar from "./Sidebar"
import Chat from "./Chat"
import Pusher from "pusher-js"
import axios from "./axios"
import Login from './Login'



function App(){
  const [messages, setMessages] = useState([])

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
      setMessages([...messages, newMessage])
    }) 

    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
  
  }, [messages])

  
  return(
    <div className="app">
      <div className = "app_body">
        <Login />
        <Sidebar />
        <Chat messages = {messages}/> 

      </div>
        
    </div>
  )
}

export default App


