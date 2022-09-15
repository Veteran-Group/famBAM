import React, { useContext } from 'react';
import { PasswordInput, TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { createRoom, setProfileValue } from '../lib/UtilityBelt/chatUtility.js';
import { AppContext } from '../App.js';

const CreateRoomForm = () => {

  let { roomInfo, setRoomInfo, profile, setProfile, chatLog, setChatLog } = useContext(AppContext);

  let NewRoomForm = useForm({
    initialValues: {
      roomName: '',
      roomPass: '',
      confirmPass: ''
    },

    validate: {
      roomName: (value) => value.length < 2 ? 'Room name must be longer than two characters': null,
      confirmPass: (value, values) => value !== values.roomPass ? 'Passwords do not match' : null,
    },
  });

  return (
    <form onSubmit={NewRoomForm.onSubmit((values) => { createRoom(profile.id, values.roomName, values.roomPass, (response) => {
      let elementIds = ['un', 'pa', 'cp'];
      setRoomInfo(roomInfo = {
        roomName: response.roomName,
        id: response.id
      })
      setProfile(profile = setProfileValue(profile, 'myRooms', response));
      setChatLog(chatLog = []);
      NewRoomForm.setValues({
        roomName: '',
        roomPass: '',
        confirmPass: ''
      })
    })})}>
      <TextInput id="un" label="Room Name" {...NewRoomForm.getInputProps('roomName')} withAsterisk />
      <PasswordInput id="pa" label="Password" placeholder="Can be left blank" {...NewRoomForm.getInputProps('roomPass')} />
      <PasswordInput id="cp" label="Confirm Password" {...NewRoomForm.getInputProps('confirmPass')} />
      <Button type="submit" style={{ marginTop: 10 }} >Submit</Button>
    </form>
  )
}

export default CreateRoomForm;