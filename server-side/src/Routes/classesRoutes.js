const express = require('express')
const router = express.Router()
const db = require('../db')
const multer = require('multer')
const path = require('path')
const fs = require('fs')


router.get('/getClasses', (req, res) => {
    const query = 'SELECT * FROM class'

    db.query(query, (error, data, fields) => {
        if (error) {
            return res.status(404).send(error)
        }else {
            return res.status(200).json(data)
        }
    })

})

router.get('/getClassesByAccount/:acctID', (req, res) => {

    const acctID = req.params.acctID
    const query = `
    SELECT class_list.*, class.*, image.data
    FROM class
    JOIN class_list ON class_list.classCode = class.classCode
    JOIN image ON class.imageID = image.imageID
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

router.put('/hideClass/:id', (req, res) => {
    const id = req.params.id
    const hide = 'true'
    const query = 'UPDATE class_list SET hidden =? WHERE id =?'

    db.query(query, [hide, id], (error, data, fields) => {
        if (error) {
            return res.status(404).send(error)
        }else {
            return res.status(200).json({ message: 'Successfully hide the class.' })
        }
    })

})

router.put('/unhideClass/:id', (req, res) => {
    const id = req.params.id
    const hide = 'false'
    const query = 'UPDATE class_list SET hidden =? WHERE id =?'

    db.query(query, [hide, id], (error, data, fields) => {
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
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storageImage });

router.post('/addClass', upload.single('image'), async (req, res) => {
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
    } = req.body;

    const classQuery = `INSERT INTO class(className,classDesc,classCode,membersID,imageID) VALUES(?,?,?,?,?)`;
    const imageQuery = 'INSERT INTO image(name, type, data, imageID) VALUES(?,?,?,?)';
    const memberQuery = 'INSERT INTO members(membersID, acctID, firstname, middlename, lastname, memberType) VALUES(?,?,?,?,?,?)';
    const classListQuery = 'INSERT INTO class_list(acctID, classCode, hidden, imageID) VALUES(?,?,?,?)';

    try {
        const addClass = new Promise((resolve, reject) => {
            db.query(classQuery, [className, classDesc, classCode, membersID, imageID], (error, data) => {
                if (error) {
                    console.log(error)
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });

        const addMember = new Promise((resolve, reject) => {
            db.query(memberQuery, [membersID, acctID, firstname, middlename, lastname, memberType, imageID], (error, data) => {
                if (error) {
                    console.log(error)
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });

        const addClassList = new Promise((resolve, reject) => {
            db.query(classListQuery, [acctID, classCode, hidden, imageID], (error, data) => {
                if (error) {
                    console.log(error)
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });

        const imageData = req.file 
            ? [req.file.filename, req.file.mimetype, req.file.originalname, imageID]
            : ['default', 'image/jpeg', 'none', imageID];
            
        const addImage = new Promise((resolve, reject) => {
            db.query(imageQuery, imageData, (error, data) => {
                if (error) {
                    console.log(error)
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });

        await Promise.all([addClass, addMember, addClassList, addImage]);

        res.status(200).json({ message: 'Successfully added class.' });
    } catch (error) {
        console.error('Error: ', error);
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




module.exports = router