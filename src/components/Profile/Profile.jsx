import React, { useState, useEffect, useContext } from 'react';
import { Text, Avatar } from '@mantine/core';
import '../styles/profile.css';
import { AppContext } from '../../App';

const Profile = () => {

  let {profile} = useContext(AppContext);
  let [profileImage, setProfileImage] = useState();

  return (
    <div className="profile-box">
      <Avatar className="avatar" src={profileImage} size="lg" radius="xl" />
    </div>
  )
}

export default Profile;