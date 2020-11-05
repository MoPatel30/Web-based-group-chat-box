import './App.css';
import React from 'react';
import {Sidebar} from "./Sidebar"
import {Chat} from "./Chat"
export class App extends React.Component{
  render(){
    return(
      <div className="app">
        <div className = "app_body">
          <Sidebar />
          <Chat />

        </div>
        
      </div>
    )
  }
}

