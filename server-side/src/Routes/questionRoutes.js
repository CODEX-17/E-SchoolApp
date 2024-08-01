const express = require('express')
const router = express.Router()
const db = require('../db')

//API get quiz
router.get('/getQuestions', (req, res) => {
    const query = 'SELECT * FROM questions'

    db.query(query, (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            res.status(200).json(data)
        }
    })
})



//Update Questions
router.post('/updateQuestions', (req, res) => {
    const { id, questionID } = req.body
    const query = 'UPDATE questions SET questionID=? WHERE id=?'
    
    db.query(query,[questionID, id], (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            console.log("Successfully change questionID!")
            res.status(200).json({ message: "Successfully change questionID!" })
        }
    })
})


//Add questions
router.post('/addQuestions', async (req, res) => {
    const { choices, fillLayout, finalQuestionSet } = req.body;
    const bank = req.body.bank

    const questionQuery = "INSERT INTO questions(questionID, questionNumber, questionContent, questionType, points, keySensitive, questionAnswerText, numberOfAns, choicesID, imageID, fillLayoutID, subjectName) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";
    const choicesQuery = "INSERT INTO choices(choicesID, letter, content, correct) VALUES(?,?,?,?)";
    const fillLayoutQuery = "INSERT INTO filllayout(fillContent, fillType, fillPosition, fillLayoutID) VALUES(?,?,?,?)";
    const questionBankQuery = 'INSERT INTO questionbank(bankID, bankTitle, subjectName, questionID, totalPoints, totalQuestions, time, date) VALUES(?,?,?,?,?,?,?,?)';

    console.log(bank)

    try {
        
        const addChoices = choices.map(choice => {
            const { choicesID, letter, content, correct } = choice;
            return new Promise((resolve, reject) => {
                db.query(choicesQuery, [choicesID, letter, content, correct], (error, data) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data);
                    }
                });
            });
        });

        const addFillLayout = fillLayout.map(fill => {
            const { fillContent, fillType, fillPosition, fillLayoutID } = fill;
            return new Promise((resolve, reject) => {
                db.query(fillLayoutQuery, [fillContent, fillType, fillPosition, fillLayoutID], (error, data) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data);
                    }
                });
            });
        });

        const addQuestions = finalQuestionSet.map(question => {
            const { questionID, questionNumber, questionContent, questionType, points, keySensitive, questionAnswerText, numberOfAns, choicesID, imageID, fillLayoutID, subjectName } = question;
            return new Promise((resolve, reject) => {
                db.query(questionQuery, [questionID, questionNumber, questionContent, questionType, points, keySensitive, questionAnswerText, numberOfAns, choicesID, imageID, fillLayoutID, subjectName], (error, data) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data);
                    }
                });
            });
        });

        const addQuestionBank = bank.map(bank => {
            const { bankID, bankTitle, subjectName, questionID, totalPoints, totalQuestions, time, date } = bank;
            return new Promise((resolve, reject) => {
                db.query(questionBankQuery, [bankID, bankTitle, subjectName, questionID, totalPoints, totalQuestions, time, date], (error, data) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data);
                    }
                });
            });
        });

    
        await Promise.all([...addChoices, ...addFillLayout, ...addQuestions, ...addQuestionBank]);

        res.json({ message: 'Successfully submitted questions.' });

    } catch (error) {
        console.error('Transaction error: ', error);
        res.status(500).json({ message: 'Failed to submit the data.' });
    }
});


module.exports = router