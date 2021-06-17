const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const EntrySchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date_num: String,
    subject: String,
    body: String,
    rating: String,
    tag: String
})

module.exports = mongoose.model('Entry', EntrySchema);