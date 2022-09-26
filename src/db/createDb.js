const db = require(`./index.js`);

db.queryAsync(`DROP SCHEMA IF EXISTS fambamschema CASCADE`)
  .then(() => db.queryAsync(`CREATE SCHEMA fambamschema`))
  .catch((err) => {console.log(err)})
  .then(() => {
    db.queryAsync(`CREATE TABLE fambamschema.profile (
      user_id SERIAL PRIMARY KEY,
      f_name VARCHAR,
      l_name VARCHAR,
      username VARCHAR,
      profile_img VARCHAR,
      last_room VARCHAR,
      role VARCHAR,
      logged_in BOOLEAN
    )`)
  })
  .then(() => {
    db.queryAsync(`CREATE TABLE fambamschema.credentiales (
      user_id INTEGER,
      username VARCHAR,
      pass VARCHAR
    )`)
  })
  .then(() => {
    db.queryAsync(`CREATE TABLE fambamschema.roomList (
      room_id VARCHAR,
      room_name VARCHAR,
      room_pass VARCHAR,
      owner_id INTEGER
    )`)
  })
  .then(() => {
    db.queryAsync(`CREATE TABLE fambamschema.a001 (
      user_id INTEGER,
      user_name VARCHAR,
      user_message VARCHAR,
      time_stamp VARCHAR,
      date VARCHAR
    )`)
  })
  .then(() => {
    //can use SERIAL PRIMARY KEY instead for ID
    db.queryAsync(`CREATE TABLE fambamschema.Dad_1 (
      task VARCHAR UNIQUE,
      instructions VARCHAR,
      id VARCHAR,
      completed BOOLEAN DEFAULT FALSE
    )`)
  })
  .then(() => {
    //can use SERIAL PRIMARY KEY instead for ID
    db.queryAsync(`CREATE TABLE fambamschema.Mom_2 (
      task VARCHAR UNIQUE,
      instructions VARCHAR,
      id VARCHAR,
      completed BOOLEAN DEFAULT FALSE
    )`)
  })