'use strict'

const { Schema, model } = require('mongoose'); // Erase if already required
const DOCUMENT_NAME = "Key";
const COLLECTION_NAME = "Keys"
// Declare the Schema of the Mongo model
const keyTokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    publicKey: {
        type: String,
        required: true,
    },
    privateKey: {
        type: String,
        required: false,
    },
    refreshToken: {
        type: Array,
        default: []
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = model(DOCUMENT_NAME, keyTokenSchema);