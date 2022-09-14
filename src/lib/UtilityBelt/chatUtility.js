import axios from "axios"
import { api } from '../../config.js';

export const createRoom = (roomName, roomPass) => {
  axios.post(`${api}/createNewRoom?desiredRoomName=${roomName}&roomPass=${roomPass}`)
    .then((response) => {
      console.log(`ID: ${response.data}`)
    })
    .catch((err) => {
      console.log(`Error in ./src/lib/UtilityBelt/chatUtility.js-createRoom: ${err}`);
    })
}
