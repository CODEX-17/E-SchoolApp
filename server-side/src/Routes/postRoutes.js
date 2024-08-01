const express = require('express')
const router = express.Router()
const db = require('../db')

// GET ALL POST INNER JOIN IN SHEDULE TABLE
router.get('/getPostInnerJoinSchedule', (req, res)=> {
    const query = 'SELECT post.*, schedule.* FROM `post` INNER JOIN schedule ON post.schedID = schedule.schedID'

    db.query(query, (error, data, fields) => {
        if (error) {
            return res.status(404).send(error)
        }else {
            return res.status(200).json(data)
        }
    })
})

// GET ALL POST
router.get('/getPost', (req, res)=> {
    const query = 'SELECT * FROM `post`'

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

// Update post and remove the schedule
router.post('/postNowTheSchedule', (req, res) => {
    const { schedID, time, date } = req.body
    const queryPost = "UPDATE post SET schedID='none', timePosted=?, datePosted=? WHERE schedID=?"
    const querySchedule = "DELETE FROM schedule WHERE schedID=?"

    db.query(queryPost, [time, date, schedID], (error, data, field) => {
        if (error) {
            console.log(error)
            res.status(404).send(error)
        } else {
            console.log('Update post successfully.')

            db.query(querySchedule, [schedID], (err, data, field) => {
                if (err) {
                    console.log(err)
                    res.status(404).send(err)
                } else {
                    console.log('Delete schedule successfully.')
                    res.status(200).json({ message: 'Successfully posted.' })
                }
            })
        }
    })
})

// Add post in database
router.post('/addPost', (req, res) => {
    
    const { postID, acctID, name, timePosted, datePosted, postContent, replyID, imageID, fileID, heartCount, likeCount, classCode, subjectName, postType, quizID, schedID, schedStatus, dueStatus, closeStatus, duration, random } = req.body

    const postQuery = 'INSERT INTO post(postID, acctID, name, timePosted, datePosted, postContent, replyID, imageID, fileID, heartCount, likeCount, classCode, subjectName, postType, quizID, schedID, schedStatus, dueStatus, closeStatus, duration, random) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
    const updateDraftQuizQuery = "UPDATE quiz SET postStatus='posted' WHERE quizID=?"


    db.query(postQuery, [postID, acctID, name, timePosted, datePosted, postContent, replyID, imageID, fileID, heartCount, likeCount, classCode, subjectName, postType, quizID, schedID, schedStatus, dueStatus, closeStatus, duration, random], (error, data, field) => {
        if (error) {
            console.log(error)
            res.status(404).send(error)
        }else {

            db.query(updateDraftQuizQuery, [quizID], (err, data, field) => {
                if (err) {
                    console.log(err)
                    res.status(404).send(err)
                }

                res.status(200).json({ message: 'Succefully add post.' })
            })
        }
    })

})


module.exports = router