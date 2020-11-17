/* eslint-disable no-template-curly-in-string */
import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons'
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon"
import MicIcon from "@material-ui/icons/Mic"

import React from 'react'
import "./Chat.css"


export default function Chat({messages}){
        return (
            <div className = "chat">
               <div className = "chat_header">
                   <Avatar />

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
                            className = 'chat_message'
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
                        <input placeholder = "Type a message" type = "text" />
                        <button type = "submit">Send a message</button>
                    </form>
                    <MicIcon />
               </div>
        
            </div>
        )
}
