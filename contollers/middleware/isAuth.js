module.exports = (req, res, next) => {
    if (req.session && req.session.email) {
        return next();
    } else {
        var err = new Error('You must be logged in to view this page.');
        err.status = 401;
        return res.redirect('/login')
    }
}