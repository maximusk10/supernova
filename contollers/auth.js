exports.getLogin = (req, res) => {
    res.render('admin/login')
}

exports.postLogin = (req, res) => {
    let string = `${req.body.txtEmail} - ${req.body.txtPassword}`
    res.send(string)
}

exports.register = (req, res) => {
    res.send('register')
}

exports.logout = (req, res) => {
    res.send('chao')
}