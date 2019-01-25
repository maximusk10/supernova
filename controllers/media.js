const path = require('path')
const fs = require('fs')

exports.addMedia = (req, res) => {
    console.log(req.files.file)
    var dir = path.join(__dirname, '../static/uploads/');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    req.files.file.mv(path.join(dir, req.files.file.name), (error) => {
        if(error) {
            res.status(500).send(JSON.stringify({
                error: "Error uploading"
            }))
        }
        console.log('Uploaded')
        res.status(200).send(JSON.stringify({
            sucess: "file uploades successfully"
        }))  

    })
}