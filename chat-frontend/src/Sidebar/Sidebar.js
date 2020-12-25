import React, {useEffect, useState} from 'react'
import "./Sidebar.css"
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import {Avatar, IconButton} from "@material-ui/core";
import { SearchOutlined } from '@material-ui/icons'
import SidebarChatTwo from "../SidebarChat/SidebarChat";
import axios from "axios"
import {connect} from "react-redux"



function Sidebar({ username, userInfo }) {
    const[rooms, setRooms] = useState([])

    useEffect(() => {
        if(rooms.length === 0){
            axios.get("http://localhost:9000/rooms")
                .then((response) => {
                    console.log(response.data)
                    setRooms(response.data)
                        
                })
                .catch((error) => {
                    console.log(error)
                })
        
        }
        
    }, [rooms])
    console.log(username)


    function setRoomId(key){
        console.log(key)
    }

    return (
        <div className = "sidebar">
            
            <div className = "sidebar_header">
                <Avatar src = {userInfo.user.photoURL} />
                 <div className = "sidebar_headerRight">
                    <IconButton>
                        <DonutLargeIcon style = {{color: "white"}} />
                    </IconButton>
                    <IconButton>
                        <ChatIcon style = {{color: "white"}} />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon style = {{color: "white"}} />
                    </IconButton>
                </div>

            </div>
            
            <div className= "sidebar_search">       
                <div className = "sidebar_searchContainer">
                    <SearchOutlined style = {{color: "white"}} />
                    <input style = {{backgroundColor: "lightgrey", borderRadius: "20px", padding: "3px"}} placeholder="Search or start new chat" type = "text" />
                </div>
            </div>

            <SidebarChatTwo addNewChat />

            <div className = "sidebar_chats">
                {rooms.map((room) => (        
                    <SidebarChatTwo key = {room._id} id = {room._id} name = {room.name} />           
                )) 
                }
            </div>

        </div>
    )
    
}


const mapStateToProps = state => {
    return {
        username: state.username,
        userInfo: state.userInfo
    }
  }
  
export default connect(mapStateToProps)(Sidebar);
  
