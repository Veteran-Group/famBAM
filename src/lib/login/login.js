import axios from 'axios';
import { api } from '../../config.js';

export const saveStatus = (profile) => {
  localStorage.setItem('userId', profile.id);
  localStorage.setItem('firstName', profile.firstName);
  localStorage.setItem('lastName', profile.lastName);
  localStorage.setItem('username', profile.username);
  localStorage.setItem('role', profile.role);
  localStorage.setItem('fambamLogin', profile.status);
  localStorage.setItem('myRooms', profile.myRooms);
  return profile;
};

export const logout = (id) => {
  console.log(`ID: ${id}`);
  localStorage.setItem('userId', null);
  localStorage.setItem('firstName', null);
  localStorage.setItem('lastName', null);
  localStorage.setItem('username', null);
  localStorage.setItem('role', null);
  localStorage.setItem('fambamLogin', 'false');
  localStorage.setItem('myRooms', '[]');
  axios.put(`${api}/logout?uid=${id}`);
  return false;
}

export const checkStatus = (login, failMessage, callBack) => {
  if (!login.status) {
    alert(`${failMessage}`);
  } else {
    callBack(login.status);
  }
  return login.status;
}
