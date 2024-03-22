const express = require('express')
const router = express.Router()
const db = require('../db')


router.get('/getImages', (req, res)=> {
    const query = 'SELECT * FROM image'

    db.query(query, (error, data, fields) => {
        if (error) {
            return res.status(404).send(error)
        }else {
            return res.status(200).json(data)
        }
    })
})

module.exports = router