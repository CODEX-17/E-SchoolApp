const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/getClassesByAccount/:acctID', (req, res) => {

    const acctID = req.params.acctID
    const query = `
    SELECT class.*, image.*
    FROM class
    JOIN members ON class.membersID = members.membersID
    JOIN accounts ON members.acctID = accounts.acctID
    JOIN image ON class.imageID = image.imageID
    WHERE accounts.acctID =? `

    db.query(query,[acctID], (error, data, fields) => {
        if (error) {
            return res.status(404).send(error)
        }else {
            return res.status(200).json(data)
        }
    })

})


module.exports = router