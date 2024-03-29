const express = require('express')
const router = express.Router()

const auth = require('./contollers/auth')
const site = require('./contollers/site')

const isAuthMiddleware = require('./contollers/middleware/isAuth')
const sessionExists = require('./contollers/middleware/sessionExists')

// Routes
router.get('/', site.getIndex)
router.get('/admin', isAuthMiddleware, site.getAdmin)
// Auth
router.get('/login', sessionExists, auth.getLogin)
router.post('/login', sessionExists, auth.postLogin)
router.get('/logout', auth.logout)
router.get('/register', sessionExists, auth.register)
router.post('/register', sessionExists, auth.postRegister)

module.exports = router