const express = require('express')
const router = express.Router()
const db = require('../db')

//API get quiz
router.get('/getSchedule', (req, res) => {
    const query = 'SELECT * FROM schedule'

    db.query(query, (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            res.status(200).json(data)
        }
    })
})

//API adding schedule
router.post('/addSchedule', (req, res) => {

    const query = 'INSERT INTO schedule(schedID,postID,schedDate,schedTime,dueDate,dueTime,closeDate,closeTime) VALUES(?,?,?,?,?,?,?,?)'
    const {schedID,postID,schedDate,schedTime,dueDate,dueTime,closeDate,closeTime} = req.body

    db.query(query,[schedID,postID,schedDate,schedTime,dueDate,dueTime,closeDate,closeTime], (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            console.log('Successfully added schedule.')
            res.status(200).json({ message: 'Successfully added schedule.' })
        }
    })
})



module.exports = router