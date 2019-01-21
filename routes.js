const express = require('express')
const router = express.Router()

const auth = require('./contollers/auth')
const site = require('./contollers/site')

const isAuthMiddleware = require('./contollers/middleware/isAuth')
// Routes
router.get('/', site.getIndex)
router.get('/admin', isAuthMiddleware, site.getAdmin)
// Auth
router.get('/login', auth.getLogin)
router.post('/login', auth.postLogin)
router.get('/logout', auth.logout)
router.get('/register', auth.register)

router.get('/testDb', site.testDb)

module.exports = router