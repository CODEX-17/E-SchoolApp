const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/getReactsByPostID/:classCode', (req, res) => {
    const classCode =  req.params.classCode
    const query = "SELECT * FROM reactions WHERE classCode = ?"
    db.query(query,[classCode], (error, data, field) => {
        if (error) {
            res.status(404).json(error)
        } else {
            res.status(200).json(data)
        }
    })
})

router.delete('/deleteReactionsByreactID/:reactID', (req, res) => {
    const query = "DELETE FROM reactions WHERE reactID=?"
    const reactID = req.params.reactID
    db.query(query,[reactID], (error, data, field) => {
        if (error) {
            res.status(404).json(error)
        } else {
            res.status(200).json({ message: 'react successfully deleted.' })
        }
    })
    
})

router.post('/addReactions', (req, res) => {
    const classCode =  req.body.classCode
    const reactID = req.body.reactID
    const postID = req.body.postID
    const acctID = req.body.acctID
    const reactType = req.body.reactType
    
    const query = "INSERT INTO reactions (reactID, postID, acctID, classCode, reactType) VALUES(?,?,?,?,?)"
    
    db.query(query,[reactID, postID, acctID, classCode, reactType], (error, data, field) => {
        if (error) {
            res.status(404).json(error)
        } else {
            res.status(200).json({ message: 'react successfully added.' })
        }
    })
})


module.exports = router