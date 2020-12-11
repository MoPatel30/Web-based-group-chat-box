import React, {useEffect, useState} from 'react'
import "./Sidebar.css"
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import {Avatar, IconButton} from "@material-ui/core";
import { SearchOutlined } from '@material-ui/icons'
import {SidebarChat, SidebarChatTwo} from "./SidebarChat";
import axios from "./axios"
import { useStateValue } from './StateProvider'



function Sidebar() {
    const[rooms, setRooms] = useState([])
    const [{user}, dispatch] = useStateValue()

    useEffect(() => {
        axios.get("http://localhost:9000/rooms")
            .then((response) => {
                setRooms(response)
                
            })
            .catch((error) => {
                console.log(error)
            })
        console.log(rooms)
    }, [])
    
    return (
        <div className = "sidebar">
            
            <div className = "sidebar_header">
                <Avatar src = {user?.photoURL} />
                 <div className = "sidebar_headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>

            </div>
            <div className= "sidebar_search">
                <div className = "sidebar_searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start new chat" type = "text" />

                </div>
            </div>

            <div className = "sidebar_chats">
                  
                <SidebarChatTwo addNewChat />
                <SidebarChatTwo />
                <SidebarChatTwo />
            </div>

        </div>
    )
    
}

export default Sidebar
