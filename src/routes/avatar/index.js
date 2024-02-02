'use strict'

const express = require('express');
const route = express.Router();

const AvatarController = require('../../controllers/avatar.controller');
const { asyncHandler } = require('../../auth/checkAuth');

// TODO get
route.post('/avatar/getav', asyncHandler(AvatarController.getAV));
// TODO save
route.post('/avatar/saveav', asyncHandler(AvatarController.saveAV));

module.exports = route;