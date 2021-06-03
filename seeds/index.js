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
    for (let i = 0; i < 3; i++) {
        const entry = new Entry({
            id: entries[0].seanjoyce.entries[i].id,
            date_num: entries[0].seanjoyce.entries[i].date_num,
            date: entries[0].seanjoyce.entries[i].date,
            subject: entries[0].seanjoyce.entries[i].subject,
            body: entries[0].seanjoyce.entries[i].body,
            rating: entries[0].seanjoyce.entries[i].rating,
            tag: entries[0].seanjoyce.entries[i].tag
        })
        await entry.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
});
