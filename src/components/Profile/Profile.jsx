import React, { useState, useEffect, useContext } from 'react';
import { Text, Avatar, Modal, TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import '../styles/profile.css';
import { AppContext } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons'

const Profile = () => {

  let {profile} = useContext(AppContext);
  const [opened, setOpened] = useState(false);

  let EditProfile = useForm({
    initialValues: {
      username: profile.username,
      picURl: profile.profileImg,
      password: '',
      confirmPassword: ''
    },

    validate: {
      username: (value) => value.length < 2 ? 'Username must be longer than two letters': null,
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
        <Avatar className="avatar avatar-shadow" src={profile.profileImg} size="xl" radius="xl" />
      </div>
    </div>
    <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Change your info!"
      >
        <form onSubmit={EditProfile.onSubmit((values) => {

        })}>
          <TextInput id="un" label="Username:" {...EditProfile.getInputProps('username')} />
          <TextInput id="pic" label="Picure URL:" {...EditProfile.getInputProps('picURL')} />
          <TextInput id="pass" label="New Password:" {...EditProfile.getInputProps('password')} />
          <TextInput id="cpass" label="Confirm Password:" {...EditProfile.getInputProps('confirmPassword')} />
      <Button id="edit-profile-form" type="submit" style={{ marginTop: 10 }}>Submit</Button>
        </form>

      </Modal>
    </>
  )
}

export default Profile;