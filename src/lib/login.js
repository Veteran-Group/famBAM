import React from 'react';


export const switchStatus = (loginStatus) => {
  console.log(`Current Status: ${loginStatus}\nOpposite: ${!loginStatus}`)
  loginStatus = !loginStatus;
  console.log(`New status:  ${loginStatus}`);
  localStorage.setItem('fambamLogin', `${loginStatus}`);
  return loginStatus;
};