const { getPass } = require('./models');
const db = require('../src/db/index.js');
const express = require('express');

module.exports = {
  login: function(req, res) {
    const { username, pass } = req.query;
    const query = { text: getPass, values: [username, pass] };

    db.queryAsync(query)
      .then((response) => {
          if (response[0].rows.length === 1) {
          res.status(200).send(true);
        } else {
          res.status(400).send(false);
        }
      })
  }
}