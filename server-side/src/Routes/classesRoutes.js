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
    } = req.body;

    const classQuery = `
        INSERT INTO class(
            className,
            classDesc,
            classCode,
            membersID,
            imageID,
            hidden
        ) VALUES(?,?,?,?,?,?)`;

    const imageQuery = 'INSERT INTO image(name, type, data, imageID) VALUES(?,?,?,?)';
    const memberQuery = 'INSERT INTO members(membersID, acctID, firstname, middlename, lastname, memberType) VALUES(?,?,?,?,?,?)';
    const classListQuery = 'INSERT INTO class_list(acctID, classCode, hidden) VALUES(?,?,?)';

    db.beginTransaction((err) => {
        if (err) {
            return res.status(500).send(err);
        }

        db.query(classQuery, [className, classDesc, classCode, membersID, imageID, hidden], (error, data, fields) => {
            if (error) {
                return db.rollback(() => {
                    res.status(500).send(error);
                });
            }

            db.query(memberQuery, [membersID, acctID, firstname, middlename, lastname, memberType], (error, data, fields) => {
                if (error) {
                    return db.rollback(() => {
                        res.status(500).send(error);
                    });
                }

                db.query(classListQuery, [acctID, classCode, hidden], (error, data, fields) => {
                    if (error) {
                        return db.rollback(() => {
                            res.status(500).send(error);
                        });
                    }

                    if (req.file) {
                        const { filename, mimetype, originalname } = req.file;

                        db.query(imageQuery, [filename, mimetype, originalname, imageID], (error, data, fields) => {
                            if (error) {
                                return db.rollback(() => {
                                    res.status(500).send(error);
                                });
                            }

                            db.commit((err) => {
                                if (err) {
                                    return db.rollback(() => {
                                        res.status(500).send(err);
                                    });
                                }
                                return res.status(200).json({ message: 'Successfully added class.' });
                            });
                        });
                    } else {
                        db.query(imageQuery, ['default', 'image/jpeg', 'none', imageID], (error, data, fields) => {
                            if (error) {
                                return db.rollback(() => {
                                    res.status(500).send(error);
                                });
                            }

                            db.commit((err) => {
                                if (err) {
                                    return db.rollback(() => {
                                        res.status(500).send(err);
                                    });
                                }
                                return res.status(200).json({ message: 'Successfully added class.' });
                            });
                        });
                    }
                });
            });
        });
    });
});


router.post('/updateClass', upload.single('image'), (req, res) => {
    const classCode = req.body.classCode
    const className = req.body.className
    const classDesc = req.body.classDesc
    const oldClassCode = req.body.oldClassCode

    console.log(classCode, className, classDesc)

    const query = 'UPDATE class SET className=?, classDesc=?, classCode=? WHERE classCode=?'
    const queryImage = 'UPDATE image SET name=?, type=?, data=? WHERE imageID =?'

    db.query(query, [className, classDesc, classCode, oldClassCode], (error, data, fields) => {
        if (error) {
            return res.status(404).send(error)
        }else{
            if (req.file) {
                let { filename, mimetype, originalname } = req.file
                const imageID = req.body.imageID

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
                                            return res.status(200).json({ message: 'Successfully update the class.' })
                                        }
                                    })
                                }
                            })
                        }else {
                            return res.status(200).json({ message: 'Successfully update the class.' })
                        }
    
    
                    }   
                })  
            }else {
                return res.status(200).json({ message: 'Successfully update the class.' })
            }

        }
    })

})




module.exports = router