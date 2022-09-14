import React, { useState, createContext, useEffect } from 'react';
import logo from './assets/onering.png';
import './App.css';
import Login from './components/Login.jsx';
import { saveStatus, logout } from './lib/login/login.js';
import Navbar from './components/Navbar';
import MainFeed from './components/MainFeed.jsx';
import Profile from './components/Profile.jsx';
import Todo from './components/Todo.jsx';
import axios from 'axios';
import UtilityBelt from './components/UtilityBelt.jsx';

export const AppContext = createContext();

function App() {

  let [loginStatus, setLoginStatus] = useState(localStorage.getItem('fambamLogin'));
  let [profile, setProfile] = useState({
    firstName: localStorage.getItem('firstName'),
    lastName: localStorage.getItem('lastName'),
    username: localStorage.getItem('username'),
    role: localStorage.getItem('role'),
    status: localStorage.getItem('fambamLogin')
  });
  let [chatName, setChatName] = useState('');
  let [chatLog, setChatLog] = useState([]);
  let [mainView, setMainView] = useState('chat');

  const exit = () => {
    logout();
    setProfile(profile = {
      firstName: localStorage.getItem('firstName'),
      lastName: localStorage.getItem('lastName'),
      username: localStorage.getItem('username'),
      role: localStorage.getItem('role'),
      status: localStorage.getItem('fambamLogin')
    })
    setLoginStatus(loginStatus = false);
  }

  return (
    <AppContext.Provider value={{chatName, setChatName, mainView, setMainView, profile, setProfile, loginStatus, setLoginStatus, chatLog, setChatLog}}>
      {!loginStatus ?
      <Login /> :
      <div className="App">
          <Navbar />
          <Profile />
          <Todo />
          <UtilityBelt />
          <MainFeed />
        </div>
      }

    </AppContext.Provider>
  );
}

export default App;
