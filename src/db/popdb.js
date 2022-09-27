const db = require(`./index.js`);
require('dotenv').config;
const Promise = require('bluebird');

db.queryAsync(`INSERT INTO fambamschema.profile (
  f_name,
      l_name,
      username,
      profile_img,
      role,
      logged_in
  ) VALUES($1, $2, $3, $4, $5, $6)`, ['Robert', 'Campbell', 'Dad', 'https://i.ibb.co/9T6n0NQ/glitch-image-1661879698.png', 'parent', false])
  .then(() => {
    db.queryAsync(`INSERT INTO fambamschema.profile (
      f_name,
      l_name,
      username,
      profile_img,
      role,
      logged_in
    ) VALUES($1, $2, $3, $4, $5, $6)`, ['Erica', 'Campbell', 'Mom', '', 'parent', false])
  })
  .then(() => {
    db.queryAsync(`INSERT INTO fambamschema.profile (
      f_name,
      l_name,
      username,
      profile_img,
      role,
      logged_in
    ) VALUES ($1, $2, $3, $4, $5, $6)`, ['Robert', 'Campbell', 'Admin1', '', 'Admin', false])
  })
  .then(() => {
    db.queryAsync(`INSERT INTO fambamschema.profile (
      f_name,
      l_name,
      username,
      profile_img,
      role,
      logged_in
    ) VALUES ($1, $2, $3, $4, $5, $6)`, ['Dustin', 'Deitch', 'Admin2', '', 'Admin', false])
  })
  .then(() => {
    db.queryAsync(`INSERT INTO fambamschema.credentiales (
      user_id,
      username,
      pass) VALUES($1, $2, $3)`, [1, 'Dad', `${process.env.dadpass}`])
  })
  .then(() => {
    db.queryAsync(`INSERT INTO fambamschema.credentiales (
      user_id,
      username,
      pass) VALUES($1, $2, $3)`, [2, 'Mom', `${process.env.mompass}`])
  })
  .then(() => {
    db.queryAsync(`INSERT INTO fambamschema.credentiales (
      user_id,
      username,
      pass) VALUES($1, $2, $3)`, [3, 'Admin1', `${process.env.ADMIN1PASS}`]);
  })
  .then(() => {
    db.queryAsync(`INSERT INTO fambamschema.credentiales (
      user_id,
      username,
      pass) VALUES($1, $2, $3)`, [4, 'Admin2', `${process.env.ADMIN2PASS}`])
  })
  .then(() => {
    db.queryAsync(`INSERT INTO fambamschema.roomList (
      room_id,
      room_name,
      owner_id,
      room_pass
    ) VALUES ($1, $2, $3, $4)`, ['a001', 'Home', 1337, ''])
  })
