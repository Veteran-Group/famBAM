import axios from "axios";
import { api } from "../../config.js";
import { io } from 'socket.io-client';
import moment from 'moment';

const socket = io('http://192.168.1.8:3002');

export const createNewRoom = (desiredRoomName, roomPass) => {
  // Eventually want to add validation for room names as to not repeat rooms
  axios.put(`${api}/createNewRoom?roomName=${desiredRoomName}&roomPass=${roomPass}`)
    .then((response) => {
      console.log(response.data)
    })
}

export const createMessagePack = (message, profile, roomInfo) => {
  let newMessage = {
    user_name: profile.username,
    user_message: message,
    time_stamp: moment().format('LT2'),
    date: moment().format('ll')
  };

  let messagePack = {
    newMessage: newMessage,
    roomInfo: roomInfo,
    profile: profile
  }

  return messagePack;
}

export const bubbleKey = () => {
  let key = `${moment().format(`DoYYhh:mm:ss-${getRandomArbitrary(1, 999999999999999)}`)}`;

  return key;
}

export const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
}