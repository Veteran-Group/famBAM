import React from 'react';


export const switchStatus = (loginStatus) => {
  console.log(`Previous Status: ${localStorage.getItem(`fambamLogin`)}`);
  console.log(`New status:  ${loginStatus}`);
  localStorage.setItem('fambamLogin', `${loginStatus}`);
  return loginStatus;
};