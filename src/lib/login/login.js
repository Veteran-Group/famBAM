export const saveStatus = (profile) => {
  localStorage.setItem('firstName', profile.firstName);
  localStorage.setItem('lastName', profile.lastName);
  localStorage.setItem('username', profile.username);
  localStorage.setItem('role', profile.role);
  localStorage.setItem('fambamLogin', profile.status);
  return profile;
};

export const logout = () => {
  localStorage.setItem('firstName', null);
  localStorage.setItem('lastName', null);
  localStorage.setItem('username', null);
  localStorage.setItem('role', null);
  localStorage.setItem('fambamLogin', 'false');
}

export const checkStatus = (login, failMessage, callBack) => {
  if (!login.status) {
    alert(`${failMessage}`);
  } else {
    callBack(login.status);
  }
  return login.status;
}
