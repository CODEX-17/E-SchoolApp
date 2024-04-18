const express = require('express')
const router = express.Router()
const db = require('../db')

//API add classList
router.post('/addClassList', (req, res) => {

    const acctID = req.body.acctID
    const classCode = req.body.classCode
    const hidden = req.body.hidden

    const query = "INSERT INTO class_list(acctID, classCode, hidden) VALUES(?,?,?)"

    db.query(query, [acctID, classCode, hidden], (error, results) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        }else {
            res.status(200).json({ message: 'Successfully add class-list' })
        }
    })
})

//API delete classList
router.delete('/deleteClassList', (req, res) => {
    const classCode = req.body.classCode
    const acctID = req.body.acctID
    console.log(req.body)

    const query = "DELETE FROM class_list WHERE classCode =? AND acctID =?"

    db.query(query, [classCode, acctID], (error, results) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        }else {
            res.status(200).json({ message: 'Successfully delete class-list' })
        }
    })
})


module.exports = router