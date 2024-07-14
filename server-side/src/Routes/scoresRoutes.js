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

//API add score
router.post('/addScore', (req, res) => {

    const scoreID = req.body.scoreID
    const quizID = req.body.quizID
    const acctID = req.body.acctID
    const fullname = req.body.fullname
    const score = req.body.score

    const query = 'INSERT INTO scores(scoreID, quizID, acctID, fullname, score) VALUES(?,?,?,?,?)'


    db.query(query,[scoreID, quizID, acctID, fullname, score], (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            console.log("Succefully added score.")
            res.status(200).json({ message: "Succefully added score." })
        }
    })
})



module.exports = router