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

    const query = "INSERT INTO quiz (quizID, quizTitle, quizInstructions, questionID, subjectName, totalPoints, totalQuestions, time, date, duration, random, autoView, postStatus) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)"
    
    const {quizID, quizTitle, quizInstructions, questionID, subjectName, totalPoints, totalQuestions, time, date, duration, random, autoView, postStatus} = req.body
   
    db.query(query,[quizID, quizTitle, quizInstructions, questionID, subjectName, totalPoints, totalQuestions, time, date, duration, random, autoView, postStatus], (error, data, field) => {
        if (error) {
            console.log(error)
            res.status(404).send(error)
        }else {
            res.status(200).json({ message: "Successfully added quiz." })
        }
    })
})

//API DELETE QUIZ IN DATABASE
router.post('/deleteQuiz', (req, res) => {

    const queryQuiz = "DELETE FROM quiz WHERE quizID=?"
    const queryQuestion = "DELETE FROM questions WHERE questionID=?"

    const quizID = req.body.quizID
    const questionID = req.body.questionID
    console.log(quizID, questionID)

    db.query(queryQuiz, [quizID], (error, data, field) => {
        if (error) {
            console.log(error)
            res.status(404).send(error)
        }else {
            console.log("Successfully deleted quiz.")

            db.query(queryQuestion, [questionID], (error, data, field) => {
                if (error) {
                    console.log(error)
                    res.status(404).send(error)
                }else {
                    console.log("Successfully deleted questions.")
                    res.status(200).json({ message: "Successfully deleted quiz." })
                }
            })

        }
    })
})



module.exports = router