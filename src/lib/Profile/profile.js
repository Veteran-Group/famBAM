export const setUsername = (profile, username) => {
  let newProfile = {};
  let keys = Object.keys(profile);

  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    if (key !== 'username'){
      newProfile[key] = profile[key];
    } else {
      newProfile[key] = username;
    }
  }
  return newProfile;
}

export const setPicURL = (profile, picURL) => {
  let newProfile = {};
  let keys = Object.keys(profile);

  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    console.log(key)
    if (key !== 'profileImg'){
      newProfile[key] = profile[key];
    } else {
      newProfile[key] = picURL;
    }
    console.log(newProfile[key]);
  }
  return newProfile;
}