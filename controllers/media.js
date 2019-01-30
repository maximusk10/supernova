const path = require('path')
const fs = require('fs')
const conn = require('./middleware/connectionData')


exports.addMedia = (req, res) => {
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
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify({
                sucess: "file uploades successfully"
            }))  
        

    })
}

exports.getAllMedia = (req, res) => {
    const testFolder = './static/uploads';
    fs.readdir(testFolder, (err, files) => {
        res.status(200).send(JSON.stringify(files))
    })
}

exports.deleteMedia = (req, res) => {
    let fileName = req.body.deleteName
    console.log(fileName)
    console.log('Uploaded')
    let query = `DELETE FROM media WHERE id = $1;`
    let params = [req.body.deleteName]
    conn.connect()
        .then(client => {
            return client.query(query, params)
                .then((resultset) => {

                    res.setHeader('Content-Type', 'application/json');
                    fs.unlink(`./static/uploads/${fileName}`, (err) => {
                        res.status(200).send(JSON.stringify({
                            result: "file deleted successfully"
                        }))
                    });
                })
                .catch((error) => {
                    res.status(500).send(JSON.stringify({
                        result: 0,
                        status: 500,
                        error
                    }))
                })
        })
        .catch((error) => {
            res.send('error prro ', error)
        })
    
}

exports.getOneMedia = ( req, res ) => {
    let query = `SELECT * FROM media WHERE id=$1;`
    let params = [req.params.id]
    conn.connect()
        .then(client => {
            return client.query(query, params)
                .then((resultset) => {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).send(JSON.stringify(resultset.rows))
                })
                .catch((error) => {
                    res.status(500).send(JSON.stringify({
                        result: 0,
                        status: 500,
                        error
                    }))
                })
        })
        .catch((error) => {
            res.send('error prro ', error)
        })
}