import axios from "axios"
import { api } from '../../config.js';
import Promise from 'bluebird';

export const createRoom = (ownerId, roomName, roomPass, callback) => {
  axios.get(`${api}/createNewRoom?desiredRoomName=${roomName}&roomPass=${roomPass}&owner=${ownerId}`)
    .then((response) => {
      callback(response.data)
    })
    .catch((err) => {
      console.log(`Error in ./src/lib/UtilityBelt/chatUtility.js-createRoom: ${err}`);
    })
}

export const setProfileValue = (profile, profileKey, value) => {
  profile[profileKey] = [...profile[profileKey], value];
  return profile;
}

export const loginToChatroom = (name, pass, callback) => {

  axios.get(`${api}/chatLogin?roomName=${name}&roomPass=${pass}`)
    .then((response) => {
      callback(response.data);
    })
    .catch((err) => {
      console.log(`Error in ./src/lib/UtilityBelt/chatUtility.js-loginChatRoom(): ${err}`)
    })
}
