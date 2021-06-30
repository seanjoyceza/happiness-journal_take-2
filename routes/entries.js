const express = require('express')
const router = express.Router();
const catchAsync = require('../utils/catchAsync')
const { isLoggedIn, validateEntry, isOwner } = require('../middleware')
const entries = require('../controllers/entries')

//router.route consolidates all routes with different verbs
router.route('/chart')
    .get(isLoggedIn, catchAsync(entries.renderChart)) //show graph

router.route('/')
    .get(catchAsync(entries.index)) //index
    .post(isLoggedIn, validateEntry, catchAsync(entries.createEntry)) //create entry

router.route('/new')
    .get(isLoggedIn, entries.renderNewForm) //new Entry

router.route('/:id/edit')
    .get(isLoggedIn, isOwner, catchAsync(entries.renderEditForm)) //edit entry


router.route('/:id')
    .get(catchAsync(entries.showEntry)) //show entry
    .put(isLoggedIn, isOwner, validateEntry, catchAsync(entries.updateEntry))//Update route
    .delete(isLoggedIn, isOwner, catchAsync(entries.deleteEntry)) //delete route

module.exports = router;