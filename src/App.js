import React, { useState, createContext, useEffect } from 'react';
import logo from './assets/onering.png';
import './App.css';
import Login from './components/Login.jsx';
import { saveStatus, logout } from './lib/login/login.js';
import Navbar from './components/Navbar';
import MainFeed from './components/MainFeed.jsx';
import Profile from './components/Profile/Profile.jsx';
import Todo from './components/Todo.jsx';
import axios from 'axios';
import UtilityBelt from './components/UtilityBelt.jsx';
import { api, chatAPI } from './config.js';
import { io } from 'socket.io-client';
import { createMessagePack } from './lib/ChatFeed/chatfeedlib';

const socket = io(chatAPI);

export const AppContext = createContext();

function App() {

  let [socketState, setSocketState] = useState(socket);
  let [loginStatus, setLoginStatus] = useState(localStorage.getItem('fambamLogin'));
  let [roomInfo, setRoomInfo] = useState({
    roomName: 'Home',
    id: 'a001'
  });
  let [profile, setProfile] = useState({
    id: localStorage.getItem('userId'),
    firstName: localStorage.getItem('firstName'),
    lastName: localStorage.getItem('lastName'),
    username: localStorage.getItem('username'),
    profileImg: localStorage.getItem('profileImg'),
    role: localStorage.getItem('role'),
    status: localStorage.getItem('fambamLogin'),
  });
  let [chatLog, setChatLog] = useState([]);
  let [mainView, setMainView] = useState('chat');

  const exit = () => {
    logout();
    setProfile(profile = {
      firstName: localStorage.getItem('firstName'),
      lastName: localStorage.getItem('lastName'),
      username: localStorage.getItem('username'),
      role: localStorage.getItem('role'),
      profileImg: localStorage.getItem('profileImg'),
      status: localStorage.getItem('fambamLogin'),
      myRooms: JSON.parse(localStorage.getItem('myRooms')),
    })
    setChatLog(chatLog = []);
    setLoginStatus(loginStatus = false);
  }

  useEffect(() => {
     // Joining the current chat room
     socketState.emit('joinRoom', createMessagePack('', profile, roomInfo));
  }, [])

  return (
    <AppContext.Provider value={{socketState, roomInfo, setRoomInfo, mainView, setMainView, profile, setProfile, loginStatus, setLoginStatus, chatLog, setChatLog}}>
      {!loginStatus ?
      <Login /> :
      <div className="App">
          <Navbar />
          <Profile />
          <Todo />
          {mainView === 'chat' || mainView === 'video' ? <UtilityBelt /> : null}
          {mainView === 'chat' || mainView === 'video' ? <MainFeed /> : null}
        </div>
      }

    </AppContext.Provider>
  );
}

export default App;
