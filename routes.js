const express = require('express')
const router = express.Router()

const auth = require('./controllers/auth')
const site = require('./controllers/site')
const admin = require('./controllers/admin')
const pages = require('./controllers/pages')
const media = require('./controllers/media')

const isAuthMiddleware = require('./controllers/middleware/isAuth')
const sessionExists = require('./controllers/middleware/sessionExists')

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
router.get('/admin/add_media', admin.addMedia)
router.get('/admin/media_manager', admin.mediaManager)
// Pages
router.post('/admin/pages', pages.pageAdd)
router.put('/admin/pages', pages.pageEdit)
router.delete('/admin/pages/:idx', pages.pageDelete)
router.get('/admin/pages', pages.pageGetAll)
router.get('/admin/pages/:idx', pages.pageGet)
// Media
router.post('/admin/file', media.addMedia)
router.get('/admin/file', media.getAllMedia)
router.get('/admin/file/:id', media.getOneMedia)
router.delete('/admin/file', media.deleteMedia)



module.exports = router