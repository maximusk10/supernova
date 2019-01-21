// Load dependencies
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')

// Load .env
require('dotenv').config()

// Check if is production
const IS_PRODUCTION = process.env.NODE_ENV == 'production' 

// Bootstrap app
const app = express(),
      path = require('path'),
      compression = require('compression'),
      url = require('url');

const isLoginMiddleware = (req, res, next) => {
    if (req.session && req.session.userId) {
        return next();
    } else {
        var err = new Error('You must be logged in to view this page.');
        err.status = 401;
        return next(err);
    }
}
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

// Routes
app.get('/', function(req, res, next) {
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
})
app.get('/admin', isLoginMiddleware,  (req, res)=> {
    res.render('admin/index')
})

app.get('/login', (req, res) => {
    res.render('admin/login')
})

app.post('/login', (req, res) => {
    let string = `${req.body.txtEmail} - ${req.body.txtPassword}`
    res.send(string)
})

app.get('/logout', (req, res) => {

})

app.get('/register', (req, res) => {

})

// Deploy Server
app.listen(process.env.PORT, () => {
    console.log(`Running server on : http://localhost:${ process.env.PORT }`)
})