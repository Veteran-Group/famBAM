import React, { useContext } from 'react';
import { PasswordInput, TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { loginToChatroom } from '../lib/UtilityBelt/chatUtility.js';
import { AppContext } from '../App.js';
import { RoomRecordingContext } from 'twilio/lib/rest/video/v1/room/recording.js';

const EnterRoomForm = () => {

  let { roomInfo, setRoomInfo, profile, setProfile, chatLog, setChatLog } = useContext(AppContext);

  let LoginRoomForm = useForm({
    initialValues: {
      roomName: '',
      roomPass: ''
    },

    validate: {
      roomName: (value) => value.length < 2 ? 'Room name must be longer than two characters': null,
    },
  });

  return (
    <form onSubmit={LoginRoomForm.onSubmit((values) => {
      loginToChatroom(values.roomName, values.roomPass, (room) => {
        setRoomInfo(roomInfo = {
          roomName: room.roomName,
          id: room.id
        });
        LoginRoomForm.setValues({
          roomName: '',
          roomPass: ''
        })
      });
    })}>
      <TextInput id="un" label="Room Name" {...LoginRoomForm.getInputProps('roomName')} withAsterisk />
      <PasswordInput id="pa" label="Password" {...LoginRoomForm.getInputProps('roomPass')} />
      <Button type="submit" style={{ marginTop: 10 }} >Submit</Button>
    </form>
  )
}

export default EnterRoomForm;