import React, { useState, useEffect, useContext } from 'react';
import { Text, Avatar } from '@mantine/core';
import './styles/profile.css';
import { AppContext } from '../App';

const Profile = () => {

  let [profileImage, setProfileImage] = useState();
  let {profile} = useContext(AppContext);

  return (
    <div className="profile-box">
      <Avatar src={profileImage} />
      <Text>Profile</Text>
    </div>
  )
}

export default Profile;