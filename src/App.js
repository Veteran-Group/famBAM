import React, { useState, createContext, useEffect } from 'react';
import logo from './assets/onering.png';
import './App.css';
import Login from './components/Login.jsx';
import { saveStatus } from './lib/login/login.js';
import Navbar from './components/Navbar';
import ChatFeed from './components/chat/ChatFeed.jsx';
import Profile from './components/Profile.jsx';
import Todo from './components/Todo.jsx';

export const AppContext = createContext();

function App() {

  let [loginStatus, setLoginStatus] = useState(false);
  let [profile, setProfile] = useState({
    user_id: 1,
    username: 'Dad',
    pic: '../src/assets/dad_profile_pic/glitch-image-1661879698.png'
  });
  let [chatLog, setChatLog] = useState([
    {
      username: `Dad`,
      message: `This is a test of the chat system lksjg klja sdfl gk j; asdlf jgk l ;jas df;kl gjl ;s dk fjg kl`,
      timestamp: '2:00pm'
    },
    {
      username: `Autumn`,
      message: `This is a response to the test`,
      timestamp: '2:01pm'
    }
  ]);

  return (
    <AppContext.Provider value={{profile, setProfile, loginStatus, setLoginStatus, chatLog, setChatLog}}>
      {!loginStatus ?
      <Login /> :
      <div className="App">
        <Navbar />
        <Profile />
        <Todo />
        <ChatFeed />
      </div>}
    </AppContext.Provider>
  );
}

export default App;
