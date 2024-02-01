'use strict'

const express = require('express');
const route = express.Router();

route.use('/v1/api', require('./access/'));


route.get('/', (req, res, next) => {
    const strCompress = "Hello world";
    return res.status(200).json({
        message: "Have a nice day!",
        metadata: strCompress.repeat(2)
    })
});

module.exports = route;