const conn = require('./middleware/connectionData')

exports.pageAdd = (req, res) => {
    const query = 'SELECT * FROM users'
    conn.connect()
        .then( client => {
            return client.query(query)
                .then(( resultset ) => {
                    res.status(500).send(resultset.rows[0])
                })
                .catch(( error ) => {
                    res.status(500).send('error prro ', error)
                })
        })
        .catch((error) => {
            res.send('error prro ', error)
        })
            
}