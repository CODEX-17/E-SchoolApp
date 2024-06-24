const express = require('express')
const router = express.Router()
const db = require('../db')

//API get quiz
router.get('/getQuiz', (req, res) => {
    const query = 'SELECT * FROM quiz'

    db.query(query, (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            res.status(200).json(data)
        }
    })
})

//API GET QUESTION INNNER JOIN IN QUIZ BY QUESTION ID
router.get('/getQuizInnerJoinQuestion/:quizID', (req, res) => {
    const query = 'SELECT quiz.*, questions.* FROM `quiz` INNER JOIN questions ON quiz.questionID = questions.questionID WHERE quiz.quizID = ?'
    const quizID = req.params.quizID

    db.query(query,[quizID], (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            res.status(200).json(data)
        }
    })
})

//API ADD QUIZ IN DATABASE
router.post('/addQuiz', (req, res) => {

    const query = "INSERT INTO quiz (quizID, quizTitle, quizInstructions, questionID, subjectName, totalPoints, totalQuestions, time, date, duration, random, autoView) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)"
    
    const {quizID, quizTitle, quizInstructions, questionID, subjectName, totalPoints, totalQuestions, time, date, duration, random, autoView} = req.body
   
    db.query(query,[quizID, quizTitle, quizInstructions, questionID, subjectName, totalPoints, totalQuestions, time, date, duration, random, autoView], (error, data, field) => {
        if (error) {
            console.log(error)
            res.status(404).send(error)
        }else {
            res.status(200).json({ message: "Successfully added quiz." })
        }
    })
})



module.exports = router