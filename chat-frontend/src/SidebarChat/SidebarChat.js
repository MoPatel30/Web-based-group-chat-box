import React, { Component, useState, useEffect } from 'react'
import "./SidebarChat.css";
import {Avatar} from "@material-ui/core";
import {Link} from "react-router-dom"
import axios from "../axios"



function SidebarChatTwo(props){
    const [seed, setSeed] = useState("")
 
    
    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000))      
    }, [])

    const createChat = () => {
        const roomName = prompt("Please enter name for chat")

        if(roomName){ 
            axios.post("/rooms",
            {
                name: roomName
            }
            ) 
        }
    }
    
    return !props.addNewChat ? (
            <Link to = {`/rooms/${props.id}`}>      
                <div className = "sidebarChat">
                    <Avatar src = {`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                    <div className = "sidebarChat_info">
                        <h2 style = {{color: "white", textDecoration: "none !important"}}>{props.name}</h2> 
                        <p style = {{color: "white", textDecoration: "none !important"}}> Locked Room... </p>
                    </div>
                </div>
            </Link>

    ): (
        <div onClick={createChat} className = "sidebarChat">
            <h2>Add new chat</h2>
        </div>
        
    )
}

export default SidebarChatTwo




export class SidebarChat extends Component {
    render() {
        return (
            <div className = "sidebarChat">
                <Avatar src = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2F4-rLJ5DkECA%2Fmaxresdefault.jpg&f=1&nofb=1" />
                <div className = "sidebarChat_info">
                    <h2>Room name</h2>
                    <p>This is the last message</p>
                </div> 

            </div>
        )
    }
}


