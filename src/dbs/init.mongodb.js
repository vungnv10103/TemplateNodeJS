'use strict'

const mongoose = require('mongoose');
const connecURL = "mongodb+srv://vungnguyenn1001:Pdtz8uoPEmQA1eHE@cluster0.w4gpger.mongodb.net/shop_dev?retryWrites=true&w=majority";
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
