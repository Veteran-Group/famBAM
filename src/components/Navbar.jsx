import React, { useState, useContext } from 'react';
import { Burger, Affix, Text, Drawer } from '@mantine/core';
import { AppContext } from '../App';
import './styles/navbar.css';

const Navbar = () => {

  let {chatLog, profilePic, setProfilePic, loginStatus, setLoginStatus} = useContext(AppContext);
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
        <button onClick={() => { setLoginStatus(loginStatus = false) }}>Logout</button>
        <button onClick={() => { console.log(chatLog)}}>Chat Log</button>
        <button onClick={() => { console.log(new Date().getTime()) }}>Timestamp</button>
      </Drawer>
    </div>
  )
}

export default Navbar;