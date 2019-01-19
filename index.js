// Load dependencies
const express = require('express')
const path = require('path')
// Load .env
require('dotenv').config()
// Bootstrap app
const app = express()
// Config template engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.get('/', (req, res)=> {
    res.render('index')
})

app.listen(process.env.PORT, () => {
    console.log(`Running server on : http://localhost:${ process.env.PORT }`)
})