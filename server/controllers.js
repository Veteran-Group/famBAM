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
              let user ={
                firstName: response[0].rows[0].f_name,
                lastName: response[0].rows[0].l_name,
                username: response[0].rows[0].username,
                role: response[0].rows[0].role,
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

    // Create a new table using fambamschema.{room_id}
  },
}