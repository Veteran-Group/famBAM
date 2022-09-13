import React, { useState, useEffect, useContext } from 'react';
import { Text, Avatar } from '@mantine/core';
import './styles/profile.css';
import { AppContext } from '../App';

const Profile = () => {

  let [profileImage, setProfileImage] = useState();
  let {profile} = useContext(AppContext);

  useEffect(() => {
    if (profile.username === 'Dad') {
      setProfileImage(profileImage = '../assets/dad_profile_pic/glitch-image-1661879698.png');
      // if (imageNumber === 1) {
      //   setTimeout(() => {
      //     setProfileImage(profileImage = '../assets/dad_profile_pic/glitch-image-1661879739.png');
      //   }, Math.floor(Math.random() * 5000) + 3000);
      //   setTimeout(() => {
      //     setProfileImage(profileImage = '../assets/dad_profile_pic/glitch-image-1661879744.png');
      //   }, Math.floor(Math.random() * 100) + 500);
      //   setTimeout(() => {
      //     setProfileImage(profileImage = '../assets/dad_profile_pic/glitch-image-1661879749.png');
      //   }, Math.floor(Math.random() * 100) + 500);
      // }
    }

  })



  return (
    <div className="profile-box">
      <Avatar src={profileImage} />
      <Text>Profile</Text>
    </div>
  )
}

export default Profile;