const express = require('express')
const router = express.Router()

const auth = require('./contollers/auth')
const site = require('./contollers/site')
const admin = require('./contollers/admin')

const isAuthMiddleware = require('./contollers/middleware/isAuth')
const sessionExists = require('./contollers/middleware/sessionExists')

// Routes
router.get('/', site.getIndex)
router.get('/admin', isAuthMiddleware, site.getAdmin)
// Auth
router.get('/login', sessionExists, auth.getLogin)
router.post('/login', auth.postLogin)
router.get('/logout', auth.logout)
router.get('/register', sessionExists, auth.register)
router.post('/register', sessionExists, auth.postRegister)
// Admin
router.get('/admin/add_page', admin.addPage)
router.get('/admin/page_manager', admin.pageManager)
router.get('/admin/site_options', admin.siteOptions)
router.get('/admin/server_options', admin.serverOptions)

module.exports = router