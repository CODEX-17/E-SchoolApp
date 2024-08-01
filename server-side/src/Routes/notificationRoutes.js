const express = require('express')
const router = express.Router()
const db = require('../db')

//API get quiz
router.get('/getNotification/:acctID', (req, res) => {
    const acctID = req.params.acctID
    const query = 'SELECT * FROM notifications WHERE acctID=?'

    db.query(query,[acctID], (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            res.status(200).json(data)
        }
    })
})

//API delete all notification
router.post('/deleteAllNotification/:acctID', (req, res) => {
    const acctID = req.params.acctID
    const query = 'DELETE FROM notifications WHERE acctID=?'

    db.query(query,[acctID], (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            res.status(200).json({ message: 'Successfully deleted all notifications.' })
        }
    })
})

//API delete specific notification
router.post('/deleteOneNotification', (req, res) => {
    const acctID = req.body.acctID
    const notificationID = req.body.notificationID
    const query = 'DELETE FROM notifications WHERE acctID=? AND notificationID=?'

    db.query(query,[acctID, notificationID], (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            res.status(200).json({ message: `Successfully deleted ${notificationID} notifications.` })
        }
    })
})

//API get quiz
router.post('/addNotification', (req, res) => {
    
    const notificationID = req.body.notificationID
    const acctID = req.body.acctID
    const title = req.body.title
    const data = req.body.data
    const content = req.body.content
    const date = req.body.date
    const time = req.body.time
    const type = req.body.type

    const query = 'INSERT INTO notifications(notificationID, acctID, title, data, content, date, time, type) VALUES(?,?,?,?,?,?,?,?)'

    db.query(query,[notificationID, acctID, title, data, content, date, time, type], (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            console.log('Succefully added notification.')
            res.status(200).json({ message: 'Succefully added notification.' })
        }
    })
})

module.exports = router