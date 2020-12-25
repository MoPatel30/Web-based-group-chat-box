/* eslint-disable no-template-curly-in-string */
import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons'
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon"
import MicIcon from "@material-ui/icons/Mic"
import axios from "axios"
import React, {useState, useEffect} from 'react'
import "./Chat.css"
import {connect} from "react-redux"



function Chat({ username, messages }){
    const [seed, setSeed] = useState("")
    const [input, setInput] = useState("")
 
    const date = String((new Date().getMonth() + 1) + '/' + new Date().getDate() + '/' + (new Date().getFullYear())) 

/*
    function getRoomMessages(){
        axios.get(`http://localhost:9000/messages/sync`)
        .then((response) => {
            setMessages(response.data)
        })
        .catch((error) => {
            console.log(error)
        })

        axios.get(`http://localhost:9000/rooms/${roomID}/messages`)
            .then((response) => {
                setMessages(response.data.messages)
            })
            .catch((error) => {
                console.log(error)
            })
            
    }*/


    const sendMessage = (e) => {
        e.preventDefault()

        axios.post("http://localhost:9000/messages/new", {
            message: input,
            name: username,
            timestamp: date,
            received: false
        })

        setInput("")
    }

    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000))
    
    }, [])


        return (
            <div className = "chat">
               <div className = "chat_header">
                   <Avatar src = {`https://avatars.dicebear.com/api/human/${seed}.svg`} />

                   <div className = "chat_headerInfo">
                       <h3>Main Room</h3>
                       <p>Last seen some time ago...</p>
                   </div>
                   <div className = "chat_headerRight">
                       <IconButton>
                           <SearchOutlined style = {{color: "white"}} />
                       </IconButton>
                       <IconButton>
                           <AttachFile style = {{color: "white"}} />
                       </IconButton>
                       <IconButton>
                           <MoreVert style = {{color: "white"}} />
                       </IconButton>
                   </div>
            
               </div>

               <div className = "chat_body">
                   {messages.map((message) => (
                        
                        <p
                            className = {`chat_message ${message.name === username && "chat_reciever"}`}
                        >
                            <span style = {{color: "black"}} className = "chat_name">{message.name} </span>           
                            {message.message}
                            <span className = "chat_timestamp"> {message.timestamp} </span>
                        </p>
                   ))}
               </div>

               <div className = "chat_footer">
                    <InsertEmoticonIcon style = {{color: "white"}} />
                    <form>
                        <input style = {{backgroundColor: "lightgrey", color: "black"}} value = {input} onChange = {e => setInput(e.target.value)} placeholder = "Type a message" type = "text" />
                        <button onClick = {sendMessage} type = "submit">Send a message</button>
                    </form>
                    <MicIcon style = {{color: "white"}} />
               </div>
        
            </div>
        )
}

const mapStateToProps = state => {
    return {username: state.username}
  }
  
export default connect(mapStateToProps)(Chat);
  

