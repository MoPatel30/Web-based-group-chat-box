import React from 'react'
import "./Sidebar.css"
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import {Avatar, IconButton} from "@material-ui/core";


export class Sidebar extends React.Component {
    render() {
        return (
            <div className = "sidebar">
            
                <div className = "sidebar_header">
                    <Avatar src = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2F4-rLJ5DkECA%2Fmaxresdefault.jpg&f=1&nofb=1" />
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

            </div>
        )
    }
}
