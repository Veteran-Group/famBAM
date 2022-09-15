import React, { useState, useContext } from 'react';
import { Burger, Affix, Text, Drawer } from '@mantine/core';
import { AppContext } from '../App';
import './styles/navbar.css';
import { logout } from '../lib/login/login.js';
import axios from 'axios';
import { api } from '../config.js';

const Navbar = () => {

  let {chatLog, roomInfo, profilePic, setProfilePic, loginStatus, setLoginStatus, profile} = useContext(AppContext);

  let [opened, setOpened] = useState(false);

  let title = opened ? 'Close navigation' : 'Open navigation';

  return (
    <div className='navbar'>
      <div className="title">FamBAM</div>
      <Burger
      className="burger"
      opened={opened}
      onClick={() => setOpened((o) => !o)}
      title={title}
      />
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Register"
        padding="xl"
        size="xl"
      >
        <button onClick={() => {
          for (let key in profile) {
            profile[key] = null;
          };
          setLoginStatus(loginStatus = logout()); }}>Logout</button>
        <button onClick={() => { console.log(profile) }}>Profile</button>
        <button onClick={() => {
          console.log(`Room Info: ${JSON.stringify(roomInfo)}`);
          axios.get(`${api}/getChat?cid=${roomInfo.id}`)
            .then((response) => {
              console.log(response.data);
            })
        }}>get chat</button>
        <button onClick={() => { console.log(`chatLog: ${JSON.stringify(chatLog)}`) }}>chatLog Var</button>
      </Drawer>
    </div>
  )
}

export default Navbar;