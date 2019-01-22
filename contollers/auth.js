// Load db config
const conn = require('./middleware/connectionData')
// Hashing data
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

exports.getLogin = (req, res) => {
    res.render('admin/login')
}

exports.postLogin = (req, res) => {
    
    const query = 'SELECT * FROM users WHERE email = $1 LIMIT 1'
    const params = [req.body.txtEmail]
    conn.connect()
        .then((client) => {
            return client.query(query, params)
                .then(results => {
                    if(results.rows.length > 0) {
                        bcrypt.compare(req.body.txtPassword, results.rows[0].password, function (err, resp) {
                            if(resp) {
                                req.session.name = results.rows[0].name.toString()
                                req.session.email = results.rows[0].email.toString()
                                req.session.error = null
                                res.redirect('/admin')
                            } else {
                                res.send('passwords didnt match')
                            }
                        });                            
                    } else {
                            req.session.error = 'Name is not in the database'
                        res.status(401).redirect('/login')
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
    res.render('admin/register')
}

exports.postRegister = (req, res) => {
    const query = 'INSERT INTO users(name, email, password, role_id) VALUES($1, $2, $3, 0)'
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(req.body.txtPassword, salt, function (err, hash) {
            const params = [req.body.txtName, req.body.txtEmail, hash]
            conn.connect()
                .then( client => {
                    return client.query(query, params)
                        .then( result => {
                            req.session.name = req.body.txtName.toString()
                            req.session.email = req.body.txtEmail.toString()
                            req.session.error = null
                            res.redirect('/admin')
                        })
                })
                .catch( error => {
                    res.send("sendo error: " + error)
                })
        });
    });
}

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login')
    });
    
}