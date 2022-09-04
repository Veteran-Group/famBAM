var controller = require('./controllers');
var router = require('express').Router();
var cors = require('cors');
require('dotenv').config();

router.use(cors());

router.get(`/login`, controller.login);

module.exports = router;