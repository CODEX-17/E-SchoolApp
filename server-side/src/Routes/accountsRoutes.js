const express = require('express')
const router = express.Router()
const db = require('../db')

router.post('/verifyAccount', (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const query = 'SELECT * FROM accounts WHERE email=? && password=?'

    db.query(query, [email, password], (error, data, fields) => {
        if (error) {
            return res.status(404).send(error)
        }else {
            return res.status(200).json(data)
        }
    })
})

module.exports = router