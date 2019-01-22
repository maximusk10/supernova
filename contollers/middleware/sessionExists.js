module.exports = (req, res, next) => {
    if (req.session && req.session.name) {
        return res.redirect('/admin')
    } else {
        return next();
    }
}