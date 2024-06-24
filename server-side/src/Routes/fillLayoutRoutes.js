const express = require('express')
const router = express.Router()
const db = require('../db')

//API get quiz
router.get('/getFillLayout', (req, res) => {
    const query = 'SELECT * FROM filllayout'

    db.query(query, (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            res.status(200).json(data)
        }
    })
})


//API ADD FILLLAYOUT
router.post('/addFillLayout', (req, res) => {
    const query = "INSERT INTO filllayout(choicesID, letter, content, correct) VALUES(?,?,?,?)"

    db.query(query, (error, data, field) => {
        if (error) {
            console.log(error)
            res.status(404).send(error)
        }

        res.status(200).json({
            message: "Successfully added filllayout."
        })
    })
})


module.exports = router