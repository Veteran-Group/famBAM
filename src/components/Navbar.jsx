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
          setLoginStatus(loginStatus = logout(profile.id));

        }}>Logout</button>
      </Drawer>
    </div>
  )
}

export default Navbar;