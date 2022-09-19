const { getPass, roomLogin, addRoomList, changeCurrentRoom } = require('./models');
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
          db.queryAsync(`SELECT user_id, f_name, l_name, username, role FROM fambamschema.profile WHERE user_id=${id}`)
            .then((response) => {
              let profile = response[0].rows[0];
              let user = {
                id: profile.user_id,
                firstName: profile.f_name,
                lastName: profile.l_name,
                username: profile.username,
                role: profile.role,
                status: true
              };
              return user;
            })
            .then((user) => {
              db.queryAsync(`SELECT room_id, room_name FROM fambamschema.roomList WHERE owner_id=${user.id}`)
                .then((response) => {
                  user[`myRooms`] = response[0].rows;
                  res.status(200).send(user);
                })
            })
        } else {
          res.status(400).send(false);
        }
      })
  },
  createNewRoom: function(req, res) {
    const { desiredRoomName, roomPass, owner } = req.query;
    // Generate room id
    let id = serverLib.getRoomSerial(desiredRoomName);
    // update roomList with room_id, room_name, and room_pass
    let newRoomQuery = { text: addRoomList, values: [id, desiredRoomName, roomPass, owner] };
    Promise.all(
      db.queryAsync(newRoomQuery)
      // Create a new table using fambamschema.{room_id}
      .then(db.queryAsync(`CREATE TABLE fambamschema.${id} (
        user_id INTEGER,
        user_name VARCHAR,
        user_message VARCHAR,
        time_stamp VARCHAR,
        date VARCHAR
      )`))
    )
    let answer = { roomName: desiredRoomName, id: id };
    res.status(200).send(answer)
  },
  newMessage: function(req, res) {
    const { uid, cid, un, um, ts, da } = req.query;
    db.queryAsync(`INSERT INTO fambamschema.${cid} (
      user_id,
      user_name,
      user_message,
      time_stamp,
      date
    ) VALUES($1, $2, $3, $4, $5)`, [uid, un, um, ts, da])
    .then(() => {
      res.status(200).send('Message Sent');
    })
  },
  getChat: function(req, res) {
    const { cid } = req.query;
    db.queryAsync(`SELECT * FROM fambamschema.${cid}`)
      .then((response) => {
        res.status(200).send(response[0].rows);
      })
  },
  chatLogin: function(req, res) {
    let { roomName, roomPass } = req.query;
    const query = { text: roomLogin, values: [roomName, roomPass] };
    db.queryAsync(query)
      .then((response) => {
        let answer = { roomName: roomName, id: response[0].rows[0].room_id };
        res.status(200).send(answer)
      })
      .catch((err) => {
        console.log(`Error in controller/chatLogin EP: ${err}`)
      })
  },
  newToDo: function(req, res) {
    const {user, id, task, instructions, taskId} = req.query;
    db.queryAsync(`INSERT INTO fambamschema.${user}_${id} (
      task,
      instructions,
      id
    ) VALUES($1, $2, $3)`, [task, instructions, taskId] )
    .then(() => {
      res.status(200).send('ToDo Added');
    })
  },
  getToDo: function(req, res) {
    const { user, id } = req.query;
    db.queryAsync(`SELECT * FROM fambamschema.${user}_${id}`)
    .then((response) => {
      res.status(200).send(response[0].rows);
    })
  },
  completedToDo: function(req, res) {
    const {user, id, taskId} = req.query;
    db.queryAsync(`UPDATE fambamschema.${user}_${id}
    SET completed=true
    WHERE id=${taskId};`)
  }
}