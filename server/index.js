const express = require('express');
require('dotenv').config();
const router = require('./routers.js');
const morgan = require('morgan');

const login = express();
const port = process.env.SERVERPORT || 3001;

login.use(express.json());
login.use(morgan('dev'));
login.use('/', router);

login.listen(port, () => {
  console.log(`Login Server lisening on port ${port}...`)
})