var controller = require('./controllers');
var router = require('express').Router();
var allowServerAccessBy = require('cors');
require('dotenv').config();

const env = process.env;

router.use(allowServerAccessBy());

router.get(`/login`, controller.login);
router.get(`/getChat`, controller.getChat);
router.post(`/newMessage`, controller.newMessage);
router.post(`/newToDo`, controller.newToDo);
router.get(`/getToDo`, controller.getToDo);
router.put(`/completeToDo`, controller.completedToDo);
router.put(`/logout`, controller.logout);
router.put(`/sendDadText`, controller.sendDadText);
router.put(`/editProfile`, controller.editProfile);

module.exports = router;