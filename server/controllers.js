const { getPass, roomLogin, addRoomList } = require('./models');
const db = require('../src/db/index.js');
const express = require('express');
const Promise = require('bluebird');
const serverLib = require('./lib/newRoom.js');

module.exports = {
  login: function(req, res) {
    const { username, pass } = req.query;
    const query = { text: getPass, values: [username, pass] };

    db.queryAsync(query)
      .then((response) => {
        if (response[0].rows.length === 1) {
          let id = response[0].rows[0].user_id;
          db.queryAsync(`SELECT f_name, l_name, username, role FROM fambamschema.profile WHERE user_id=${id}`)
            .then((response) => {
              let profile = response[0].rows[0];
              let user = {
                firstName: profile.f_name,
                lastName: profile.l_name,
                username: profile.username,
                role: profile.role,
                status: true
              };
              return user;
            })
            .then((user) => {
              res.status(200).send(user);
            })
        } else {
          res.status(400).send(false);
        }
      })
  },
  createNewRoom: function(req, res) {
    const { desiredRoomName, roomPass } = req.query;
    // Generate room id
    let id = serverLib.getRoomSerial(desiredRoomName);
    // update roomList with room_id, room_name, and room_pass
    let newRoomQuery = { text: addRoomList, values: [id, desiredRoomName, roomPass] };
    Promise.all(db.queryAsync(newRoomQuery))
    // Create a new table using fambamschema.{room_id}
    Promise.all(db.queryAsync(`CREATE TABLE fambamschema.${id} (
      user_id INTEGER,
      user_name VARCHAR,
      user_message VARCHAR,
      time_stamp VARCHAR,
      date VARCHAR
    )`))
    res.status(200).send(`New room '${desiredRoomName}' has been created!`)
  },
  sendTextDad: function(req, res) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    client.messages
      .create({
        body: 'IT IS ALIVE',
        from: '+19162257301',
        to: '+19162257301'
      })
    },
}