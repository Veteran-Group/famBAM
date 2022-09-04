import React, { useContext } from 'react';
import { AppContext } from '../App';
import { switchStatus } from '../lib/login.js';
import { TextInput, Paper, PasswordInput } from '@mantine/core';
import '../lib/login.css';
import '../App.css';
import logo from '../assets/onering.png';
import axios from 'axios';
import { api } from '../config.js';


const Login = () => {

  let {loginStatus, setLoginStatus} = useContext(AppContext);

  const login = (user, pass) => {
    axios.get(`${api}/login?username=${user}&pass=${pass}`)
      .then((response) => {
        let login = response.data;
        console.log(login);
        setLoginStatus(loginStatus = switchStatus(login))
      })
      .catch((err) => {alert('Invalid Login')})
  };

  return (
    <div className='background'>
      <div className='login'>
        <Paper style={{}} shadow="xl" radius="lg" p="md">
          <div className='App-logo-text'>FamBAM</div>
          <img src={logo} id="logo" className="App-logo" alt="logo" />
          <TextInput
            id='username'
            placeholder="Jellyfist87"
            label="Username: "
            withAsterisk
          />
          <PasswordInput
          id='pass'
          placeholder="Password"
          label="Password"
          description="Password must include at least one letter, number and special character"
          withAsterisk
        />
        <button onClick={() => {login(document.getElementById('username').value, document.getElementById('pass').value)}}>Login</button>
        </Paper>
      </div>
    </div>
  )
}

export default Login;