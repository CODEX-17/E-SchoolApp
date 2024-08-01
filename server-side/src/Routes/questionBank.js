const express = require('express')
const router = express.Router()
const db = require('../db')

//API get quuestionBank
router.get('/getQuestionBank', (req, res) => {
    const query = 'SELECT * FROM questionbank'

    db.query(query, (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            res.status(200).json(data)
        }
    })
})

//API adding qeustionbank
router.post('/addQuestionBank', (req, res) => {
    const query = 'INSERT INTO questionbank(bankID, bankTitle, subjectName, questionID, totalPoints, totalQuestions, time, date) VALUES(?,?,?,?,?,?,?,?)'
    const { bankID, bankTitle, subjectName, questionID, totalPoints, totalQuestions, time, date } = req.body

    db.query(query,[bankID, bankTitle, subjectName, questionID, totalPoints, totalQuestions, time, date], (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            console.log('Successfully added questions in questionBank.')
            res.status(200).json({ message: 'Successfully added questions in questionBank.' })
        }
    })
})




module.exports = router