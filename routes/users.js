const express = require('express')
const router = express.Router();
const catchAsync = require('../utils/catchAsync')
const passport = require('passport')
const users = require('../controllers/users')


//register routes
router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register))

//login routes
router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

//logout route
router.route('/logout')
    .get(users.logout)

module.exports = router;