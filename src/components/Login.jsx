import React, { useContext } from 'react';
import { AppContext } from '../App';
import { switchStatus } from '../lib/login.js';
import { TextInput, Paper, PasswordInput } from '@mantine/core';
import '../lib/login.css';
import '../App.css';
import logo from '../assets/onering.png';

const Login = () => {

  let {loginStatus, setLoginStatus} = useContext(AppContext);

  return (
    <div className='background'>
      <div className='login'>
        <Paper style={{}} shadow="xl" radius="lg" p="md">
          <div className='App-logo-text'>FamBAM</div>
          <img src={logo} id="logo" className="App-logo" alt="logo" />
          <TextInput
            placeholder="Jellyfist87"
            label="Username: "
            withAsterisk
          />
          <PasswordInput
          placeholder="Password"
          label="Password"
          description="Password must include at least one letter, number and special character"
          withAsterisk
        />
        </Paper>
      </div>
      <button onClick={() => {alert(localStorage.getItem('fambamLogin'))}}>Check login status</button>
      <button onClick={() => {setLoginStatus(loginStatus = switchStatus(loginStatus))}}>Switch Status</button>
    </div>
  )
}

export default Login;