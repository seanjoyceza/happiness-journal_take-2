const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const Entry = require('./models/entry');
const { findById } = require('./models/entry');
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')
const catchAsync = require('./utils/catchAsync')
const ExpressError = require('./utils/ExpressError')
const { entrySchema } = require('./schemas')
const entries = require('./routes/entries')

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

app.use('/entries', entries)

app.get('/', (req, res) => {
    res.render('home')
})


app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404)) //here we pass a ExpressError model to next so that we can use it below
})

app.use((err, req, res, next) => { //all erros will be thrown in here with it's respective error message and status code 
    const { statusCode = 500 } = err; //destructure from error, wherever it is coming from (defaults added)
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err }); //add status code to console, and redner the edit screen
})

app.listen(3000), () => {
    console.log('Serving on port 3000')
}