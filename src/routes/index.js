'use strict'

const express = require('express');
const route = express.Router();

const { apiKey, permission } = require('../auth/checkAuth');
// check apiKey
// route.use(apiKey);
// check permisstion
// route.use(permission('0000'));

route.use('/v1/api', require('./access/'));
route.use('/v1/api', require('./avatar/'));


route.get('/', (req, res, next) => {
    const strCompress = "Hello world";
    return res.status(200).json({
        message: "Have a nice day!",
        metadata: strCompress.repeat(2)
    })
});

module.exports = route;