import React, { useState, useEffect, useContext } from 'react';
import { Text, Avatar, Modal, TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import '../styles/profile.css';
import { AppContext } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { api } from '../../config';
import { setUsername, setPicURL } from '../../lib/Profile/profile';
import { saveStatus } from '../../lib/login/login';

const Profile = () => {

  let {setMainView, profile, setProfile} = useContext(AppContext);
  let [parent, setParent] = useState(false);
  const [opened, setOpened] = useState(false);

  let EditProfile = useForm({
    initialValues: {
      username: '',
      picUrl: '',
      password: '',
      confirmPassword: ''
    },

    validate: {
      confirmPassword: (value, values) => value !== values.password ? 'Passwords Do Not Match!' : null,
    }
  })

  return (
    <>
    <div className="profile-box">
      <FontAwesomeIcon onClick={() => setOpened((o) => !o)} icon={faPencil} className="edit" />
      <Text className="username">{profile.username}</Text>
      <Text className="real-name">{profile.firstName} {profile.lastName}</Text>
      <div className="avatar">
        <Avatar className="avatar avatar-shadow" src={profile.profileImg} size="lg" radius="xl" />
      </div>
      {profile.role === "parent" ? <Button onClick={() => {
        if (!parent){
          setMainView('parent')
          setParent(true)
        } else if (parent) {
          setMainView('chat');
          setParent(false);
        }
      }} id="parent-portal" className="pa-portal">{!parent ? 'Parent Portal' : 'Chat Portal'}</Button> : null}
    </div>
    <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Change your info!"
      >
        <form onSubmit={EditProfile.onSubmit((values) => {
          axios.put(`${api}/editProfile?username=${values.username}&picURL=${values.picURL}&pass=${values.password}`, {
            profile: profile
          })
          if (values.username !== '') {
            console.log('Setting username...')
            setProfile(profile = saveStatus(setUsername(profile, values.username)));
          }

          if (values.picUrl !== '') {
            console.log('Setting picURL...');
            setProfile(profile = saveStatus(setPicURL(profile, values.picUrl)));
          }

          EditProfile.setValues({
            username: '',
            picUrl: '',
            password: '',
            confirmPassword: ''
          })

          setOpened(false);
        })}>
          <TextInput id="un" label="Username:" {...EditProfile.getInputProps('username')} />
          <TextInput id="pic" label="Picure URL:" {...EditProfile.getInputProps('picUrl')} />
          <TextInput id="pass" label="New Password:" {...EditProfile.getInputProps('password')} />
          <TextInput id="cpass" label="Confirm Password:" {...EditProfile.getInputProps('confirmPassword')} />
      <Button id="edit-profile-form" type="submit" style={{ marginTop: 10 }}>Submit</Button>
        </form>
      </Modal>
    </>
  )
}

export default Profile;