const db = require(`./index.js`);
require('dotenv').config();
const Promise = require('bluebird');

const env = process.env;

db.queryAsync(`INSERT INTO fambamschema.profile (
  f_name,
      l_name,
      username,
      profile_img,
      role,
      logged_in
  ) VALUES($1, $2, $3, $4, $5, $6)`, [env.DADFNAME, env.DADLNAME, 'Dad', env.DADPROFILEIMG, 'parent', false])
  .then(() => {
    db.queryAsync(`INSERT INTO fambamschema.profile (
      f_name,
      l_name,
      username,
      profile_img,
      role,
      logged_in
    ) VALUES($1, $2, $3, $4, $5, $6)`, [env.MOMFNAME, env.MOMLNAME, 'Mom', '', 'parent', false])
  })
  .then(() => {
    db.queryAsync(`INSERT INTO fambamschema.credentiales (
      user_id,
      username,
      pass) VALUES($1, $2, $3)`, [1, 'Dad', `${env.DADPASS}`])
  })
  .then(() => {
    db.queryAsync(`INSERT INTO fambamschema.credentiales (
      user_id,
      username,
      pass) VALUES($1, $2, $3)`, [2, 'Mom', `${env.MOMPASS}`])
  })
  .then(() => {
    db.queryAsync(`INSERT INTO fambamschema.roomList (
      room_id,
      room_name,
      owner_id,
      room_pass
    ) VALUES ($1, $2, $3, $4)`, ['a001', 'Home', 1337, ''])
  })
