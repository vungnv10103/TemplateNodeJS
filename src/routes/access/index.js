'use strict'

const express = require('express');
const route = express.Router();

const AccessController = require('../../controllers/access.controller');

// TODO Siginup
route.post('/shop/signup', AccessController.signUp);

module.exports = route;