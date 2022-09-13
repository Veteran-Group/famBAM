import React, { useContext } from 'react';
import { Text, Accordion, Button } from '@mantine/core'
import './styles/utilityBelt.css';
import { AppContext } from '../App';
import { sendEmail } from '../lib/UtilityBelt/chatUtility';

const UtilityBelt = () => {

  let {mainView, setMainView} = useContext(AppContext)

  if (mainView === 'chat') {
    return (
      <div className="utility-belt">
        <Accordion>
          <Accordion.Item value="contactas">
            <Accordion.Control>Contacts</Accordion.Control>
            <Accordion.Panel><Button onClick={() => {sendEmail()}}>Contact Dad</Button></Accordion.Panel>
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