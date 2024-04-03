const express = require('express')
const router = express.Router()
const db = require('../db')
const multer = require('multer')
const path = require('path')

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

router.get('/getClassByClassCode/:classCode', (req, res) => {
    const classCode = req.params.classCode
    console.log(classCode)
    const query = 'SELECT * FROM class WHERE classCode =?' 

    db.query(query, [classCode], (error, data, fields) => {
        if (error) {
            return res.status(404).send(error)
        }else {
            return res.status(200).json(data)
        }
    })
})

router.put('/hideClass/:classID', (req, res) => {
    const classID = req.params.classID
    const hide = 'true'
    const query = 'UPDATE class SET hidden =? WHERE classID =?'

    db.query(query, [hide, classID], (error, data, fields) => {
        if (error) {
            return res.status(404).send(error)
        }else {
            return res.status(200).json({ message: 'Successfully hide the class.' })
        }
    })

})

router.put('/unhideClass/:classID', (req, res) => {
    const classID = req.params.classID
    const hide = 'false'
    const query = 'UPDATE class SET hidden =? WHERE classID =?'

    db.query(query, [hide, classID], (error, data, fields) => {
        if (error) {
            return res.status(404).send(error)
        }else {
            return res.status(200).json({ message: 'Successfully hide the class.' })
        }
    })

})

const storageImage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, file.fieldname +'_'+ Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storageImage })

router.post('/addClass', upload.single('image'), (req, res) => {
    
    const {
        className,
        classDesc,
        classCode,
        membersID,
        imageID,
        hidden,
        acctID,
        firstname,
        middlename,
        lastname,
        memberType,
    } = req.body

    const classQuery = 
    `INSERT INTO class(
        className,
        classDesc,
        classCode,
        membersID,
        imageID,
        hidden
    ) VALUES(?,?,?,?,?,?)`

    const imageQuery = 'INSERT INTO image(name, type, data, imageID) VALUES(?,?,?,?)'
    const memberQuery = 'INSERT INTO members(membersID, acctID, firstname, middlename, lastname, memberType) VALUES(?,?,?,?,?,?)'
    const classListQuery = 'INSERT INTO class_list(acctID, classCode, hidden) VALUES(?,?,?)'


    db.query(classQuery, [className,classDesc,classCode,membersID,imageID,hidden], (error, data, fields) => {
        if (error) {
            return res.status(404).send(error)
        }else {
            db.query(memberQuery, [membersID, acctID, firstname, middlename, lastname, memberType], (error, data, fields) => {
                if (error) {
                    res.status(404).send(error)
                }else {
                    db.query(classListQuery, [acctID, classCode, hidden], (error, data, fields) => {
                        if (error) {
                            res.status(404).send(error)
                        }else {
                            if (req.file) {
                                const { filename, mimetype, originalname } = req.file
        
                                db.query(imageQuery, [filename, mimetype, originalname, imageID], (error, data, fields) => {
                                    if (error) {
                                        return res.status(404).send(error)
                                    }else {
                                        return res.status(200).json({ message: 'Successfully add class.'})
                                    }
                                })
                            }else {
                                
                                db.query(imageQuery, ['default', 'image/jpeg', 'none', imageID], (error, data, fields) => {
                                    if (error) {
                                        return res.status(404).send(error)
                                    }else {
                                        return res.status(200).json({ message: 'Successfully add class.'})
                                    }
                                })
                            }
                        }
                    })
                }
            })
        }
    })

})





module.exports = router