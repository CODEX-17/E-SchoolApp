const express = require('express')
const router = express.Router()
const db = require('../db')
const multer = require('multer')
const upload = multer()
const fs = require('fs')
const path = require('path')

//API get accounts form database
router.get('/getAccounts', (req, res) => {
    const query = 'SELECT accounts.*, image.data FROM accounts INNER JOIN image ON accounts.imageID = image.imageID'

    db.query(query, (error, data, fields) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            res.status(200).json(data)
        }
    })
})

//API DELETE ACCOUNT BY ACCTID
router.post('/deleteAccount/:acctID', (req, res) => {
    
    const acctID = req.params.acctID
    const query = 'DELETE FROM accounts WHERE acctID=?'
    const imageQuery = 'DELETE FROM image WHERE imageID=?'

    db.query(query,[acctID], (error, data, fields) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {

            db.query(imageQuery, [acctID], (error, data, field) => {
                if (error) {
                    console.log(error)
                    res.status(404).send(error)
                }else {
                    res.status(200).json({ message: 'Successfully deleted account.' })
                }
            })

        }
    })
})


//API UPDATE ACCOUNTS
router.post('/UpdateAccounts', (req, res) => {

    const query = 'UPDATE accounts SET acctID=? acctype=? email=? password=? firstname=? middlename=? lastname=? status=? imageID=? WHERE acctID=?'

    const { acctID, acctype, email, password, firstname, middlename, lastname, status, imageID } = req.body 

    db.query(query,[acctID, acctype, email, password, firstname, middlename, lastname, status, imageID], (error, data, fields) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {
            console.log('Successfully update account.')
            res.status(200).json({ message: 'Successfully update account.' })
        }
    })
})

router.post('/verifyAccount', (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const query = 'SELECT accounts.*, image.data FROM accounts INNER JOIN image ON accounts.imageID = image.imageID WHERE accounts.email=? && accounts.password=?'

    db.query(query, [email, password], (error, data, fields) => {
        if (error) {
            return res.status(404).send(error)
        }else {
            return res.status(200).json(data)
        }
    })
})

const findFilePath = (filename) => {
    const uploadFolderPath = './uploads'; // Path to the upload folder

    // Read the contents of the upload folder
    const files = fs.readdirSync(uploadFolderPath);

    // Search for the file with the matching filename
    for (const file of files) {
        if (file === filename) {
            return path.join(uploadFolderPath, file); // Return the full file path
        }
    }

    return null; 
};

const findOldFilePath = (imageID) => {
    const query = 'SELECT * FROM image WHERE imageID =?'
    const uploadFolderPath = './uploads'
    const files = fs.readdirSync(uploadFolderPath)

    db.query(query, [imageID], (error, data, fields) => {
        if (error) {
            console.log(error)
        }else {
            const filename = data[0].data
            console.log(filename)
            for (const file of files) {
                if (file === filename) {
                    return path.join(uploadFolderPath, file)
                }
            }
        }   
    })
}


const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const uploadImage = multer({ storage })

router.post('/updateAccount', uploadImage.single('image'), (req, res) => {
    const password = req.body.password
    const acctID = req.body.acctID
    const imageID = req.body.imageID
    
    const query = 'UPDATE accounts SET password =? WHERE acctID =?'
    const queryImage = 'UPDATE image SET name=?, type=?, data=? WHERE imageID =?'

    db.query(query, [password, acctID], (error, data, fields) => {
        if (error) {
            return res.status(404).send(error)
        }else {
            if (req.file) {
                let { filename, mimetype, originalname } = req.file
    
                const query = 'SELECT * FROM image WHERE imageID =?'
                const uploadFolderPath = './uploads'
                const files = fs.readdirSync(uploadFolderPath)
                
                db.query(query, [imageID], (error, data, fields) => {
                    if (error) {
                        console.log(error)
                    }else {
                        const filenames = data[0].data
                        let pathFile = ''
                        for (const file of files) {
                            if (file === filenames) {
                                pathFile = path.join(uploadFolderPath, file)
                            }
                        }
    
                        if (req.file) {
                         
                            db.query(queryImage, [originalname, mimetype, filename, imageID], (error, data, fields) => {
                            
                                if (error) {
                                    return  console.log(error)
                                }else {
                                    fs.unlink(pathFile, (err) => {
                                        if (err) {
                                            console.log(err)
                                        }else {
                                            console.log(pathFile)
                                            return res.status(200).json({ imagePath: `${filename}` })
                                        }
                                    })
                                }
                            })
                        }else {
                            return res.status(200).json({ message: 'Successfully update the account.' })
                        }
    
    
                    }   
                })  
            }else {
                return res.status(200).json({ message: 'Successfully update the account.' })
            }
        }
    })
    
})

//API ADD ACCOUNT
router.post('/addAccount', uploadImage.single('image'), (req, res) => {
    
    const { acctID, acctype, email, password, firstname, middlename, lastname, status, imageID } = req.body
    const file = req.file

    const query = 'INSERT INTO accounts(acctID, acctype, email, password, firstname, middlename, lastname, status, imageID) VALUES(?,?,?,?,?,?,?,?,?)'
    const queryImage = 'INSERT INTO image(name, type, data, dateUploaded, timeUploaded, acctID, classCode, imageID) VALUES(?,?,?,?,?,?,?,?)'

    db.query(query,[acctID, acctype, email, password, firstname, middlename, lastname, status, imageID], (error, data, fields) => {
        if (error) {
            console.error(error)
            res.status(404).send(error)
        } else {

            if (file) {
                let { filename, mimetype, originalname } = req.file
                const classCode = 'none'
                let currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})
                let currentDate = new Date().toDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric',
                        weekday: 'short' 
                })

                db.query(queryImage, [originalname, mimetype, filename, currentDate, currentTime, acctID, classCode, imageID], (error, data, field) => {
                    if (error) {
                        console.log(error)
                        res.status(404).send(error)
                    }

                    const values = {
                        name: originalname,
                        type: mimetype,
                        data: filename,
                        dateUploaded: currentDate,
                        timeUploaded: currentTime,
                        acctID: acctID,
                        classCode: classCode,
                        imageID: imageID,
                    }

                    res.status(200).json({ message: 'Successfully added account.', obj: values})
                })

            }else {
                 res.status(200).json({ message: 'Successfully added account.' })
            }

           
        }
    })
})



module.exports = router