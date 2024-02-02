'use strict'

const apiModel = require("../models/api.model")
const crypto = require('crypto');
const findByID = async (key) => {
    // const newKey = await apiModel.create({ key: crypto.randomBytes(64).toString('hex'), permissions: ['0000'] });
    // console.log(newKey);
    const objKey = await apiModel.findOne({ key, status: true }).lean();
    return objKey;
}


module.exports = {
    findByID,
}