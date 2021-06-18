const { entrySchema } = require('./schemas')
const ExpressError = require('./utils/ExpressError')
const Entry = require('./models/entry')


module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in!')
        return res.redirect('/login');
    } else {
        next(); //just call next when authentication is successful 
    }
}

module.exports.validateEntry = (req, res, next) => {
    //now once the joi schema is defined, we just pass it through to be validated 
    const { error } = entrySchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    const entry = await Entry.findById(id)
    if (!entry.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!')
        return res.redirect(`/entries/${entry._id}`);
    } else {
        next();
    }
}