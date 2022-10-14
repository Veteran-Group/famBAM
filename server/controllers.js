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
          db.queryAsync(`SELECT user_id, f_name, l_name, username, profile_img, role FROM fambamschema.profile WHERE user_id=${id} AND logged_in=false`)
            .then((response) => {
              let profile = response[0].rows[0];
              let user = {
                id: profile.user_id,
                firstName: profile.f_name,
                lastName: profile.l_name,
                username: profile.username,
                role: profile.role,
                profileImg: profile.profile_img,
                status: true
              };
              db.queryAsync(`UPDATE fambamschema.profile SET logged_in=true WHERE user_id=${user.id}`)
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
      .catch((err) => {
        res.status(401).send(false);
      })
  },
  logout: function (req, res) {
    let { uid } = req.query;
    db.queryAsync(`UPDATE fambamschema.profile SET logged_in=false WHERE user_id=${uid}`)
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
  editProfile: function (req, res) {
    let { username, picURL, pass } = req.query;
    let id = parseInt(req.body.profile.id);
    if (pass.length === 0) {
    } else {
      db.queryAsync(`UPDATE fambamschema.credentiales SET pass='${pass}' WHERE user_id=${id};`)
      .catch((err) => {
        console.log(`Error set pass: ${err}`)
      })
    }

    if (picURL.length === 0 || picURL === 'undefined') {
    } else {
      db.queryAsync(`UPDATE fambamschema.profile SET profile_img='${picURL}' WHERE user_id = ${id};`)
      .catch((err) => {
        console.log(`Error set picURL: ${err}`)
      })
    }


    if (username.length === 0) {
    } else {
      db.queryAsync(`UPDATE fambamschema.profile SET username='${username}' WHERE user_id = ${id};`)
      .then(() => {
        db.queryAsync(`UPDATE fambamschema.credentiales SET username='${username}' WHERE user_id=${id}`)
      })
        .catch((err) => {
          console.log(`Error set username: ${err}`)
        })
    }

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