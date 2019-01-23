// Load db config
const conn = require('./middleware/connectionData')

exports.addPage = (req, res) => {
    res.render('admin/addPage.pug')
}