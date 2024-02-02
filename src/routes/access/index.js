'use strict'

const express = require('express');
const route = express.Router();

const AccessController = require('../../controllers/access.controller');
const { asyncHandler } = require('../../auth/checkAuth');

// TODO Siginup
route.post('/shop/signup', asyncHandler(AccessController.signUp));

module.exports = route;