const express = require('express')
const router = express.Router()
const db = require('../db')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

//API delete images
router.delete('/deleteImage', (req, res) => {
    const imageID = req.body.imageID
    const imageNames = req.body.name

    const query = 'DELETE FROM image WHERE imageID =?'

    db.query(query, [imageID], (error, data, field) => {
        if (error) {
            res.status(404).json(error)
        } else {
            const uploadFolderPath = './uploads'
            const deletionErrors = []

            // Loop through image names and delete files
            imageNames.forEach(imageName => {
                const filePath = path.join(uploadFolderPath, imageName);
                
                // Delete file in upload folder
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error(err);
                        deletionErrors.push({ imageName, error: 'Error deleting image file.' });
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


router.get('/getImages', (req, res)=> {
    const query = 'SELECT * FROM image'

    db.query(query, (error, data, fields) => {
        if (error) {
            return res.status(404).send(error)
        }else {
            return res.status(200).json(data)
        }
    })
})

//Get images by imageID
router.get('/getImagesByImageID/:imageID', (req, res)=> {
    const imageID = req.params.imageID
    const query = 'SELECT * FROM image WHERE imageID =?'

    db.query(query, [imageID], (error, data, fields) => {
        if (error) {
            return res.status(404).send(error)
        }else {
            return res.status(200).json(data)
        }
    })
})

//Get images by classCode
router.get('/getImagesByClassCode/:classCode', (req, res)=> {
    const classCode = req.params.classCode
    const query = 'SELECT * FROM image WHERE classCode =?'

    db.query(query, [classCode], (error, data, fields) => {
        if (error) {
            return res.status(404).send(error)
        }else {
            return res.status(200).json(data)
        }
    })
})

//Get all none value classCode images
router.get('/getAccountImages', (req, res)=> {
    const query = "SELECT * FROM image WHERE classCode='none'"

    db.query(query, (error, data, fields) => {
        if (error) {
            return res.status(404).send(error)
        }else {
            return res.status(200).json(data)
        }
    })
})


const storageImage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storageImage });

router.post('/addImage', upload.array('image'), (req, res) => {
    const imageID = req.body.imageID
    const images = req.files
    const dateUploaded = req.body.dateUploaded
    const timeUploaded = req.body.timeUploaded
    const acctID = req.body.acctID
    const classCode = req.body.classCode

    let data = ''
    let type = ''
    let name = ''

    //If no uploaded image
    if (images.length === 0) {
        console.log('no files to upload')
    }

    //Process each uploaded file
    images.forEach((file) => {
        const { filename, mimetype, originalname } = file;

        data = filename
        type = mimetype
        name = originalname
    
        const query = 'INSERT INTO image(name, type, data, dateUploaded, timeUploaded, acctID, classCode, imageID) VALUES(?,?,?,?,?,?,?,?)'

        db.query(query, [originalname, mimetype, filename, dateUploaded, timeUploaded, acctID, classCode, imageID], (error, data, fields) => {
            if (error) {
                console.log(error);
                return res.status(500).send("Error inserting images into the database.")
            }
        })
    })

    res.status(200).json({ 
        message: 'Successfully added images.'
    })
})




module.exports = router