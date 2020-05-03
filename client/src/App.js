import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css';
import Login from './components/Login'
import Register from './components/Register';
import ChatRoom from './components/ChatRoom'
import PrivateChat from './components/PrivateChat'
import Chat from './components/Chat'
import {message} from 'antd'


function App() {
  message.config({
    maxCount: 1
  })
  return (

    <BrowserRouter>
      <div className="App">
        <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/register" exact component={Register}/>
        <Route path="/Chat" exact  component = {Chat} />
        <Route path="/public" exact  component={ChatRoom}/>
        <Route path="/private" exact  component={PrivateChat}/>
        </Switch>
        

    </div>
    </BrowserRouter>
  
  );
}

export default App;
