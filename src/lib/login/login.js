export const saveStatus = (profile) => {
  localStorage.setItem('userId', profile.id);
  localStorage.setItem('firstName', profile.firstName);
  localStorage.setItem('lastName', profile.lastName);
  localStorage.setItem('username', profile.username);
  localStorage.setItem('role', profile.role);
  localStorage.setItem('fambamLogin', profile.status);
  return profile;
};

export const logout = () => {
  localStorage.setItem('userId', null);
  localStorage.setItem('firstName', null);
  localStorage.setItem('lastName', null);
  localStorage.setItem('username', null);
  localStorage.setItem('role', null);
  localStorage.setItem('fambamLogin', 'false');
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
