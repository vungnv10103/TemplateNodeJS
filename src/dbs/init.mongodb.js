'use strict'

require('dotenv').config();
const mongoose = require('mongoose');
const connecURL = process.env.URL_DB;
const { countConnect } = require('../helpers/check.connect');



class Database {

    constructor() {
        this.connect();
    }
    connect(type = 'mongodb') {
        if (1 === 1) {
            mongoose.set('debug', true);
            mongoose.set('debug', { color: true });
        }
        mongoose.connect(connecURL).then(_ => console.log(`Connect MongoDB Success ${countConnect()}`))
            .catch(err => console.log(`Error connect DB`));
    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const instanceMongoDB = Database.getInstance();
module.exports = instanceMongoDB;
