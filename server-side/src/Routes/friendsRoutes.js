const express = require('express')
const router = express.Router()
const db = require('../db')

//API to get friends in database
router.get('/getFriends', (req, res) => {
    const query = 'SELECT friends.*, image.data FROM friends INNER JOIN image ON friends.imageID = image.imageID'

    db.query(query, (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        }else {
            res.status(200).json(data)
        }
    })
})

//API to get friends in database
router.get('/getFriendsByAcctID/:acctID', (req, res) => {
    const acctID = req.params.acctID
    const query = 'SELECT friends.*, image.data FROM friends INNER JOIN image ON friends.imageID = image.imageID WHERE friends.acctID=?'

    db.query(query,[acctID], (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        }else {
            res.status(200).json(data)
        }
    })
})


//API add friends to database
router.post('/addFriends', (req, res) => {

    const imageID = req.body.imageID
    const fullname = req.body.fullname
    const friendAcctID = req.body.friendAcctID
    const acctID = req.body.acctID

    const query = 'INSERT INTO friends(imageID,fullname,friendAcctID,acctID) VALUES(?,?,?,?)'

    db.query(query, [imageID, fullname, friendAcctID, acctID], (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        }else {
            res.status(200).json({ message: 'Successfull added to your friends.' })
        }
    })

})

//API delete friend to database
router.delete('/deleteFriends', (req, res) => {
    const acctID = req.body.acctID
    const friendAcctID = req.body.friendAcctID
    const query = 'DELETE FROM friends WHERE friendAcctID =? AND acctID =?'

    db.query(query, [friendAcctID, acctID], (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        }else {
            res.status(200).json({ message: 'Succefully removed friend.' })
        }
    })
})

module.exports = router