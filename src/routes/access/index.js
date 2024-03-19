'use strict'

const express = require('express');
const route = express.Router();

const AccessController = require('../../controllers/access.controller');
const { asyncHandler } = require('../../auth/checkAuth');

// TODO Siginup
route.post('/shop/signup', asyncHandler(AccessController.signUp));
// TODO Login
route.post('/shop/login', asyncHandler(AccessController.login));

module.exports = route;