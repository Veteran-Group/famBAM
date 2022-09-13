import React, { useContext } from 'react';
import { Text } from '@mantine/core'
import './styles/utilityBelt.css';
import { AppContext } from '../App';

const UtilityBelt = () => {

  let {mainView, setMainView} = useContext(AppContext)

  if (mainView === 'chat') {
    return (
      <div className="utility-belt">
        <Text>Chat Utility Belt</Text>
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