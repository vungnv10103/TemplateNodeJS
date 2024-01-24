'use strict'

const { default: mongoose } = require("mongoose");
const os = require('os');
const process = require('process');
const _SECOND = 5000;


const countConnect = () => {
    const numConnection = mongoose.connections.length;
    console.log(`Number of connection: ${numConnection}`);
};

// * Check overload
const checkOverload = () => {
    setInterval(() => {
        const numConnection = mongoose.connections.length;
        const numCores = os.cpus().length;
        const memoryUse = process.memoryUsage().rss;
        // * set limit connection
        const maxConnecttion = numCores * 5; 

        console.log(`Memory use: ${Math.round(memoryUse / 1024 / 1024)} MB`);
        console.log(`Active connections: ${numConnection}`);
        if (numConnection >= maxConnecttion) {
            console.log(`Connection Overload detected`);
        }
    }, _SECOND); // Moditor every 5 seconds.
}

module.exports = {
    countConnect,
    checkOverload,
}