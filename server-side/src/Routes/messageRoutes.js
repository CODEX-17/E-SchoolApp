const express = require('express')
const router = express.Router()
const db = require('../db')

//API get quiz
router.get('/getMessages', (req, res) => {

    const query = 'SELECT * FROM messages'

    db.query(query, (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            res.status(200).json(data)
        }
    })
})


//API get quiz
router.get('/getMessageByAcctID/:acctID', (req, res) => {
    const acctID = req.params.acctID
    const query = 'SELECT * FROM messages WHERE messageSender=? OR messageReceiver=?'

    db.query(query,[acctID, acctID], (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            res.status(200).json(data)
        }
    })
})

//API add messages
router.post('/addMessages', (req, res) => {

     const messageID = req.body.messageID
     const roomID = req.body.roomID
     const messageContent = req.body.messageContent
     const messageSender = req.body.messageSender
     const messageReceiver = req.body.messageReceiver
     const date = req.body.date
     const time = req.body.time

    const query = 'INSERT INTO messages(messageID, roomID, messageContent, messageSender, messageReceiver, date, time) VALUES(?,?,?,?,?,?,?)'

    db.query(query,[messageID, roomID, messageContent, messageSender, messageReceiver, date, time], (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            console.log('Succefully added messages.')
            res.status(200).json({ message: 'Succefully added messages.' })
        }
    })
})



module.exports = router