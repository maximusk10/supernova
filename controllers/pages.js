const conn = require('./middleware/connectionData')

exports.pageAdd = (req, res) => {
    let query = `INSERT INTO public.article(
    content, title, image_thumbnail, is_draft, is_noindex, is_nofollow, meta_description, meta_title, id_user)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9);`
    let params = [req.body.content, req.body.title, req.body.image_thumbnail, req.body.is_draft, req.body.is_noindex, req.body.is_nofollow, req.body.meta_description, req.body.meta_title, req.body.id_user]
    conn.connect()
        .then( client => {
            return client.query(query, params)
                .then(( resultset ) => {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).send(JSON.stringify({
                        result: 1
                    }))
                })
                .catch(( error ) => {
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

exports.pageEdit = (req, res) => {
    let query = `UPDATE article SET 
    content = $1, title = $2, image_thumbnail = $3, is_draft = $4, is_noindex = $5, is_nofollow = $6, meta_description = $7, meta_title = $8, updated_at = current_timestamp
    WHERE id = $9
    ;`
    let params = [req.body.content, req.body.title, req.body.image_thumbnail, req.body.is_draft, req.body.is_noindex, req.body.is_nofollow, req.body.meta_description, req.body.meta_title, req.body.id]
    conn.connect()
        .then(client => {
            return client.query(query, params)
                .then((resultset) => {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).send(JSON.stringify({
                        result: 1
                    }))
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

exports.pageDelete = (req, res) => {
    let query = `DELETE FROM ARTICLE
    WHERE id = $1;`
    let params = [req.params.idx]
    conn.connect()
        .then(client => {
            return client.query(query, params)
                .then((resultset) => {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).send(JSON.stringify({
                        result: 1
                    }))
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
exports.pageGetAll = (req, res) => {
    let query = `SELECT * FROM ARTICLE`
    conn.connect()
        .then(client => {
            return client.query(query)
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
exports.pageGet = (req, res) => {
    let query = `SELECT * FROM ARTICLE WHERE id = $1`
    let params = [req.params.idx]
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