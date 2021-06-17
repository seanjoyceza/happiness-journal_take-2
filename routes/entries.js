const express = require('express')
const router = express.Router();
const catchAsync = require('../utils/catchAsync')
const { entrySchema } = require('../schemas')
const { isLoggedIn } = require('../middleware')

const ExpressError = require('../utils/ExpressError')
const Entry = require('../models/entry');

const validateEntry = (req, res, next) => {
    //now once the joi schema is defined, we just pass it through to be validated 
    const { error } = entrySchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

const isOwner = async (req, res, next) => {
    const { id } = req.params;
    const entry = await Entry.findById(id)
    if (!entry.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!')
        return res.redirect(`/entries/${entry._id}`);
    } else {
        next();
    }
}


//all entries
router.get('/', catchAsync(async (req, res) => {
    const entries = await Entry.find({}).populate('author')
    res.render('entries/index', { entries })
}))

//new entry
router.get('/new', isLoggedIn, (req, res) => {
    res.render('entries/new')
})

router.post('/', isLoggedIn, validateEntry, catchAsync(async (req, res, next) => {
    const entry = new Entry(req.body.entry);
    entry.author = req.user._id; //associates new campground with the current logged in user
    await entry.save();
    req.flash('success', 'Successfully made a new entry!')
    res.redirect(`/entries/${entry._id}`);
}))


//show entry
router.get('/:id', catchAsync(async (req, res) => {
    let entry = await Entry.findById(req.params.id).populate('author')
    if (!entry) {
        req.flash('error', 'Cannot find that entry!')
        return res.redirect('/entries');
    }
    res.render('entries/show', { entry })
}))

//edit entry
router.get('/:id/edit', isLoggedIn, isOwner, catchAsync(async (req, res) => {
    const { id } = req.params;
    const entry = await Entry.findById(id)
    if (!entry) {
        req.flash('error', 'Cannot find that entry!')
        return res.redirect('/entries');
    }
    res.render('entries/edit', { entry })
}))


//Update route
router.put('/:id', isLoggedIn, isOwner, validateEntry, catchAsync(async (req, res) => {
    const { id } = req.params;
    const entry = await Entry.findByIdAndUpdate(id, { ...req.body.entry })
    req.flash('success', 'Successfully updated entry!')
    res.redirect(`/entries/${entry._id}`);
}))


//delete route
router.delete('/:id', isLoggedIn, isOwner, catchAsync(async (req, res) => {
    const { id } = req.params;
    const entry = await Entry.findByIdAndDelete(id)
    req.flash('success', 'Successfully deleted entry!')
    res.redirect('/entries')
}))

module.exports = router;