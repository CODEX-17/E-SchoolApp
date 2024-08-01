const express = require('express')
const router = express.Router()
const db = require('../db')

//API GET SUBJECT
router.get('/getSubject', (req, res) => {
    const query = 'SELECT * FROM subject'

    db.query(query, (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            res.status(200).json(data)
        }
    })
})

//API ADD SUBJECT
router.post('/addSubject', (req, res) => {
    const query = 'INSERT INTO subject(subjectName, subjectCode) VALUES(?,?)'
    const { subjectName, subjectCode } = req.body

    db.query(query,[subjectName, subjectCode], (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            console.log('Successfully added subjects.')
            res.status(200).json({ message: 'Successfully added subjects.' })
        }
    })
})


//API DELETE SUBJECT
router.post('/deleteSubject/:subjectCode', (req, res) => {
    const query = 'DELETE FROM subject WHERE subjectCode=?'
    const subjectCode = req.params.subjectCode

    db.query(query,[subjectCode], (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            console.log('Successfully deleted subjects.')
            res.status(200).json({ message: 'Successfully deleted subjects.' })
        }
    })
})



module.exports = router