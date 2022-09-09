import React, { useContext } from 'react';
import { AppContext } from '../App';
import { saveStatus, checkStatus } from '../lib/login/login.js';
import { TextInput, Paper, PasswordInput, Text, Button } from '@mantine/core';
import './styles/login.css';
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
        console.log(`Status: ${response.data}`);
        checkStatus(login, `Invalid Login`,(status) => {
          setLoginStatus(loginStatus = status);
          return loginStatus;
        });
      })
      .catch((err) => {console.log(`Error in reception: ${err}`)})
  };

  return (
    <div className="background">
      <div className="login">
        <Paper style={{}} shadow="xl" radius="lg" p="md">
          <Text align="center" weight="bold" size={'xl'} className="App-logo-text">FamBAM</Text>
          <img src={logo} id="logo" className="App-logo" alt="logo" />
          <TextInput
            id="username"
            placeholder="Jellyfist87"
            label="Username: "
            withAsterisk
          />
          <PasswordInput
          id="pass"
          placeholder="Password"
          label="Password"
          description="Password must include at least one letter, number and special character"
          withAsterisk
        />
        <Button className="button" onClick={() => {login(document.getElementById('username').value, document.getElementById('pass').value)}} color="gray" radius="md" size="md">
          Login
        </Button>
        </Paper>
      </div>
      <button onClick={() => {setLoginStatus(loginStatus = true)}}>Test Login</button>
    </div>
  )
}

export default Login;