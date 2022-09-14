import React from 'react';
import { PasswordInput, TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';

const CreateRoomForm = () => {

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
    <form onSubmit={NewRoomForm.onSubmit((values) => { console.log(values) })}>
      <TextInput label="Room Name" {...NewRoomForm.getInputProps('roomName')} withAsterisk />
      <PasswordInput label="Password" placeholder="Can be left blank" {...NewRoomForm.getInputProps('roomPass')} />
      <PasswordInput label="Confirm Password" {...NewRoomForm.getInputProps('confirmPass')} />
      <Button type="submit" style={{ marginTop: 10 }}>Submit</Button>
    </form>
  )
}

export default CreateRoomForm;