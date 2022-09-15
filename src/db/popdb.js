const db = require(`./index.js`);
require('dotenv').config;
const Promise = require('bluebird');

db.queryAsync(`INSERT INTO fambamschema.profile (
  f_name,
  l_name,
  username,
  role
  ) VALUES($1, $2, $3, $4)`, ['Robert', 'Campbell', 'Dad', 'parent'])
  .then(() => {
    db.queryAsync(`INSERT INTO fambamschema.profile (
      f_name,
      l_name,
      username,
      role
    ) VALUES($1, $2, $3, $4)`, ['Erica', 'Campbell', 'Mom', 'parent'])
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
    db.queryAsync(`INSERT INTO fambamschema.roomList (
      room_id,
      room_name,
      owner_id,
      room_pass
    ) VALUES ($1, $2, $3, $4)`, ['a001', 'Home', 1, ''])
  })
