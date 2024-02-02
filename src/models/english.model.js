
const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const englishSchema = new Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
}, {
    collection: "English",
    timestamps: true,
});
const modelEnglish = mongoose.model("english", englishSchema);
module.exports = { modelEnglish }