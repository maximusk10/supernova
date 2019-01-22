// Load db config
const conn = require('./middleware/connectionData')

exports.getLogin = (req, res) => {
    res.render('admin/login')
}

exports.postLogin = (req, res) => {
    
    let string = `${req.body.txtEmail} - ${req.body.txtPassword}`
    const query = 'SELECT * FROM users WHERE email = $1 LIMIT 1'
    const params = [req.body.txtEmail]
    conn.connect()
        .then((client) => {
            return client.query(query, params)
                .then(results => {
                    if(results.rows.length > 0) {
                        if(results.rows[0].password === req.body.txtPassword) {
                            req.session.idx = results.rows[0].id.toString()
                            res.send('Welcome')
                        } else {
                            res.send('password didn match')
                        }
                    } else {
                        res.status(401).send('Error to login')
                    }
                })
                .catch(error => {
                    res.send(error)
                })
        })
        .catch(error => {
            res.send(error)
        })
}

exports.register = (req, res) => {
    res.send('register')
}

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login')
    });
    
}