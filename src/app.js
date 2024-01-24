require('dotenv').config();
const compression = require('compression');
const express = require('express');
const { default: helmet } = require('helmet');
const morgan = require('morgan');
const app = express();

console.log(`env: ${process.env}`);

// init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// init DB
const db = require('./dbs/init.mongodb');
const { countConnect, checkOverload } = require('./helpers/check.connect');
// checkOverload();


// init route
app.get('/', (req, res, next) => {
    const strCompress = "Hello world";
    return res.status(200).json({
        message: "Have a nice day!",
        metadata: strCompress.repeat(100000)
    })
})

// handle error



module.exports = app
