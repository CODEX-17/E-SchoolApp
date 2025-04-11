const express = require('express')
const router = express.Router()
const db = require('../db')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

//generates a unique identifier
const generateUniqueId = () => {
    return uuidv4();
};


router.get('/getClasses', (req, res) => {
    const query = 'SELECT * FROM class'

    db.query(query, (error, data, fields) => {
        if (error) {
            return res.status(404).send({ message: error.message })
        }else {
            return res.status(200).json(data)
        }
    })

})

router.get('/getClassesByAccount/:acctID', (req, res) => {

    const acctID = req.params.acctID
    const query = `
    SELECT 
        class_list.*, 
        class.classID, 
        class.className, 
        class.classDesc, 
        class.fileID
    FROM class_list
    JOIN class ON class_list.classCode = class.classCode
    WHERE class_list.acctID =? `

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

router.patch('/updateClassVisibility', (req, res) => {
   
    const { id, status } = req.body

    const query = 'UPDATE class_list SET hidden =? WHERE id =?'

    db.query(query, [status, id], (error, data, fields) => {
        if (error) {
            return res.status(404).send(error)
        }else {
            return res.status(200).json({ message: `Successfully ${status ? 'hide' : 'unhide'} the class.` })
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

router.post('/addClass', upload.single('file'), async (req, res) => {
    const { className, classDesc, classCode, acctID } = req.body;

    const fileID = req.file ? generateUniqueId() : 'default';

    const classQuery = `INSERT INTO class(className, classDesc, classCode, fileID) VALUES(?, ?, ?, ?)`;
    const classListQuery = `INSERT INTO class_list(acctID, classCode, hidden, memberType) VALUES(?,?,?,'admin')`;
    const fileQuery = `INSERT INTO files(name, type, data, dateUploaded, timeUploaded, acctID, fileID) VALUES(?, ?, ?, CURDATE(), CURTIME(), ?, ?)`;

    try {
        // Insert class
        await new Promise((resolve, reject) => {
            db.query(classQuery, [className, classDesc, classCode, fileID], (error) => {
                if (error) {
                    console.error('Error inserting class:', error);
                    reject(error);
                } else {
                    console.log('Class inserted successfully.');
                    resolve();
                }
            });
        });

        // Insert class list
        await new Promise((resolve, reject) => {
            db.query(classListQuery, [acctID, classCode, false], (error) => {
                if (error) {
                    console.error('Error inserting class list:', error);
                    reject(error);
                } else {
                    console.log('Class list inserted successfully.');
                    resolve();
                }
            });
        });

        // Insert file if it exists
        if (req.file) {
            const fileData = [req.file.filename, req.file.mimetype, req.file.originalname, acctID, fileID];

            await new Promise((resolve, reject) => {
                db.query(fileQuery, fileData, (error) => {
                    if (error) {
                        console.error('Error inserting file:', error);
                        reject(error);
                    } else {
                        console.log('File inserted successfully.');
                        resolve();
                    }
                });
            });
        }

        res.status(200).json({ message: 'Successfully added class.' });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Failed to add the class.' });
    }
});


router.post('/updateClass', upload.single('image'), async (req, res) => {
    const { classCode, className, classDesc, oldClassCode, imageID } = req.body;

    const queryClassUpdate = 'UPDATE class SET className=?, classDesc=?, classCode=? WHERE classCode=?';
    const queryImageUpdate = 'UPDATE image SET name=?, type=?, data=? WHERE imageID =?';
    const queryClassListUpdate = 'UPDATE class_list SET classCode=? WHERE classCode=?';
    const querySelectImage = 'SELECT * FROM image WHERE imageID =?';

    try {
        // Update class details
        await new Promise((resolve, reject) => {
            db.query(queryClassUpdate, [className, classDesc, classCode, oldClassCode], (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });

        if (req.file) {
            let { filename, mimetype, originalname } = req.file;

            // Get old image details
            const oldImageData = await new Promise((resolve, reject) => {
                db.query(querySelectImage, [imageID], (error, data) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data[0]);
                    }
                });
            });

            // Update image details
            await new Promise((resolve, reject) => {
                db.query(queryImageUpdate, [originalname, mimetype, filename, imageID], (error, data) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data);
                    }
                });
            });

            // Delete old image file
            const oldFilePath = path.join('./uploads', oldImageData.data);
            if (fs.existsSync(oldFilePath)) {
                fs.unlinkSync(oldFilePath);
            }
        }

        // Update class list
        await new Promise((resolve, reject) => {
            db.query(queryClassListUpdate, [classCode, oldClassCode], (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });

        res.status(200).json({ message: 'Successfully updated the class.' });

    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ message: 'Failed to update the class.' });
    }
});

router.post('/joinClassByClassCode', (req, res) => {

    const { classCode, acctID } = req.body

    const queryClassList = `INSERT INTO class_list(acctID, classCode, hidden, memberType) VALUES(?,?,?,?)`

    db.query(queryClassList, [acctID, classCode, false, 'member'], (error, data) => {
        if (error) {
            console.error('Error inserting  class_list: ', error);
            res.status(500).json({ message: 'Failed to join in the class.'})
        } else {
            console.log('Successfully join in the class.');
            res.status(200).json({ message: 'Successfully join in the class.'})
        }
    })

    
})




module.exports = router