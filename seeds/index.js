const mongoose = require('mongoose');
const entries = require('./entries')
const Entry = require('../models/entry')

mongoose.connect('mongodb://localhost:27017/happiness-journal', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
})

const seedDB = async () => {
    await Entry.deleteMany({});
    for (let i = 0; i < 6; i++) {
        const entry = new Entry({
            author: '60cada6cbbc20e26640cc242',
            date: entries[i].date,
            date_num: entries[i].date_num,
            subject: entries[i].subject,
            body: entries[i].body,
            rating: entries[i].rating,
            tag: entries[i].tag
        })
        await entry.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
});
