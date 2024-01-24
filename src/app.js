const compression = require('compression');
const express = require('express');
const { default: helmet } = require('helmet');
const morgan = require('morgan');
const app = express();


// init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());



// init DB

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
