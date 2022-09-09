const db = require(`./index.js`);
require('dotenv').config;

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
    ) VALUES($1, $2, $3, $4)`, ['Erica', 'Campbell', 'Dad', 'parent'])
  })
  .then(() => {
    db.queryAsync(`INSERT INTO fambamschema.credentiales (
      user_id,
      username,
      pass) VALUES($1, $2, $3)`, [1, 'Dad', `${process.env.dadpass}`])})
  .then(() => {
    db.queryAsync(`INSERT INTO fambamschema.credentiales (
      user_id,
      username,
      pass) VALUES($1, $2, $3)`, [2, 'Erica', `${process.env.mompass}`])})
  .then(() => {
    db.queryAsync(`INSERT INTO fambamschema.roomList (
      room_name,
      room_pass
      ) VALUES ($1, $2)`, [`guestRoom`, ``]
    )
  })
  .then(() => {
    db.queryAsync(`INSERT INTO fambamschema.guestRoom (
      user_id,
      user_name,
      user_message) VALUES ($1, $2, $3)`, [1, 'Dad', 'this is a test']
    )
  })
  .then(() => {
    db.queryAsync(`INSERT INTO fambamschema.guestRoom (
      user_id,
      user_name,
      user_message) VALUES ($1, $2, $3)`, [2, 'Mom', 'this is a test']
    )
  })