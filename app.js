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
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/user')

mongoose.connect('mongodb://localhost:27017/happiness-journal', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
})

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public'))) //to serve your app with public JS and CSS files
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


const sessionConfig = {
    secret: 'thisshouldbeabettersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))

app.use(flash());

app.use(passport.initialize()); //make sure this is AFTER use.(session...
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser()); //store it 
passport.deserializeUser(User.deserializeUser()); //un-store it in session

app.use((req, res, next) => {
    res.locals.success = req.flash('success'); //middleware so that we have local access to the flash in all our templates 
    res.locals.error = req.flash('error');
    next(); //remember to call next() on your middleware!
})

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