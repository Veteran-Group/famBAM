import React, { useState, createContext, useEffect } from 'react';
import logo from './assets/onering.png';
import './App.css';
import Login from './components/Login.jsx';
import { switchStatus } from './lib/login.js';

export const AppContext = createContext();

function App() {

  let [loginStatus, setLoginStatus] = useState(false);

  return (
    <AppContext.Provider value={{loginStatus, setLoginStatus}}>
      {!loginStatus ?
      <Login /> :
      <div className="App">
          <div className='App-logo-text'>FamBAM</div>
          <img src={logo} id="logo" className="App-logo" alt="logo" />
          <p>
            <button onClick={() => {setLoginStatus(loginStatus = switchStatus(false))}}>Switch Status</button>
            <button onClick={() => {alert(localStorage.getItem(`fambamLogin`))}}>Check login</button>
          </p>
      </div>}
    </AppContext.Provider>
  );
}

export default App;
