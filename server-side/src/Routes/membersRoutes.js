const express = require('express')
const router = express.Router()
const db = require('../db')


//API get members to database
router.get('/getMembers', (req, res) => {
    const query = "SELECT members.*, image.data FROM members INNER JOIN image ON members.imageID = image.imageID"
    db.query(query, (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).json(error)
        } else {
            res.status(200).json(data)
        }
    })
})

//API add member to database
router.post('/addMembers', (req, res) => {

    const acctID = req.body.acctID
    const firstname = req.body.firstname
    const imageID = req.body.imageID
    const lastname = req.body.lastname
    const memberType = req.body.memberType
    const membersID = req.body.membersID
    const middlename = req.body.middlename
    const query = "INSERT INTO members(acctID, firstname, imageID, lastname, memberType, membersID, middlename) VALUES(?,?,?,?,?,?,?)"

    db.query(query, [acctID, firstname, imageID, lastname, memberType, membersID, middlename], (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).json(error)
        } else {
            res.status(200).json({ message: 'Succefully added member.' })
        }
    })
})

//API remove member from database
router.delete('/deleteMember/:id', (req, res) => {
    const id = req.params.id
    const query = "DELETE FROM members WHERE id =?"

    db.query(query, [id], (error, data, field) => {
        if (error) {
            console.error(error)
            res.status(404).json(error)
        } else {
            res.status(200).json({ message: 'Succefully removed member.' })
        }
    })
})

module.exports = router