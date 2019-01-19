// Load dependencies
const express = require('express')

// Load .env
require('dotenv').config()

// Bootstrap app
const app = express(),
      path = require('path'),
      compression = require('compression'),
      url = require('url');
      
// Config template engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Set static folder
app.use(express.static('static'))
// Set gzip compression
app.use(compression())

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
app.get('/admin', (req, res)=> {
    res.render('admin/index')
})

// Deploy Server
app.listen(process.env.PORT, () => {
    console.log(`Running server on : http://localhost:${ process.env.PORT }`)
})