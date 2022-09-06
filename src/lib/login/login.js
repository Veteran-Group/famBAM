export const saveStatus = (loginStatus) => {
  localStorage.setItem('fambamLogin', `${loginStatus}`);
  return loginStatus;
};

export const checkStatus = (status, failMessage, callBack) => {
  if (!status) {
    alert(`${failMessage}`);
  } else {
    status = callBack(status);
  }
  return status;
}
