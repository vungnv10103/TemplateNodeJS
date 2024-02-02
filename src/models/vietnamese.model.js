
const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const vietnameseSchema = new Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
}, {
    collection: "Vietnamese",
    timestamps: true,
});
const modelVietnamese = mongoose.model("vietnamese", vietnameseSchema);
module.exports = { modelVietnamese }