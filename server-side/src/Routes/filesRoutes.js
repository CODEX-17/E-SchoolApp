const express = require('express')
const router = express.Router()
const db = require('../db')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

//API get all files
router.get('/getFiles', (req, res) => {
    const query = "SELECT * FROM files"

    db.query(query, (error, data, field) => {
        if (error) {
            console.log(error)
            res.status(404).json(error)
        } else {
            console.log()
            res.status(200).json(data)
        }
    })
})

//API get all files by imageID
router.get('/getFileByFileID/:fileID', (req, res) => {
    const fileID =  req.params.fileID
    const query = "SELECT * FROM files WHERE fileID=?"

    db.query(query, [fileID], (error, data, field) => {
        if (error) {
            console.log('Error in getting file.', error)
            res.status(404).json(error)
        } else {
            console.log('Successfully get file.')
            res.status(200).json(data)
        }
    })
})


//API delete files
router.delete('/deleteFiles', (req, res) => {
    const fileID = req.body.fileID
    const fileNames = req.body.name
    console.log('details:', fileID, fileNames)

    const query = 'DELETE FROM files WHERE fileID =?'

    db.query(query, [fileID], (error, data, field) => {
        if (error) {
            res.status(404).json(error)
        } else {
            const uploadFolderPath = './uploads'
            const deletionErrors = []

            // Loop through image names and delete files
            fileNames.forEach(fileName => {
                const filePath = path.join(uploadFolderPath, fileName);
                
                // Delete file in upload folder
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error(err);
                        deletionErrors.push({ fileName, error: 'Error deleting file.' });
                    } else {
                        console.log(filePath);
                    }
                });
            });

            // After all deletions are attempted, respond
            if (deletionErrors.length > 0) {
                res.status(500).json({ errors: deletionErrors });
            } else {
                res.status(200).json({ message: 'Images successfully deleted.' });
            }
           
        }
    })
})

//API get all files by imageID
router.get('/getAllFilesAndImages/:classCode', (req, res) => {
    const classCode =  req.params.classCode
    const queryImages = "SELECT * FROM image WHERE classCode=?"
    db.query(queryImages, [classCode], (error, data, field) => {
        if (error) {
            res.status(404).json(error)
        } else {
            const imagesList = data
           
            const queryFiles = "SELECT * FROM files WHERE classCode=?"

            db.query(queryFiles, [classCode], (error, data, field) => {
                if (error) {
                    res.status(404).json(error)
                } else {
                    const filesList = imagesList.concat(data)
                    res.status(200).json(filesList)
                }
            })
        }
    })
})

//API get all files by ClassCode
router.get('/getFilesByClassCode/:classCode', (req, res) => {
    const classCode =  req.params.classCode
    const query = "SELECT * FROM files WHERE classCode=?"
    db.query(query,[classCode], (error, data, field) => {
        if (error) {
            res.status(404).json(error)
        } else {
            res.status(200).json(data)
        }
    })
})


// Multer configuration
const fileStorage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, file.fieldname +'_'+ Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: fileStorage })

// API endpoint for adding files
router.post('/addFiles', upload.array('file'), (req, res) => {

    const fileID = req.body.fileID;
    const files = req.files
    const dateUploaded = req.body.dateUploaded
    const timeUploaded = req.body.timeUploaded
    const acctID = req.body.acctID
    const classCode = req.body.classCode

    // If no uploaded docs
    if (files.length === 0) {
        console.log('no files to upload')
    }

    //Process each uploaded file
    files.forEach((file) => {
        const { filename, mimetype, originalname } = file;
    
        const query = 'INSERT INTO files(name, type, data, dateUploaded, timeUploaded, acctID, classCode, fileID) VALUES(?,?,?,?,?,?,?,?)'

        db.query(query, [originalname, mimetype, filename, dateUploaded, timeUploaded, acctID, classCode, fileID], (error, data, fields) => {
            if (error) {
                console.log(error);
                return res.status(500).send("Error inserting docs into the database.")
            }
        })
    })

    res.status(200).json({ message: 'Successfully added docs.' })
    
})

module.exports = router