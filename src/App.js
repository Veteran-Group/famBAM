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
import { api } from './config.js';
import { io } from 'socket.io-client';

const socket = io('http://192.168.1.8:3002');

export const AppContext = createContext();

function App() {

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
    role: localStorage.getItem('role'),
    status: localStorage.getItem('fambamLogin'),
    myRooms: JSON.parse(localStorage.getItem('myRooms')),
  });
  let [chatLog, setChatLog] = useState([]);
  let [mainView, setMainView] = useState('chat');
  let [roomList, setRoomList] = useState([]);

  const exit = () => {
    logout();
    setProfile(profile = {
      firstName: localStorage.getItem('firstName'),
      lastName: localStorage.getItem('lastName'),
      username: localStorage.getItem('username'),
      role: localStorage.getItem('role'),
      status: localStorage.getItem('fambamLogin'),
      myRooms: JSON.parse(localStorage.getItem('myRooms')),
    })
    setChatLog(chatLog = []);
    setLoginStatus(loginStatus = false);
  }

  useEffect(() => {
    axios.get(`${api}/allRooms`)
      .then((response) => {
        setRoomList(roomList = response.data)
      })
  }, [])

  useEffect(() => {
    axios.get(`${api}/getChat?cid=${roomInfo.id}`)
      .then((response) => {
        setChatLog(chatLog = response.data);
      })
      .catch((err) => {
        console.log(`Error: ./App -> useEffect - updating chat`)
      })
  }, [roomInfo]);

  return (
    <AppContext.Provider value={{roomList, roomInfo, setRoomInfo, mainView, setMainView, profile, setProfile, loginStatus, setLoginStatus, chatLog, setChatLog}}>
      {!loginStatus ?
      <Login /> :
      <div className="App">
          <Navbar />
          <Profile />
          {/* <Todo /> */}
          <UtilityBelt />
          <MainFeed />
        </div>
      }

    </AppContext.Provider>
  );
}

export default App;
