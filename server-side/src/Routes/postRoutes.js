const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/getPostByClassCode/:classCode', (req, res) => {
    const classCode =  req.params.classCode
    const query = "SELECT * FROM `post` INNER JOIN `class` ON post.classCode = class.classCode WHERE post.classCode =?"
    db.query(query,[classCode], (error, data, field) => {
        if (error) {
            res.status(404).json(error)
        } else {
            res.status(200).json(data)
        }
    })
})


module.exports = router