const { getPass, roomLogin, addRoomList, changeCurrentRoom } = require('./models');
const db = require('../src/db/index.js');
const express = require('express');
const Promise = require('bluebird');
const serverLib = require('./lib/newRoom.js');
const env = process.env;

module.exports = {
  login: function(req, res) {
    const { username, pass } = req.query;
    const query = { text: getPass, values: [username, pass] };

    db.queryAsync(query)
      .then((response) => {
        if (response[0].rows.length === 1) {
          let id = response[0].rows[0].user_id;
          db.queryAsync(`SELECT user_id, f_name, l_name, username, profile_img, last_room, role FROM fambamschema.profile WHERE user_id=${id} AND logged_in=false`)
            .then((response) => {
              let profile = response[0].rows[0];
              let user = {
                id: profile.user_id,
                firstName: profile.f_name,
                lastName: profile.l_name,
                username: profile.username,
                role: profile.role,
                profileImg: profile.profile_img,
                lastRoom: profile.last_room,
                status: true
              };
              db.queryAsync(`UPDATE fambamschema.profile SET logged_in=true WHERE user_id=${user.id}`)
              return user;
            })
            .then((user) => {
              db.queryAsync(`SELECT room_id, room_name FROM fambamschema.roomList WHERE owner_id=${user.id}`)
                .then((response) => {
                  user[`myRooms`] = response[0].rows;
                  console.log(user)
                  res.status(200).send(user);
                })
            })
        } else {
          res.status(400).send(false);
        }
      })
      .catch((err) => {
        res.status(401).sent(false);
      })
  },
  logout: function (req, res) {
    let { uid } = req.query;
    db.queryAsync(`UPDATE fambamschema.profile SET logged_in=false WHERE user_id=${uid}`)
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
    db.queryAsync(`SELECT * FROM fambamschema.${cid} LIMIT 10`)
      .then((response) => {
        res.status(200).send(response[0].rows);
      })
  },
  chatLogin: function(req, res) {
    let { roomName, roomPass } = req.query;
    const query = { text: roomLogin, values: [roomName, roomPass] };
    db.queryAsync(query)
      .then((response) => {
        if (response[0].rows.length === 0) {
          console.log(response[0].rows)
          res.status(400).send(false);
        } else {
          let answer = { roomName: roomName, id: response[0].rows[0].room_id };
          res.status(200).send(answer)
        }
      })
      .catch((err) => {
        console.log(`Error in controller/chatLogin EP: ${err}`)
      })
  },
  allRooms: function(req, res) {
    db.queryAsync(`SELECT room_name FROM fambamschema.roomList`)
      .then((response) => {
        let roomNameList = [];
        response[0].rows.forEach((roomNameObj) => {
          roomNameList.push(roomNameObj.room_name)
        })
        res.status(200).send(roomNameList);
      })
      .catch((err) => {
        console.log(`ERROR: server/controllers -> allRooms: ${err}`)
      })
  },
  sendDadText: function(req, res) {
    const { username, number } = req.query;
    const accountSid = env.TWILIO_ACCOUNT_SID;
    const authToken = env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    client.messages
          .create({
            to: number,
            from: '+18146793267',
            body: `${username} needs you in famBAM chat.`
          })
          .catch((err) => {
            console.log(err)
          })
          .then(message => console.log(message.sid))
          .done();
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