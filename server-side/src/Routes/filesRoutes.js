const express = require('express')
const router = express.Router()
const db = require('../db')
const multer = require('multer')
const path = require('path')

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

    // If no uploaded docs
    if (files.length === 0) {
        console.log('no files to upload')
    }

    //Process each uploaded file
    files.forEach((file) => {
        const { filename, mimetype, originalname } = file;
    
        const query = 'INSERT INTO files(name, type, data, fileID) VALUES(?,?,?,?)'

        db.query(query, [originalname, mimetype, filename, fileID], (error, data, fields) => {
            if (error) {
                console.log(error);
                return res.status(500).send("Error inserting docs into the database.")
            }
        })
    })

    res.status(200).json({ message: 'Successfully added docs.' })
    
})

module.exports = router