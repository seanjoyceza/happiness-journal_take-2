const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const Entry = require('./models/entry')

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

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/makeentry', async (req, res) => {
    const entry = new Entry({ subject: 'kaballas', body: 'kaballas' })
    await entry.save();
    res.send(entry)
})

app.listen(3000), () => {
    console.log('Serving on port 3000')
}