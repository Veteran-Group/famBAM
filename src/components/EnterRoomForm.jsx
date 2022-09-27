import React, { useContext } from 'react';
import { PasswordInput, TextInput, Button, Autocomplete } from '@mantine/core';
import { useForm } from '@mantine/form';
import { loginToChatroom } from '../lib/UtilityBelt/chatUtility.js';
import { AppContext } from '../App.js';
import { RoomRecordingContext } from 'twilio/lib/rest/video/v1/room/recording.js';
import { saveStatus } from '../lib/login/login.js';

const EnterRoomForm = () => {

  let { roomList, roomInfo, setRoomInfo, profile, setProfile, chatLog, setChatLog } = useContext(AppContext);

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
        let newProfile = {
          id: profile.id,
          firstName: profile.firstName,
          lastName: profile.lastName,
          username: profile.username,
          profileImg: profile.profileImg,
          lastRoom: room.roomName,
          role: profile.role,
          status: profile.status,
          myRooms: [...profile.myRooms, { room_id: room.id, room_name: room.roomName }]
        }
        saveStatus(newProfile);
        setProfile(profile = newProfile);
        LoginRoomForm.setValues({
          roomName: '',
          roomPass: ''
        })
      });
    })}>
      <Autocomplete data={roomList} id="un" label="Room Name" {...LoginRoomForm.getInputProps('roomName')} withAsterisk />
      <PasswordInput id="pa" label="Password" {...LoginRoomForm.getInputProps('roomPass')} />
      <Button type="submit" style={{ marginTop: 10 }} >Submit</Button>
    </form>
  )
}

export default EnterRoomForm;