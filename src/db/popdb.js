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
      pass) VALUES($1, $2, $3)`, [1, 'Dad', `${process.env.dadpass}`])})
  .then(() => {
    db.queryAsync(`INSERT INTO fambamschema.credentiales (
      user_id,
      username,
      pass) VALUES($1, $2, $3)`, [2, 'Erica', `${process.env.mompass}`])})
  .then(() => {
    db.queryAsync(`INSERT INTO fambamschema.roomList (
      room_id
      room_name,
      room_pass
      ) VALUES ($1, $2)`, [``, `Home`, ``]
    )
  })


  // This will generate 30 chat messages from 'Mom'and 'Dad' into a table of your choosing
  // .then(() => {
  //   let messageNumber = 1;
  //   let message = `I need more than 20 messages this is message`;
  //   let hour = 1;
  //   let minutes = 1;
  //   let poster = ['Dad', 'Mom'];
  //   let posterIndex = 0;
  //   let chatLog = [];
  //   let today = new Date();
  //   let day = today.getDate();
  //   let month = today.toLocaleString('default', { month: 'short' })
  //   let year = today.getFullYear();
  //   let date = `${month} ${day}, ${year}`;

  //   while (messageNumber <= 30) {
  //     let time;
  //     let posterId;

  //     if (minutes >= 60) {
  //       hour +=1;
  //       minutes = 0;
  //       time = `${hour}:0${minutes}`;
  //     } else if (minutes < 10) {
  //       time = `${hour}:0${minutes}`;
  //     } else {
  //       time = `${hour}:${minutes}`;
  //     };

  //     if (posterIndex === 0) {
  //       posterId = 1;
  //     } else if (posterIndex === 1) {
  //       posterId = 2;
  //     };

  //     let chatItem = {
  //       userID: posterId,
  //       username: poster[posterIndex],
  //       userMessage: `${message}: ${messageNumber}`,
  //       timeStamp: `${time}pm`,
  //       date: date
  //     };

  //     chatLog.push(chatItem);


  //     if (posterIndex === 0) {
  //       posterIndex = 1;
  //     } else if (posterIndex === 1) {
  //       posterIndex = 0;
  //     } else {
  //       console.log('Error in reassign posterIndex')
  //     }

  //     minutes += 1;
  //     messageNumber += 1;
  //   };

  //   Promise.all(chatLog.map((chatItem) => {
  //     db.queryAsync(`INSERT INTO fambamschema.guestRoom (
  //       user_id,
  //       user_name,
  //       user_message,
  //       time_stamp,
  //       date
  //       ) VALUES ($1, $2, $3, $4, $5)
  //     `, [chatItem.userId, chatItem.username, chatItem.userMessage, chatItem.timeStamp, chatItem.date])
  //   }))
  //   .then(() => {
  //     console.log(`It is done master...`)
  //   })
