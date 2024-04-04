const express = require('express')
const router = express.Router()
const db = require('../db')
const multer = require('multer')
const upload = multer()
const fs = require('fs')
const path = require('path')

router.post('/verifyAccount', (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const query = 'SELECT * FROM accounts WHERE email=? && password=?'

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
                                            return res.status(200).json({ message: 'Successfully update the account.' })
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




module.exports = router