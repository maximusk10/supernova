// Load dependencies
const express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    path = require('path'),
    compression = require('compression')
    
// Local dependencies
const routes = require('./routes')
// Load .env
require('dotenv').config()

// Check if is production
const IS_PRODUCTION = process.env.NODE_ENV == 'production' 

// Bootstrap app
const app = express()


// Session config
app.use(session({
    name: process.env.SESS_NAME,
    store: new (require('connect-pg-simple')(session))(),
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESS_KEY,
    cookie: {
        maxAge: 600000,
        sameSite: true,
        secure: IS_PRODUCTION
    }

}))
// Config template engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Set static folder
app.use(express.static('static'))
// Set gzip compression
app.use(compression())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Global Variables
app.locals = {
    site: {
        title: process.env.SITE_TITLE,
        description: 'A boilerplate for a simple web application with a Node.JS and Express backend, with an EJS template with using Twitter Bootstrap.'
    },
    author: {
        name: 'Dario Promoneti',
        contact: process.env.EMAIL
    }
};

// Load Router
app.use('/', routes)

// Deploy Server
app.listen(process.env.PORT, () => {
    console.log(`Running server on : http://localhost:${ process.env.PORT }`)
})