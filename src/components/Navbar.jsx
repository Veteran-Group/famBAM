import React, { useState, useContext } from 'react';
import { Burger, Affix, Text } from '@mantine/core';
import './styles/navbar.css';
import { AppContext } from '../App';

const Navbar = () => {

  let {profilePic, setProfilePic} = useContext(AppContext);
  let [opened, setOpened] = useState(false);

  let title = opened ? 'Close navigation' : 'Open navigation';

  return (
    <div className='navbar'>
      <Affix position={{top: 5, left: 5}}>
        <Burger
        opened={opened}
        onClick={() => setOpened((o) => !o)}
        title={title}
        />
      </Affix>
      <Text className="title" weight="bold" align="center">FamBAM</Text>
    </div>
  )
}

export default Navbar;