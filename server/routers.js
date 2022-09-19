var controller = require('./controllers');
var router = require('express').Router();
var allowServerAccessBy = require('cors');
require('dotenv').config();

const env = process.env;

router.use(allowServerAccessBy());

router.get(`/login`, controller.login);
router.get(`/getChat`, controller.getChat);
router.get(`/createNewRoom`, controller.createNewRoom);
router.get(`/chatLogin`, controller.chatLogin);
router.post(`/newMessage`, controller.newMessage);
router.post(`/newToDo`, controller.newToDo);
router.get(`/getToDo`, controller.getToDo);
router.put(`/completeToDo`, controller.completedToDo);

module.exports = router;