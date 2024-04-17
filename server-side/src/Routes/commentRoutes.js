const express = require('express')
const router = express.Router()
const db = require('../db')

//API get comments by classCode
router.get('/getCommentsByClassCode/:classCode', (req, res) => {
    const query = 'SELECT * FROM comments WHERE classCode=?'
    const classCode = req.params.classCode

    db.query(query, [classCode], (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            res.status(200).json(data)
        }
    })
})

//API add comments in database
router.post('/addComment', (req, res) => {

    const postID = req.body.postID
    const acctID = req.body.acctID
    const content = req.body.content
    const time = req.body.time
    const date = req.body.date
    const fileID = req.body.fileID
    const imageID = req.body.imageID
    const replyID = req.body.replyID
    const classCode = req.body.classCode
    const fullname = req.body.fullname

    const query = 'INSERT INTO comments(replyID, postID, classCode, acctID, fullname, content, time, date, fileID, imageID) VALUES(?,?,?,?,?,?,?,?,?,?)'

    db.query(query, [replyID, postID, classCode, acctID, fullname, content, time, date, fileID, imageID], (error, data, fields) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            res.status(200).json({
                message: 'Comment added!'
            })
        }
    })

})

module.exports = router