// Load db config
const conn = require('./middleware/connectionData')

exports.addPage = (req, res) => {
    res.render('admin/addPage.pug')
}

exports.pageManager = (req, res) => {
    res.render('admin/pageManager.pug')
}

exports.siteOptions = (req, res) => {
    res.render('admin/siteOptions.pug')
}

exports.serverOptions = (req, res) => {
    res.render('admin/serverOptions.pug')
}