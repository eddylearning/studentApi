const express = require('express');
const routes = express.Router();
const usercontroller = require('../controller/usercontroller');

routes.post('/register', usercontroller.adduser);

module.exports = routes;
