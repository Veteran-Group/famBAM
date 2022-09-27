import axios from 'axios';
import { api } from '../../config.js';

export const saveStatus = (profile) => {
  localStorage.setItem('userId', profile.id);
  localStorage.setItem('firstName', profile.firstName);
  localStorage.setItem('lastName', profile.lastName);
  localStorage.setItem('username', profile.username);
  localStorage.setItem('profileImg', profile.profileImg);
  localStorage.setItem('role', profile.role);
  localStorage.setItem('fambamLogin', profile.status);
  return profile;
};

export const logout = (id) => {
  localStorage.clear();
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
