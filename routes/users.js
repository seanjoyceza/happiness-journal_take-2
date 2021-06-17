const express = require('express')
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync')
const passport = require('passport')


//register route
router.get('/register', (req, res) => {
    res.render('users/register')
})

router.post('/register', catchAsync(async (req, res, next) => {
    try {
        const { email, username, password, fullname } = req.body
        const user = new User({ email, username, fullname })
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err)
            req.flash('success', 'Welcome to Happiness Journal!')
            res.redirect('entries')
        }) //to register user once logged in
    } catch (e) {
        req.flash('error', e.message)
        res.redirect('entries')
    }
}))

//login route
router.get('/login', (req, res) => {
    res.render('users/login')
})


router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => { //failure functions will run if failed
    req.flash('success', 'Welcome back!') //will run if successful
    const redirectUrl = req.session.returnTo || '/entries';
    delete req.session.returnTo
    res.redirect(redirectUrl); //will run if successful
})

//logout route
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Goodbey!')
    res.redirect('/entries')
})

module.exports = router;