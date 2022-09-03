import React, { useContext } from 'react';
import { AppContext } from '../App';
import { switchStatus } from '../lib/login.js';

const Login = () => {

  let {loginStatus, setLoginStatus} = useContext(AppContext);

  return (
    <>
      <button onClick={() => {setLoginStatus(loginStatus = switchStatus(loginStatus))}}>Switch Status</button>
      <button onClick={() => {alert(localStorage.getItem(`fambamLogin`))}}>Check login</button>
    </>
  )
}

export default Login;