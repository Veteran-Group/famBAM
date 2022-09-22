import React, { useState, useContext, useEffect } from 'react';
import { PasswordInput, TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { createRoom, setProfileValue } from '../lib/UtilityBelt/chatUtility.js';
import { AppContext } from '../App.js';

const CreateRoomForm = () => {

  let { roomInfo, setRoomInfo, profile, setProfile, chatLog, setChatLog } = useContext(AppContext);
  let [disabled, setDisabled] = useState(false);

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

  useEffect(() => {
    if (profile.myRooms !== null) {
      if (profile.myRooms.length > 1) {
        document.getElementById('new-room-submit').setAttribute('disabled', '');
        setDisabled(disabled = true);
      } else {
        console.log(`Error:: src/components/CreateRoomForm.jsx: useEffect room length check`)
      }
    } else {
      console.log('ERROR: \'MyRooms\' is null');
    }
  }, [profile])

  return (
    <form onSubmit={NewRoomForm.onSubmit((values) => { createRoom(profile.id, values.roomName, values.roomPass, (response) => {
      setRoomInfo(roomInfo = {
        roomName: response.roomName,
        id: response.id
      })
      setProfile(profile = setProfileValue(profile = {
        id: profile.id,
        firstName: profile.firstName,
        lastName: profile.lastName,
        username: profile.username,
        role: profile.role,
        status: profile.status,
        myRooms: [...profile.myRooms, { room_id: roomInfo.room_id, room_name: roomInfo.room_name }]
      }));
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
      <Button id="new-room-submit" type="submit" style={{ marginTop: 10 }}>{!disabled ? 'Submit' : 'Delete a room'}</Button>
    </form>
  )
}

export default CreateRoomForm;