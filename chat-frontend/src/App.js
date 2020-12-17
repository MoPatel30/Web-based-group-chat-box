import './App.css';
import React, { useEffect, useState, useParams } from 'react';
import Sidebar from "./Sidebar"
import Chat from "./Chat"
import Pusher from "pusher-js"
import axios from "./axios"
import Login from './Login'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import { useStateValue } from './StateProvider';
import SidebarChatTwo from './SidebarChat';
import {connect} from "react-redux"


function App({ username }){
  const [messages, setMessages] = useState([])
  //const [{user}, dispatch] = useStateValue()
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

              <Route path = "/room/:roomId">
                <Chat />
              </Route>

              <Route path = "">
                <h1>Home Screen</h1>
                <Sidebar />
              </Route>

            </Switch>

          </BrowserRouter>


        </div>
             
      )
    : (
      <Login />
        
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
