
const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const assetStringSchema = new Schema({
    key: { type: String, required: true, unique: true },
    value: { type: String, required: true },
}, {
    collection: "AssetString",
    timestamps: true,
});
const assetStringModel = mongoose.model("assetstring", assetStringSchema);
module.exports = { assetStringModel }