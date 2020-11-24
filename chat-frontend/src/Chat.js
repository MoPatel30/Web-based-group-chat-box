/* eslint-disable no-template-curly-in-string */
import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons'
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon"
import MicIcon from "@material-ui/icons/Mic"
import axios from "./axios"
import React, {useState, useEffect} from 'react'
import "./Chat.css"


export default function Chat({messages}){
    const [seed, setSeed] = useState("")
    const [input, setInput] = useState("")

        const sendMessage = (e) => {
            e.preventDefault()

            axios.post("/messages/new", {
                message: input,
                name: "Other Mo",
                timestamp: "2 seconds ago",
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
                       <h3>Room name</h3>
                       <p>Last seen at...</p>
                   </div>
                   <div className = "chat_headerRight">
                       <IconButton>
                           <SearchOutlined />
                       </IconButton>
                       <IconButton>
                           <AttachFile />
                       </IconButton>
                       <IconButton>
                           <MoreVert />
                       </IconButton>
                   </div>
            
               </div>

               <div className = "chat_body">
                   {messages.map((message) => (
                        // eslint-disable-next-line no-template-curly-in-string
                        <p
                            className = {`chat_message ${message.received && "chat_reciever"}`}
                        >
                            <span className = "chat_name">{message.name} </span>           
                            {message.message}
                            <span className = "chat_timestamp"> {message.timestamp} </span>
                        </p>
                   ))}
               </div>

               <div className = "chat_footer">
                    <InsertEmoticonIcon />
                    <form>
                        <input value = {input} onChange = {e => setInput(e.target.value)} placeholder = "Type a message" type = "text" />
                        <button onClick = {sendMessage} type = "submit">Send a message</button>
                    </form>
                    <MicIcon />
               </div>
        
            </div>
        )
}
