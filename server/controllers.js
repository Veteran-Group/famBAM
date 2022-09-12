const { getPass, roomLogin } = require('./models');
const db = require('../src/db/index.js');
const express = require('express');
const Promise = require('bluebird');

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
  loadGuestRoom: function(req, res) {
    const {roomName, roomPass} = req.query;
    const query = { text: roomLogin, values: [roomName, roomPass] };
    db.queryAsync(query)
      .then((response) => {
        let id = response[0].rows[0].room_id;
        if (id > 0) {
          db.queryAsync(`SELECT user_name, user_message, time_stamp FROM fambamschema.guestRoom LIMIT 20;`)
            .then((response) => {
              res.status(200).send(response[0].rows)
            })
        }
      })
      .catch((err) => {
        console.log(`Error retrieveing log from database: ${err}`)
      })
  }
}