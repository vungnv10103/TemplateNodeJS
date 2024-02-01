require('dotenv').config();
const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser')
const { default: helmet } = require('helmet');
const morgan = require('morgan');
const app = express();

console.log(`env: ${process.env}`);

// init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// init DB
const db = require('./dbs/init.mongodb');
const { countConnect, checkOverload } = require('./helpers/check.connect');

// checkOverload();


// init route
app.use('/', require('./routes/'));

// handle error



module.exports = app
