import axios from "axios";
import { api } from "../../config.js";

export const getTime = () => {
  let today = new Date();
  let hours = today.getHours();
  let minutes = today.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  };

  let time = `${hours}:${minutes}`

  return time;
}

export const getTodayDate = () => {

  let today = new Date();
  let day = today.getDate();
  let month = today.toLocaleString('default', { month: 'short' })
  let year = today.getFullYear();

  return `${month} ${day}, ${year}`;
}

export const createNewRoom = (desiredRoomName, roomPass) => {
  // Eventually want to add validation for room names as to not repeat rooms
  axios.put(`${api}/createNewRoom?roomName=${desiredRoomName}&roomPass=${roomPass}`)
    .then((response) => {
      console.log(response.data)
    })
}