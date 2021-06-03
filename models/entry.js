const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const EntrySchema = new Schema({
    date: String,
    date_num: String,
    tag: String,
    rating: String,
    subject: String,
    body: String,
})

module.exports = mongoose.model('Entry', EntrySchema);