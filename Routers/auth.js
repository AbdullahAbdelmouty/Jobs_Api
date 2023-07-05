const express = require('express');
const { login, register } = require('../Controllers/auth');

const route = express.Router();

route.route('/').post(login).post(register);

module.exports = route;