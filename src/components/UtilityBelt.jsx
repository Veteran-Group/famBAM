import React, { useContext } from 'react';
import { Text, Accordion, Button, TextInput } from '@mantine/core'
import './styles/utilityBelt.css';
import { AppContext } from '../App';
import { sendEmail } from '../lib/UtilityBelt/chatUtility';
import { useForm } from '@mantine/form';
import { newRoomForm } from '../lib/UtilityBelt/chatUtility.js';
import CreateRoomForm from './CreateRoomForm.jsx';
import EnterRoomForm from './EnterRoomForm.jsx';
import MyRooms from './MyRooms.jsx';

const UtilityBelt = () => {

  let {mainView, setMainView} = useContext(AppContext)

  if (mainView === 'chat') {
    return (
      <div className="utility-belt">
        <Accordion>
        <Accordion.Item value="my-rooms">
            <Accordion.Control>My Rooms</Accordion.Control>
            <Accordion.Panel>
              <MyRooms />
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="contactas">
            <Accordion.Control>Contacts</Accordion.Control>
            <Accordion.Panel>
              <Text>Contact Buttons Will Go Here</Text>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="enter-room">
            <Accordion.Control>Enter Room</Accordion.Control>
            <Accordion.Panel>
              <EnterRoomForm />
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="create-room">
            <Accordion.Control>Create Room</Accordion.Control>
            <Accordion.Panel>
              <CreateRoomForm />
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </div>
    )
  } else if (mainView === 'video') {
    return (
      <div className="utility-belt">
        <Text>Video Utility Belt</Text>
      </div>
    )
  }
}

export default UtilityBelt;