const express = require('express');
const { login, register } = require('../Controllers/auth');

const route = express.Router();

route.route('/register').post(register)
route.route('/login').post(login);

module.exports = route;