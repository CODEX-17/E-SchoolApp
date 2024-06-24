const express = require('express')
const router = express.Router()
const db = require('../db')

//API get score
router.get('/getScores', (req, res) => {
    const query = 'SELECT * FROM scores'

    db.query(query, (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            res.status(200).json(data)
        }
    })
})



module.exports = router