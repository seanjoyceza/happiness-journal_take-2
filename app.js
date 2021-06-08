const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const Entry = require('./models/entry');
const { findById } = require('./models/entry');
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')

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

app.engine('ejs', ejsMate)
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    res.render('home')
})


//all entries
app.get('/entries', async (req, res) => {
    const entries = await Entry.find({})
    res.render('entries/index', { entries })
})

//new entry
app.get('/entries/new', (req, res) => {
    res.render('entries/new')
})

app.post('/entries', async (req, res) => {
    const entry = new Entry(req.body.entry);
    await entry.save();
    res.redirect(`/entries/${entry._id}`);
})


//show entry
app.get('/entries/:id', async (req, res) => {
    const entry = await Entry.findById(req.params.id)
    res.render('entries/show', { entry })
})

//edit entry
app.get('/entries/:id/edit', async (req, res) => {
    const entry = await Entry.findById(req.params.id)
    res.render('entries/edit', { entry })
})


//Update route
app.put('/entries/:id', async (req, res) => {
    const { id } = req.params;
    const entry = await Entry.findByIdAndUpdate(id, { ...req.body.entry })
    res.redirect(`/entries/${entry._id}`);
})


//delete route
app.delete('/entries/:id', async (req, res) => {
    const { id } = req.params;
    const entry = await Entry.findByIdAndDelete(id)
    res.redirect('/entries')
})

app.listen(3000), () => {
    console.log('Serving on port 3000')
}