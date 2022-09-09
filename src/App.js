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
  let [profile, setProfile] = useState();
  let [chatLog, setChatLog] = useState();

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
