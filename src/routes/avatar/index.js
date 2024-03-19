'use strict'

const express = require('express');
const route = express.Router();

const AvatarController = require('../../controllers/avatar.controller');
const { asyncHandler } = require('../../auth/checkAuth');

// TODO get
route.post('/avatar/getav', asyncHandler(AvatarController.getAV));
// TODO get
route.post('/avatar/getallav', asyncHandler(AvatarController.getAll));
// TODO save
route.post('/avatar/saveav', asyncHandler(AvatarController.saveAV));

// TODO getstring
route.post('/avatar/get-string', asyncHandler(AvatarController.getString));

module.exports = route;