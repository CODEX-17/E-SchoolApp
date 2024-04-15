const express = require('express')
const router = express.Router()
const db = require('../db')
const multer = require('multer')
const path = require('path')



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

    // If no uploaded image
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