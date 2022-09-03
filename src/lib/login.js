import React from 'react';


export const switchStatus = (loginStatus) => {
  loginStatus = !loginStatus;
  localStorage.setItem('fambamLogin', `${loginStatus}`);
  return loginStatus;
};