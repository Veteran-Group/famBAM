import React, { useState, useEffect, useContext } from 'react';
import { Text, Avatar } from '@mantine/core';
import '../styles/profile.css';
import { AppContext } from '../../App';

const Profile = () => {

  let {profile} = useContext(AppContext);
  let [profileImage, setProfileImage] = useState();

  return (
    <div className="profile-box">
      <div className="avatar">
        <Avatar className="avatar-shadow" src={profileImage} size="lg" radius="xl" />
      </div>
    </div>
  )
}

export default Profile;