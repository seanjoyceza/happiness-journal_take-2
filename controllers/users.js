const User = require('../models/user');

//register routes
module.exports.renderRegister = (req, res) => {
    res.render('users/register')
}

module.exports.register = async (req, res, next) => {
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
}

//login routes
module.exports.renderLogin = (req, res) => {
    res.render('users/login')
}

module.exports.login = (req, res) => { //failure functions will run if failed
    const currentUser = req.user.fullname;
    req.flash('success', `Welcome back, ${currentUser}!`) //will run if successful
    const redirectUrl = req.session.returnTo || '/entries';
    delete req.session.returnTo
    res.redirect(redirectUrl); //will run if successful
}

//logout route
module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'Goodbey!')
    res.redirect('/login')
}