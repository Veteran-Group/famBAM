import React, { useState, useContext, useEffect } from 'react';
import { Text, Accordion, Button } from '@mantine/core'
import './styles/utilityBelt.css';
import { AppContext } from '../App';
import { api } from '../config.js';
import axios from 'axios';
import { sendTextTo } from '../lib/UtilityBelt/chatUtility';

const UtilityBelt = () => {

  let {mainView, setMainView, profile} = useContext(AppContext);
  let [disabled, setDisabled] = useState(localStorage.getItem('textButtonStatus'));

useEffect(() => {
  if (localStorage.getItem('textButtonStatus')) {
    document.getElementById('dadText').setAttribute('disabled', '');
    document.getElementById('momText').setAttribute('disabled', '');
  }
}, [disabled])

  if (mainView === 'chat') {
    return (
      <>
        <div className="utility-belt">
          <Accordion>
            <Accordion.Item value="contactas">
              <Accordion.Control>Contacts</Accordion.Control>
              <Accordion.Panel>
                <Button id="dadText" style={{ margin: 10 }} onClick={() => {
                  sendTextTo('dad', profile.firstName);
                  setDisabled(true);
                }}>{!disabled ? 'Text Dad' : 'Wait to Text'}</Button>
                <Button id="momText" style={{ margin: 10 }} onClick={() => {
                  sendTextTo('mom', profile.firstName);
                  setDisabled(true);
                }}>{!disabled ? 'Text Mom' : 'Wait to Text'}</Button>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </div>
    </>
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