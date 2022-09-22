import { useState } from 'react';

const useRoomChange = (newRoom) => {
  let [room, setRoom] = useState(newRoom);

  return room;
}

export default useRoomChange;