import React, { Component } from 'react'
import "./SidebarChat.css";
import {Avatar, IconButton} from "@material-ui/core";



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

export default SidebarChat
