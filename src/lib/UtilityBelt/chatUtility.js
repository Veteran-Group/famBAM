import axios from "axios"
import { api } from '../../config.js';

export const createRoom = (ownerId, roomName, roomPass, callback) => {
  axios.post(`${api}/createNewRoom?desiredRoomName=${roomName}&roomPass=${roomPass}&owner=${ownerId}`)
    .then((response) => {
      callback(response.data)
    })
    .catch((err) => {
      console.log(`Error in ./src/lib/UtilityBelt/chatUtility.js-createRoom: ${err}`);
    })
}

export const setProfileValue = (profile, profileKey, value) => {
  console.log(`Profile before: ${JSON.stringify(profile)}`);
  profile[profileKey] = [...profile[profileKey], value];
  return profile;
}
