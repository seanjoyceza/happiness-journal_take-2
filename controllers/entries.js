const Entry = require('../models/entry');

//index page
module.exports.index = async (req, res) => {
    const entries = await Entry.find({}).populate('author')
    res.render('entries/index', { entries })
}

//new entry
module.exports.renderNewForm = (req, res) => {
    res.render('entries/new')
}

//create entry
module.exports.createEntry = async (req, res, next) => {
    const entry = new Entry(req.body.entry);
    entry.author = req.user._id; //associates new campground with the current logged in user
    await entry.save();
    console.log(req.body.entry)
    req.flash('success', 'Successfully made a new entry!')
    res.redirect(`/entries/${entry._id}`);
}

//show entry
module.exports.showEntry = async (req, res) => {
    let entry = await Entry.findById(req.params.id).populate('author')
    if (!entry) {
        req.flash('error', 'Cannot find that entry!')
        return res.redirect('/entries');
    }
    res.render('entries/show', { entry })
}

//edit entry
module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const entry = await Entry.findById(id)
    if (!entry) {
        req.flash('error', 'Cannot find that entry!')
        return res.redirect('/entries');
    }
    res.render('entries/edit', { entry })
}

//update entry
module.exports.updateEntry = async (req, res) => {
    const { id } = req.params;
    const entry = await Entry.findByIdAndUpdate(id, { ...req.body.entry })
    req.flash('success', 'Successfully updated entry!')
    res.redirect(`/entries/${entry._id}`);
}

//delete entry
module.exports.deleteEntry = async (req, res) => {
    const { id } = req.params;
    const entry = await Entry.findByIdAndDelete(id)
    req.flash('success', 'Successfully deleted entry!')
    res.redirect('/entries')
}

