const express = require('express')

require('dotenv').config()

const app = express()

app.get('/', (req, res)=> {
    res.send('hello world')
})

app.listen(process.env.PORT, () => {
    console.log(`Running server on : http://localhost:${ process.env.PORT }`)
})