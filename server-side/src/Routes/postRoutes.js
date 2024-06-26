const express = require('express')
const router = express.Router()
const db = require('../db')

// GET ALL POST
router.get('/getPost', (req, res)=> {
    const query = 'SELECT post.*, schedule.* FROM `post` INNER JOIN schedule ON post.schedID = schedule.schedID'

    db.query(query, (error, data, fields) => {
        if (error) {
            return res.status(404).send(error)
        }else {
            return res.status(200).json(data)
        }
    })
})


// Get post by classCode
router.get('/getPostByClassCode/:classCode', (req, res) => {
    const classCode =  req.params.classCode
    const query = "SELECT * FROM `post` WHERE classCode =?"
    db.query(query,[classCode], (error, data, field) => {
        if (error) {
            res.status(404).json(error)
        } else {
            res.status(200).json(data)
        }
    })
})

// Delete post by postID
router.delete('/deletePostByPostID/:postID', (req, res) => {
    const postID = req.params.postID
    const fileID = req.body.fileID
    const imageID = req.body.imageID
    const query = "DELETE FROM `post` WHERE postID =?"

    db.query(query, [postID], (error, data, field) => {
        if (error) {
            res.status(404).send(error)
        } else {
            res.status(200).json({ message: 'Delete post successfully.' })
        }
    })
})

// Add post in database
router.post('/addPost', (req, res) => {
    
    const postID = req.body.postID
    const acctID = req.body.acctID
    const name = req.body.name
    const timePosted = req.body.timePosted
    const datePosted = req.body.datePosted
    const postContent = req.body.postContent
    const replyID = req.body.replyID
    const imageID = req.body.imageID
    const fileID = req.body.fileID
    const heartCount = req.body.heartCount
    const likeCount = req.body.likeCount
    const classCode = req.body.classCode
    const subjectName = req.body.subjectName
    const postType = req.body.postType
    const quizID = req.body.quizID
    const schedID = req.body.schedID
    const duration = req.body.duration
    const random = req.body.random

    const postQuery = 'INSERT INTO post(postID, acctID, name, timePosted, datePosted, postContent, replyID, imageID, fileID, heartCount, likeCount, classCode, subjectName, postType, quizID, schedID, duration, random) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
    
    db.query(postQuery, [postID, acctID, name, timePosted, datePosted, postContent, replyID, imageID, fileID, heartCount, likeCount, classCode, subjectName, postType, quizID, schedID, duration, random], (error, data, field) => {
        if (error) {
            console.log(error)
            res.status(404).send(error)
        }else {
            res.status(200).json({ message: 'Succefully add post.' })
        }
    })

})


module.exports = router