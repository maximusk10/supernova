
const { Client } = require('pg')

// Load db config
const conn = require('./middleware/connectionData')
const isAuth = require('./middleware/isAuth')
const client = new Client(conn)


exports.getIndex = (req, res, next) => {
    res.send('Index pendiente')
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