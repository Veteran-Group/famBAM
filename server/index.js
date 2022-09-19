const express = require('express');
require('dotenv').config();
const router = require('./routers.js');
const morgan = require('morgan');

const app = express();
const port = process.env.SERVERPORT || 3001;




app.use(express.json());
app.use(morgan('dev'));
app.use('/', router);

app.listen(port, () => {
  console.log(`Login Server lisening on port ${port}...`)
})