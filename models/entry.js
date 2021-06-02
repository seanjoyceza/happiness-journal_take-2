const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const EntrySchema = new Schema({
    id: Number,
    date: String,
    tag: String,
    rating: String,
    subject: String,
    body: String,
})

module.exports = mongoose.model('Entry', EntrySchema);