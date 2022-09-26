import React, { useContext, useEffect } from 'react';
import { AppContext } from '../App';
import { loginToChatroom } from '../lib/UtilityBelt/chatUtility.js';
import './styles/myRooms.css';

const MyRooms = () => {

  let { profile, roomInfo, setRoomInfo } = useContext(AppContext);

  useEffect(() => {

  })

  if (!profile.myRooms || profile.myRooms.length === 0) {
    return (<div>No Rooms</div>)
  } else {
    return (
      <>
        {profile.myRooms.map((room) => {
          return (
            <div onClick={() => {
              setRoomInfo(roomInfo = {
                roomName: room.room_name,
                id: room.room_id
            })}} className="room-tab" key={room.room_id}>
              <div className="room-name">{room.room_name}</div>
            </div>
          )}
        )}
      </>
    )
  }

}

export default MyRooms;