
const { Client } = require('pg')

// Load db config
const conn = require('./middleware/connectionData')
const client = new Client(conn)


exports.getIndex = (req, res, next) => {
    if (req.session.views) {
        req.session.views++
        res.setHeader('Content-Type', 'text/html')
        res.write('<p>views: ' + req.session.views + '</p>')
        res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
        res.end()
    } else {
        req.session.views = 1
        res.end('welcome to the session demo. refresh!')
    }
}

exports.getAdmin = (req, res) => {
    res.render('admin/index')
}

exports.testDb = (req, res) => {
    client.connect()
    client.query('SELECT id, name FROM public.usuario;')
        .then(res => {
            console.log(res.rows)
            client.end()
        })
        .catch(err => {
            console.log('Error: ', err)
            client.end()
        })
    res.send('completed')
}