var controller = require('./controllers');
var router = require('express').Router();
var allowServerAccessBy = require('cors');
require('dotenv').config();

const env = process.env;

router.use(allowServerAccessBy());

router.get(`/login`, controller.login);
router.post(`/createNewRoom`, controller.createNewRoom);
router.post(`/sendTextDad`, controller.sendTextDad);

module.exports = router;