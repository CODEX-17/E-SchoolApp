const express = require('express')
const router = express.Router()
const db = require('../db')

//API get quiz
router.get('/getChoices', (req, res) => {
    const query = 'SELECT * FROM choices'

    db.query(query, (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            res.status(200).json(data)
        }
    })
})

//API ADD CHOICES
router.post('/addChoices', (req, res) => {
    const query = "INSERT INTO choices(choicesID, letter, content, correct) VALUES(?,?,?,?)"

    db.query(query, (error, data, field) => {
        if (error) {
            console.log(error)
            res.status(404).send(error)
        }

        res.status(200).json({
            message: "Successfully added choices."
        })
    })
})



module.exports = router