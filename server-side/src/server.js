const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
const multer = require('multer')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const http = require('http')
const socketIO = require('socket.io')
const schedule = require('node-schedule')
const later = require('later');
const Agenda = require('agenda');
const agenda = new Agenda();

const classesRoutes = require('./Routes/classesRoutes')
const accountsRoutes = require('./Routes/accountsRoutes')
const imagesRoutes = require('./Routes/imagesRoutes')
const postRoutes = require('./Routes/postRoutes')
const reactsRoutes = require('./Routes/reactsRoutes')
const filesRoutes = require('./Routes/filesRoutes')
const commentRoutes = require('./Routes/commentRoutes')
const membersRoutes = require('./Routes/membersRoutes')
const classListRoutes = require('./Routes/classListRoutes')
const friendsRoutes = require('./Routes/friendsRoutes')
const quizRoutes = require('./Routes/quizRoutes')
const scoresRoutes = require('./Routes/scoresRoutes')
const questionsRoutes = require('./Routes/questionRoutes')
const choicesRoutes = require('./Routes/choicesRoutes')
const fillLayoutRoutes = require('./Routes/fillLayoutRoutes')
const scheduleRoutes = require('./Routes/scheduleRoutes')
const subjectRoutes = require('./Routes/subjectsRoutes')



const corsOptions = {
    origin: '*', 
    credentials: true,
}

//middleware//
const app = express()
app.use(express.json())
app.use(cors())
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('uploads'))
const server = http.createServer(app)
const io = socketIO(server, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'e-school-app'
})

app.use('/classes', classesRoutes)
app.use('/accounts', accountsRoutes)
app.use('/images', imagesRoutes)
app.use('/post', postRoutes)
app.use('/reacts', reactsRoutes)
app.use('/files', filesRoutes)
app.use('/comments', commentRoutes)
app.use('/members', membersRoutes)
app.use('/classLists', classListRoutes)
app.use('/friends', friendsRoutes)
app.use('/quiz', quizRoutes)
app.use('/scores', scoresRoutes)
app.use('/questions', questionsRoutes)
app.use('/choices', choicesRoutes)
app.use('/fillLayout', fillLayoutRoutes)
app.use('/schedule', scheduleRoutes)
app.use('/subject', subjectRoutes)



const getSchedule = () => {
    const query = "SELECT * FROM schedule"
    db.query(query, (error, data, field) => {
        if (error) {
           console.log(error)
        } else {
            schedulesList = data
        }
    })
}

let onlineList = []
let currentAcctId = ''
let schedules = getSchedule()
let schedulesList = []
let jobsList = []



// io.on('connection', (socket) => {

//     io.emit('onlinePerson', true)

//     const date = new Date(2023, 11, 31, 18, 48, 0)
//     const currentDate = new Date()
//     let scheduleDates = []

//     for (let i = 0; i < schedulesList.length; i++) {

//         const schedDate = schedulesList[i].schedDate
//         const schedTime = schedulesList[i].schedTime
//         const dueDate = schedulesList[i].dueDate
//         const dueTime = schedulesList[i].dueTime
//         const closeDate = schedulesList[i].closeDate
//         const closeTime = schedulesList[i].closeTime

//         const currecntSched = new Date(
//             schedDate.substring(0, 4),
//             parseInt(schedDate.substring(6, 7) - 1),
//             schedDate.substring(9, 10),
//             schedTime.substring(0, 2),
//             schedTime.substring(3, 5),
//             0
//         )

//         if (currecntSched > currentDate) {
//             console.log(currecntSched)
//             scheduleDates.push(currecntSched)
//         }else {
//             continue
//         }

        
//     }

//     for (let i = 0; i < scheduleDates.length; i++) {

//        jobsList.push(
//         schedule.scheduleJob(scheduleDates[i], function(){
//             console.log('post: '+schedulesList[i].schedID)
//         })
//        )
        
//     }

//     socket.on('insertOnline', (acctID) => {
//         currentAcctId = acctID
//         onlineList.push(acctID)
//         io.emit('sendOnlineList', onlineList)
//     })

//     socket.on('schedulePost', (sched, data) => {
//         const { schedDate, schedTime } = sched
        
//         const [year, month, day] = schedDate.split('-').map(Number);
//         const [hour, minute] = schedTime.split(':').map(Number);

//         const date = new Date(year, month - 1, day, hour, minute, 0);
//         const dateorig = new Date(2024, 0, 24, 22, 50, 0);

//         console.log('date', date)
//         console.log('dateorig', dateorig)
        
//         const job = schedule.scheduleJob(date, function(){
//             io.emit('postNow', data)
//             console.log('nice')
//             console.log('data', data)
//         });

        
//     })


//     let scoresList = []

//     socket.on('joinQuiz', (room) => {
//         socket.join(room)
//         console.log('joined')
//     })
    
//     socket.on('score', (obj) => {
//         const { room } = obj
//         socket.join(room)
//         scoresList.push(obj)
//         console.log(obj)
//         io.emit('leaderboard', obj)
//         //io.emit('leaderboard', obj)
//     })

//     socket.on('online', (acctID) => {
//         currentAcctId = acctID
//         onlineList.push(acctID)
//         io.emit('onlinePerson', onlineList)
//     })

//     socket.on('addOnlinePerson', (acctID) => {
//         onlineList.push(acctID)
//         const removeDuplicate = [...new Set(onlineList)];
//         onlineList = removeDuplicate
//         console.log(onlineList)
//     })

//     socket.on('typing', (room, data) => {
//         socket.join(room)
//         io.to(room).emit('isTyping', data)
//     })

//     socket.on('testingJoin', (roomID, name) => {
//         socket.join(roomID)
//         io.emit('testingJoined', name)
//     });

//     socket.on('joinRoom', (room, name) => {
//         socket.join(room)
//         io.emit('joinedRoom', name+' you have been joined in ROOM:'+room)
//     });

//     socket.on('testingMessage', (room, message) => {
//         socket.join(room)
//         io.to(room).emit('testingReceived', message)
//     });

//     socket.on('sendMessage', (room, dataObj) => {
//        socket.join(room)
//        io.to(room).emit('mess', dataObj)
//        console.log(room, dataObj)
//     });

//     socket.on('disconnect', () => {
//         const restActived = onlineList.filter((online) => online !== currentAcctId)
//     });
// })


   


// database connection//


// get accounts//
app.get('/getAccount', (req, res) => {
    const query = "SELECT * FROM accounts"
    db.query(query, (error, data, field) => {
        if (error) {
            res.json(error)
        } else {
            res.json(data)
        }
    })
})

app.get('/getSchedule', (req, res) => {
    const query = "SELECT * FROM schedule"
    db.query(query, (error, data, field) => {
        if (error) {
            res.json(error)
        } else {
            res.json(data)
        }
    })
})

app.get('/getMembers', (req, res) => {
    const query = "SELECT * FROM members"
    db.query(query, (error, data, field) => {
        if (error) {
            res.json(error)
        } else {
            res.json(data)
        }
    })
})

app.get('/getMessages', (req, res) => {
    const query = "SELECT * FROM messages"
    db.query(query, (error, data, field) => {
        if (error) {
            res.json(error)
        } else {
            res.json(data)
        }
    })
})

app.get('/getFriend', (req, res) => {
    const query = "SELECT * FROM friends"
    db.query(query, (error, data, field) => {
        if (error) {
            res.json(error)
        } else {
            res.json(data)
        }
    })
})


app.get('/getAcctById/:id', (req, res) => {
    const id = req.params.id
    const query = "SELECT * FROM accounts WHERE acctID =?"
    db.query(query, (error, data, field) => {
        if (error) {
            res.json(error)
        } else {
            res.json(data)
        }
    })
})

app.get('/getQuiz', (req, res) => {
    const query = "SELECT * FROM quiz"
    db.query(query, (error, data, field) => {
        if (error) {
            res.json(error)
        } else {
            res.json(data)
        }
    })
})

app.get('/getScore', (req, res) => {
    const query = "SELECT * FROM scores"
    db.query(query, (error, data, field) => {
        if (error) {
            res.json(error)
        } else {
            res.json(data)
        }
    })
})


app.get('/getBank', (req, res) => {
    const query = "SELECT * FROM questionbank"
    db.query(query, (error, data, field) => {
        if (error) {
            res.json(error)
        } else {
            res.json(data)
        }
    })
})



// update status from account (login:logout)//
app.put('/status/:id', (req, res) => {
    const id = req.params.id
    const status = req.body.status

    console.log(status, id)
    
    const query = "UPDATE accounts SET status =? WHERE id =?"

    db.query(query, [status, id], (error, data, field) => {
        if (error) {
            res.json(error)
        } else {
            res.json({
                message: 'Account status updated!'
            })
        }
    })
})



app.put('/deleteMembers', (req, res) => {
    const acctID = req.body.acctID

    const query = "DELETE FROM members WHERE acctID =?"

    db.query(query, [acctID], (error, data, field) => {
        if (error) {
            res.json(error)
        } else {
            res.json({
                message: 'member succefully removed!'
            })
        }
    })
})

app.post('/deleteReactions', (req, res) => {
    const reactID = req.body.reactID

    const query = "DELETE FROM reactions WHERE reactID =?"

    db.query(query, [reactID], (error, data, field) => {
        if (error) {
            res.json(error)
        } else {
            res.json({
                message: 'reactions succefully removed!'
            })
        }
    })
})


app.post('/deleteComments', (req, res) => {
    const commentID = req.body.commentID

    const query = "DELETE FROM comments WHERE commentID =?"

    db.query(query, [commentID], (error, data, field) => {
        if (error) {
            res.json(error)
        } else {
            res.json({
                message: 'comment succefully removed!'
            })
        }
    })
})

app.post('/updateAccounts', (req, res) => {
    const data = req.body.obj
    const acctID = data.acctID
    const acctype = data.acctype
    const email = data.email
    const password = data.password
    const firstname = data.firstname 
    const middlename = data.middlename
    const lastname = data.lastname
    const status = data.status
    const imageID = data.imageID

    console.log(data)

    const query = "UPDATE accounts SET acctID=?, acctype=?, email=?, password=?, firstname=?, middlename=?, lastname=?, status=?, imageID=? WHERE acctID=?";

    db.query(query, [acctID, acctype, email, password, firstname, middlename, lastname, status, imageID, acctID], (error, data, field) => {
        if (error) {
            res.json(error)
        } else {
            res.json({
                message: 'accounts succefully removed!'
            })
        }
    })
})

app.put('/updateClass', (req, res) => {
    const data = req.body.obj
    const className = data.className
    const classDesc = data.classDesc
    const classCode = data.classCode
    const membersID = data.membersID
    const imageID = data.imageID
    const hidden = data.hidden

    const query = "UPDATE class SET className=?, classDesc=?, classCode=?, membersID=?, imageID=?, hidden=?  WHERE classCode =?"

    db.query(query, [className, classDesc, classCode, membersID, imageID, hidden, classCode], (error, data, field) => {
        if (error) {
            res.json(error)
        } else {
            res.json({
                message: 'class succefully removed!'
            })
        }
    })
})

app.put('/updateFriend', (req, res) => {
    const data = req.body.obj
    const id  = data.id 
    const acctID = data.acctID
    const friendAcctID = data.friendAcctID
    const fullname = data.fullname

    const query = "UPDATE friends SET id=?, acctID=?, friendAcctID=?, fullname=? WHERE id=?"

    db.query(query, [id , acctID, friendAcctID, fullname, id], (error, data, field) => {
        if (error) {
            res.json(error)
        } else {
            res.json({
                message: 'friend succefully removed!'
            })
        }
    })
})

app.put('/updateMember', (req, res) => {
    const data = req.body.obj
    const ID  = data.ID 
    const membersID = data.membersID
    const acctID = data.acctID
    const firstName = data.firstName
    const midleName  = data.midleName 
    const lastName = data.lastName
    const memberType = data.memberType
    const hidden = data.hidden

    const query = "UPDATE members SET ID=?, membersID=?, acctID=?, firstName=?, midleName=?, lastName=?, memberType=?, hidden=? WHERE ID=?"

    db.query(query, [ID , membersID, acctID, firstName, midleName, lastName, memberType, hidden, ID], (error, data, field) => {
        if (error) {
            res.json(error)
        } else {
            res.json({
                message: 'member succefully removed!'
            })
        }
    })
})

app.put('/updatePost', (req, res) => {
    const data = req.body.obj
    const id  = data.id 
    const postID = data.postID
    const acctID = data.acctID
    const name = data.name
    const timePosted  = data.timePosted 
    const datePosted = data.datePosted
    const postContent = data.postContent
    const replyID = data.replyID
    const imageID  = data.imageID 
    const fileID = data.fileID
    const heartCount = data.heartCount
    const likeCount = data.likeCount
    const classCode  = data.classCode 
    const subjectName = data.subjectName
    const postType = data.postType
    const quizID = data.quizID
    const schedID = data.schedID
    const duration = data.duration
    const random = data.random

    const query = "UPDATE post SET id  =?, postID=?, acctID=?, timePosted=?, datePosted	=?, postContent=?, replyID=?, imageID=?, fileID=? ,heartCount=? ,likeCount=? ,classCode=? ,subjectName=? ,postType=? ,quizID=? ,schedID=? ,duration=? ,random=? WHERE id  =?"

    db.query(query, [id , postID, acctID, name, timePosted, datePosted, postContent, replyID, imageID, fileID, heartCount, likeCount, classCode, subjectName, postType, quizID, schedID, duration, random, id], (error, data, field) => {
        if (error) {
            res.json(error)
        } else {
            res.json({
                message: 'member succefully removed!'
            })
        }
    })
})

app.put('/updateSubject', (req, res) => {
    const data = req.body.obj
    const id  = data.id 
    const subjectName = data.subjectName
    const subjectCode = data.subjectCode

    const query = "UPDATE subject SET id  =?, subjectName=?, subjectCode=? WHERE id  =?"

    db.query(query, [id , subjectName, subjectCode, id], (error, data, field) => {
        if (error) {
            res.json(error)
        } else {
            res.json({
                message: 'member succefully removed!'
            })
        }
    })
})

// add question//
app.post('/questions', (req, res) => {
    const questionObj = req.body.dataObj
    const questionID = req.body.id || questionObj.questionID
    const questionNumber = questionObj.questionNumber
    const questionContent = questionObj.questionContent
    const questionType = questionObj.questionType
    const required = questionObj.required
    const keySensitive = questionObj.keySensitive
    const points = questionObj.points
    const questionAnswerText = questionObj.questionAnswerText
    const numberOfAns = questionObj.numberOfAns
    const choicesID = questionObj.choicesID
    const imageID = questionObj.imageID
    const fillLayoutID = questionObj.fillLayoutID
    const subjectName = questionObj.subjectName

    console.log(questionObj)

    const query = "INSERT INTO questions (questionID, questionNumber, questionContent, questionType, points, required, keySensitive, questionAnswerText, numberOfAns, choicesID, imageID, fillLayoutID, subjectName) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)"

    db.query(query, [questionID, questionNumber, questionContent, questionType, points, required, keySensitive, questionAnswerText, numberOfAns, choicesID, imageID, fillLayoutID, subjectName], (error, data, field) => {
        if (error) {
            res.json(error)
        }else {
            res.json({
                message: 'Question added!'
            })
        }
    })

})

//add comments//
app.post('/addComments', (req, res) => {
    const data = req.body.obj
    const commentID = data.commentID
    const postID = data.postID
    const acctID = data.acctID
    const content = data.content
    const time = data.time
    const date = data.date
    const fileID = data.fileID
    const imageID = data.imageID

    const query = "INSERT INTO comments (commentID ,postID, acctID, content, time, date, fileID, imageID) VALUES (?,?,?,?,?,?,?,?)"

    db.query(query, [commentID, postID, acctID, content, time, date, fileID, imageID], (error, data, field) => {
        if (error) {
            res.json(error)
        }else {
            res.json({
                message: 'Comment added!'
            })
        }
    })

})

// add choices//
app.post('/choices', (req, res) => {
        const choicesObj = req.body.dataObj
        const choicesID = choicesObj.choicesID
        const letter = choicesObj.letter
        const content = choicesObj.content
        const correct = choicesObj.correct

        const query = "INSERT INTO choices (choicesID, letter, content, correct) VALUES (?,?,?,?)"
   
        db.query(query, [choicesID, letter, content, correct], (error, data, field) => {
            if (error) {
                res.json(error)
            }else {
                res.json({
                    message: 'Choices added!'
                })
            }
        })    
})

app.post('/addReactions', (req, res) => {
    const data = req.body.obj
    const reactID = data.reactID
    const postID = data.postID
    const acctID = data.acctID
    const reactType = data.reactType

    const query = "INSERT INTO reactions (reactID, postID, acctID, reactType) VALUES (?,?,?,?)"

    db.query(query, [reactID, postID, acctID, reactType], (error, data, field) => {
        if (error) {
            res.json(error)
        }else {
            res.json({
                message: 'Reactions added!'
            })
        }
    })    
})

app.post('/addAccounts', (req, res) => {
    const data = req.body.obj
    const acctID = data.acctID
    const acctype = data.acctype
    const email = data.email
    const password = data.password
    const firstname = data.firstname
    const middlename = data.middlename
    const lastname = data.lastname
    const status = data.status
    const imageID = data.imageID
    
    console.log(acctID, acctype, email, password, firstname, middlename, lastname, status, imageID)

    const query = "INSERT INTO accounts (acctID, acctype, email, password, firstname, middlename, lastname, status, imageID) VALUES (?,?,?,?,?,?,?,?,?)"

    db.query(query, [acctID, acctype, email, password, firstname, middlename, lastname, status, imageID], (error, data, field) => {
        if (error) {
            res.json(error)
        }else {
            res.json({
                message: 'Account added!'
            })
        }
    })    
})

app.post('/addChoices', (req, res) => {
    const data = req.body.obj
    const choicesID = data.choicesID
    const letter = data.letter
    const content = data.content
    const correct = data.correct
    
    console.log(choicesID, letter, content, correct)

    const query = "INSERT INTO choices (choicesID, letter, content, correct) VALUES (?,?,?,?)"

    db.query(query, [choicesID, letter, content, correct], (error, data, field) => {
        if (error) {
            res.json(error)
        }else {
            res.json({
                message: 'Choices added!'
            })
        }
    })    
})

app.post('/addClasses', (req, res) => {
    const data = req.body.obj
    const classID = data.classID
    const className = data.className
    const classDesc = data.classDesc
    const classCode = data.classCode
    const membersID = data.membersID
    const imageID = data.imageID
    const hidden = data.hidden
    
    console.log(classID, className, classDesc, classCode, membersID, imageID, hidden)

    const query = "INSERT INTO class (classID, className, classDesc, classCode, membersID, imageID, hidden) VALUES (?,?,?,?,?,?,?)"

    db.query(query, [classID, className, classDesc, classCode, membersID, imageID, hidden], (error, data, field) => {
        if (error) {
            res.json(error)
        }else {
            res.json({
                message: 'Class added!'
            })
        }
    })    
})

app.post('/addFiles', (req, res) => {
    const datas = req.body.obj
    const name = datas.name
    const type = datas.type
    const data = datas.data
    const fileID = datas.fileID
    
    console.log(classID, className, classDesc, classCode, membersID, imageID, hidden)

    const query = "INSERT INTO files (name, type, data, fileID) VALUES (?,?,?,?)"

    db.query(query, [name, type, data, fileID], (error, data, field) => {
        if (error) {
            res.json(error)
        }else {
            res.json({
                message: 'Files added!'
            })
        }
    })    
})

app.post('/addFillLayout', (req, res) => {
    const datas = req.body.obj

    const fillContent = datas.fillContent
    const fillType = datas.fillType
    const fillPosition = datas.fillPosition
    const fillLayoutID = datas.fillLayoutID
    

    const query = "INSERT INTO filllayout (fillContent, fillType, fillPosition, fillLayoutID) VALUES (?,?,?,?)"

    db.query(query, [fillContent, fillType, fillPosition, fillLayoutID], (error, data, field) => {
        if (error) {
            res.json(error)
        }else {
            res.json({
                message: 'Files added!'
            })
        }
    })    
})


app.post('/addBank', (req, res) => {
    const bank = req.body.obj
    const bankID = bank.bankID
    const bankTitle = bank.bankTitle
    const subjectName = bank.subjectName
    const questionID = bank.questionID
    const totalPoints = bank.totalPoints
    const totalQuestions = bank.totalQuestions
    const time = bank.time
    const date = bank.date

    const query = "INSERT INTO questionbank (bankID, bankTitle, subjectName, questionID, totalPoints, totalQuestions, time, date) VALUES (?,?,?,?,?,?,?,?)"

    db.query(query, [bankID, bankTitle, subjectName, questionID, totalPoints, totalQuestions, time, date], (error, data, field) => {
        if (error) {
            res.json(error)
        }else {
            res.json({
                message: 'questions added into bank!'
            })
        }
    })    
})


app.post('/addFriend', (req, res) => {
    const data = req.body.obj
    const { acctID, friendAcctID, fullname } = data
     
    const query = "INSERT INTO friends (acctID, friendAcctID, fullname) VALUES (?,?,?)"

    db.query(query, [acctID, friendAcctID, fullname], (error, data, field) => {
        if (error) {
            res.json(error)
        }else {
            res.json({
                message: 'Friend added!'
            })
        }
    })    
})

app.post('/addScore', (req, res) => {
    const data = req.body.obj
    const scoreID = data.scoreID
    console.log(data)
    const quizID = data.quizID
    const acctID = data.acctID
    const fullname = data.fullname
    const score = data.score

    const query = "INSERT INTO scores (scoreID, quizID, acctID, fullname, score) VALUES (?,?,?,?,?)"
 
    db.query(query, [scoreID, quizID, acctID, fullname, score], (error, data, field) => {
        if (error) {
            res.json(error)
        }else {
            res.json({
                message: 'Score added!'
            })
        }
    })    
})

app.post('/saveMessages', (req, res) => {
   
    const messageID = req.body.messageID
    const roomID =  req.body.roomID
    const messageContent =  req.body.messageContent
    const messageSender =  req.body.messageSender
    const messageReceiver =  req.body.messageReceiver
    const date =  req.body.date
    const time =  req.body.time

    console.log(date)

    const query = "INSERT INTO messages (messageID, roomID, messageContent, messageSender, messageReceiver, date, time) VALUES (?,?,?,?,?,?,?)"

    db.query(query, [messageID, roomID, messageContent, messageSender, messageReceiver, date, time], (error, data, field) => {
        if (error) {
            res.json(error)
        }else {
            res.json({
                message: 'message added!'
            })
        }
    })    
})

app.post('/quiz', (req, res) => {
    const quizID = req.body.id
    const quizTitle = req.body.quizTitle
    const quizInstructions = req.body.quizInstructions
    const questionID = req.body.id
    const subjectName = req.body.subjectName
    const totalPoints = req.body.totalPoints
    const totalQuestions = req.body.totalQuestions
    const creator = req.body.fullname
    const time = req.body.currentTime
    const date = req.body.currentDate


    const query = "INSERT INTO quiz (quizID, quizTitle, quizInstructions, questionID, subjectName, totalPoints, totalQuestions, creator, time, date) VALUES (?,?,?,?,?,?,?,?,?,?)"

    db.query(query, [quizID, quizTitle, quizInstructions, questionID, subjectName, totalPoints, totalQuestions, creator, time, date], (error, data, field) => {
        if (error) {
            res.json(error)
        }else {
            res.json({
                message: 'quiz added!'
            })
        }
    })    
})




app.get('/getChoices', (req, res) => {
    const query = 'SELECT * FROM choices'

    db.query(query, (error, data, field) => {
        if (error) {
            res.status(404).json(error)
        }else {
            res.status(200).json(data)
        }
    })
})

app.get('/getComments', (req, res) => {
    const query = 'SELECT * FROM comments'

    db.query(query, (error, data, field) => {
        if (error) {
            res.status(404).json(error)
        }else {
            res.status(200).json(data)
        }
    })
})

app.get('/getReactions', (req, res) => {
    const query = 'SELECT * FROM reactions'

    db.query(query, (error, data, field) => {
        if (error) {
            res.status(404).json(error)
        }else {
            res.status(200).json(data)
        }
    })
})

app.post('/deleteAccount', (req, res) => {
    const id = req.body.acctID
    const query = 'DELETE FROM accounts WHERE acctID = ?'

    db.query(query,[id], (error, data, field) => {
        if (error) {
            res.status(404).json(error)
        }else {
            res.status(200).json(data)
        }
    })
})



app.post('/deleteChoices', (req, res) => {
    const id = req.body.id
    const query = 'DELETE FROM choices WHERE id = ?'

    db.query(query,[id], (error, data, field) => {
        if (error) {
            res.status(404).json(error)
        }else {
            res.status(200).json(data)
        }
    })
})

app.post('/deleteFriend', (req, res) => {
    const friendAcctID = req.body.friendAcctID
    const query = 'DELETE FROM friends WHERE friendAcctID = ?'

    db.query(query,[friendAcctID], (error, data, field) => {
        if (error) {
            res.status(404).json(error)
        }else {
            res.status(200).json(data)
        }
    })
})

app.post('/deleteClass', (req, res) => {
    const classID = req.body.classID
    const query = 'DELETE FROM class WHERE classID = ?'

    db.query(query,[classID], (error, data, field) => {
        if (error) {
            res.status(404).json(error)
        }else {
            res.status(200).json(data)
        }
    })
})

app.post('/deleteFillLayout', (req, res) => {
    const id = req.body.id
    const query = 'DELETE FROM filllayout WHERE id = ?'

    db.query(query,[id], (error, data, field) => {
        if (error) {
            res.status(404).json(error)
        }else {
            res.status(200).json(data)
        }
    })
})

app.post('/deleteFiles', (req, res) => {
    const id = req.body.id
    const query = 'DELETE FROM files WHERE id = ?'

    db.query(query,[id], (error, data, field) => {
        if (error) {
            res.status(404).json(error)
        }else {
            res.status(200).json(data)
        }
    })
})

app.post('/deleteImages', (req, res) => {
    const id = req.body.id
    const query = 'DELETE FROM image WHERE id = ?'

    db.query(query,[id], (error, data, field) => {
        if (error) {
            res.status(404).json(error)
        }else {
            res.status(200).json(data)
        }
    })
})

app.post('/deleteMembers', (req, res) => {
    const ID = req.body.ID
    const query = 'DELETE FROM members WHERE ID = ?'

    db.query(query,[ID], (error, data, field) => {
        if (error) {
            res.status(404).json(error)
        }else {
            res.status(200).json(data)
        }
    })
})

app.post('/deleteMessages', (req, res) => {
    const id = req.body.id
    const query = 'DELETE FROM messages WHERE id = ?'

    db.query(query,[id], (error, data, field) => {
        if (error) {
            res.status(404).json(error)
        }else {
            res.status(200).json(data)
        }
    })
})

app.post('/deletePost', (req, res) => {
    const id = req.body.id
    const query = 'DELETE FROM post WHERE id = ?'

    db.query(query,[id], (error, data, field) => {
        if (error) {
            res.status(404).json(error)
        }else {
            res.status(200).json(data)
        }
    })
})

app.post('/deleteQuestions', (req, res) => {
    const id = req.body.id
    const query = 'DELETE FROM questions WHERE id = ?'

    db.query(query,[id], (error, data, field) => {
        if (error) {
            res.status(404).json(error)
        }else {
            res.status(200).json(data)
        }
    })
})

app.post('/deleteQuiz', (req, res) => {
    const quizID = req.body.quizID
    const query = 'DELETE FROM quiz WHERE quizID = ?'

    db.query(query,[quizID], (error, data, field) => {
        if (error) {
            res.status(404).json(error)
        }else {
            res.status(200).json(data)
        }
    })
})

app.post('/deleteSchedule', (req, res) => {
    const id = req.body.id
    const query = 'DELETE FROM schedule WHERE id = ?'

    db.query(query,[id], (error, data, field) => {
        if (error) {
            res.status(404).json(error)
        }else {
            res.status(200).json(data)
        }
    })
})

app.post('/deleteSubject', (req, res) => {
    const id = req.body.id
    const query = 'DELETE FROM subject WHERE id = ?'

    db.query(query,[id], (error, data, field) => {
        if (error) {
            res.status(404).json(error)
        }else {
            res.status(200).json(data)
        }
    })
})

app.get('/getSubjects', (req, res) => {
    const query = 'SELECT * FROM subject'

    db.query(query, (error, data, field) => {
        if (error) {
            res.status(404).json(error)
        }else {
            res.status(200).json(data)
        }
    })
})

// get questions //
app.get('/getQuestion', (req, res) => {
    const query = "SELECT * FROM questions"

    db.query(query, (error, data, field) => {
        if (error) {
            res.json(error)
        }else {
            res.json(data)
        }
    })

})

app.post('/addClass', (req, res) => {
    const classDesc = req.body.classDesc
    const className = req.body.className
    const classCode = req.body.classCode
    const membersID = req.body.membersID
    const imageID = req.body.imageID
    const hidden = 'false'
    const query = "INSERT INTO class (className, classDesc, classCode, membersID, imageID, hidden) VALUES (?,?,?,?,?,?)"
   
    console.log(classDesc, className, membersID, imageID)

    db.query(query,[className, classDesc, classCode, membersID, imageID, hidden], (error, data, field) => {
        if (error) {
            res.json(error)
        }else {
            res.send('successfully added class!')
        }
    })

})

app.post('/fillLayout', (req, res) => {
    const data = req.body.data
    const fillContent = data.fillContent
    const fillType = data.fillType
    const fillPosition = data.fillPosition
    const fillLayoutID = data.fillLayoutID

    console.log()

    const query = "INSERT INTO filllayout (fillContent, fillType, fillPosition, fillLayoutID) VALUES (?,?,?,?)"
   
    db.query(query,[fillContent, fillType, fillPosition, fillLayoutID], (error, data, field) => {
        if (error) {
            res.json(error)
        }else {
            res.send('successfully added fillLayout!')
        }
    })

})

app.get('/getFillLayout', (req, res) => {
    const query = "SELECT * FROM filllayout"

    db.query(query, (error, data, field) => {
        if (error) {
            res.json(error)
        }else {
            res.json(data)
        }
    })

})

app.post('/addFriend', (req, res) => {
    const data = req.body.data
    const acctID = data.acctID
    const friendAcctID = data.friendAcctID
    const fullname = data.fullname

    console.log()

    const query = "INSERT INTO friends (acctID, friendAcctID, fullname) VALUES (?,?,?)"
   
    db.query(query,[acctID, friendAcctID, fullname], (error, data, field) => {
        if (error) {
            res.json(error)
        }else {
            res.send('successfully added fillLayout!')
        }
    })

})

app.post('/addImage', (req, res) => {
    const datas = req.body.data
    const name = datas.name
    const type = datas.type
    const data = datas.data
    const imageID = datas.imageID

    console.log()

    const query = "INSERT INTO image (name, type, data, imageID) VALUES (?,?,?,?)"
   
    db.query(query,[name, type, data, imageID], (error, data, field) => {
        if (error) {
            res.json(error)
        }else {
            res.send('successfully added fillLayout!')
        }
    })

})

app.post('/addMessage', (req, res) => {
    const datas = req.body.data
    const messageID = datas.messageID
    const roomID = datas.roomID
    const messageContent = datas.messageContent
    const messageSender = datas.messageSender
    const messageReceiver = datas.messageReceiver
    const date = datas.date
    const time = datas.time

    console.log()

    const query = "INSERT INTO image (messageID, roomID, messageContent, messageSender, messageReceiver, date, time) VALUES (?,?,?,?,?,?,?)"
   
    db.query(query,[messageID, roomID, messageContent, messageSender, messageReceiver, date], time, (error, data, field) => {
        if (error) {
            res.json(error)
        }else {
            res.send('successfully added fillLayout!')
        }
    })

})

app.post('/addPost', (req, res) => {
    const datas = req.body.data
    const postID = datas.postID
    const acctID = datas.acctID
    const name = datas.name
    const timePosted = datas.timePosted
    const datePosted = datas.datePosted
    const postContent = datas.postContent
    const replyID = datas.replyID
    const imageID = datas.imageID
    const fileID = datas.fileID
    const heartCount = datas.heartCount
    const likeCount = datas.likeCount
    const classCode = datas.classCode
    const subjectName = datas.subjectName
    const postType = datas.postType
    const quizID = datas.quizID
    const schedID = datas.schedID
    const duration = datas.duration
    const random = datas.random

    console.log()

    const query = "INSERT INTO post (postID, acctID, name, timePosted, datePosted, postContent, replyID, imageID, fileID, heartCount, likeCount, classCode, subjectName, postType, quizID, schedID, duration, random) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
   
    db.query(query,[postID, acctID, name, timePosted, datePosted, postContent, replyID, imageID, fileID, heartCount, likeCount, classCode, subjectName, postType, quizID, schedID, duration, random], (error, data, field) => {
        if (error) {
            res.json(error)
        }else {
            res.send('successfully added fillLayout!')
        }
    })

})

app.post('/addQuestion', (req, res) => {
    const datas = req.body.data
    const questionID = datas.questionID
    const questionNumber = datas.questionNumber
    const questionContent = datas.questionContent
    const questionType = datas.questionType
    const points = datas.points
    const required = datas.required
    const keySensitive = datas.keySensitive
    const questionAnswerText = datas.questionAnswerText
    const numberOfAns = datas.numberOfAns
    const choicesID = datas.choicesID
    const imageID = datas.imageID
    const fillLayoutID = datas.fillLayoutID
    const subjectName = datas.subjectName

    console.log()

    const query = "INSERT INTO post (questionID, questionNumber, questionContent, questionType, points, required, keySensitive, questionAnswerText, numberOfAns, choicesID, imageID, fillLayoutID, subjectName) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)"
   
    db.query(query,[questionID, questionNumber, questionContent, questionType, points, required, keySensitive, questionAnswerText, numberOfAns, choicesID, imageID, fillLayoutID, subjectName], (error, data, field) => {
        if (error) {
            res.json(error)
        }else {
            res.send('successfully added fillLayout!')
        }
    })

})

app.post('/addSubject', (req, res) => {
    const datas = req.body.data
    const subjectName = datas.subjectName
    const subjectCode = datas.subjectCode

    console.log()

    const query = "INSERT INTO image (subjectName, subjectCode) VALUES (?,?)"
   
    db.query(query,[subjectName, subjectCode], (error, data, field) => {
        if (error) {
            res.json(error)
        }else {
            res.send('successfully added fillLayout!')
        }
    })

})

app.post('/addschedule', (req, res) => {

    const data = req.body.obj
    const schedID = data.schedID
    const postID = data.postID
    const schedDate = data.schedDate
    const schedTime = data.schedTime
    const dueDate = data.dueDate
    const dueTime = data.dueTime
    const closeDate = data.closeDate
    const closeTime = data.closeTime

    console.log(data)

    const query = "INSERT INTO schedule (schedID, postID, schedDate, schedTime, dueDate, dueTime, closeDate, closeTime) VALUES (?,?,?,?,?,?,?,?)"
   
    db.query(query,[schedID, postID, schedDate, schedTime, dueDate, dueTime, closeDate, closeTime], (error, data, field) => {
        if (error) {
            res.json(error)
        }else {
            res.send('successfully added schedule!')
        }
    })

})

app.post('/addMembers', (req, res) => {
    
    const membersID = req.body.membersID
    const acctID = req.body.acctID
    const firstName =req.body.firstName
    const midleName = req.body.midleName
    const lastName = req.body.lastName
    const memberType = req.body.memberType
    const hidden = 'false'

    const query = "INSERT INTO members (membersID, acctID, firstName, midleName, lastName, memberType, hidden) VALUES (?,?,?,?,?,?,?)"
   
    db.query(query,[membersID, acctID, firstName, midleName, lastName, memberType, hidden], (error, data, field) => {
        if (error) {
            res.json(error)
        }else {
            res.send('successfully added schedule!')
        }
    })

})

app.post('/uploadPost', (req, res) => {

    const postID = req.body.postID
    const acctID = req.body.acctID
    const datePosted = req.body.datePosted
    const fileID = req.body.fileID
    const heartCount = req.body.heartCount
    const imageID = req.body.imageID
    const likeCount = req.body.likeCount
    const name = req.body.name
    const postContent = req.body.postContent
    const replyID = req.body.replyID
    const subjectName = req.body.subjectName
    const timePosted = req.body.timePosted
    const classCode = req.body.classCode
    const postType = req.body.postType
    const quizID = req.body.quizID
    const schedID = req.body.schedID
    const duration = req.body.duration
    const random = req.body.random

    const query = "INSERT INTO post (postID, acctID, name, timePosted, datePosted, postContent, replyID, imageID, fileID, heartCount, likeCount, classCode, subjectName, postType, quizID, schedID, duration, random) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
   
    console.log(random)

    db.query(query,[postID, acctID, name, timePosted, datePosted, postContent, replyID, imageID, fileID, heartCount, likeCount, classCode, subjectName, postType, quizID, schedID, duration, random], (error, data, field) => {
        if (error) {
            res.json(error)
        }else {
            res.send('successfully added post!')
        }
    })

})


app.get('/getPost', (req, res) => {
    const query = "SELECT * FROM post"
    db.query(query, (error, data, field) => {
        if (error) {
            res.json(error)
        } else {
            res.json(data)
        }
    })
})

app.delete('/deletePost/:id', (req, res) => {
    const id = req.params.id
    const query = "DELETE FROM post WHERE id =?"
    db.query(query,[id], (error, data, field) => {
        if (error) {
            res.json(error)
        } else {
            res.send('success deleted post!')
        }
    })
})

app.get('/getClass', (req, res) => {
    const query = "SELECT * FROM class"
    db.query(query, (error, data, field) => {
        if (error) {
            res.json(error)
        } else {
            res.json(data)
        }
    })
})

app.put('/hideClass', (req, res) => {
    const classCode = req.body.classCode
    const state = req.body.state

    const query = "UPDATE class SET hidden =? WHERE classCode =?"

    db.query(query,[state, classCode], (error, data, field) => {
        if (error) {
            res.json(error)
        }else {
            res.send('success update state!')
        }
    })
})

app.put('/updateQuestions', (req, res) => {
    const id = req.body.id
    const questionID = req.body.questionID
    console.log(id, questionID)

    const query = "UPDATE questions SET questionID =? WHERE id =?"

    db.query(query,[questionID, id], (error, data, field) => {
        if (error) {
            res.json(error)
        }else {
            res.send('success update quiz!')
        }
    })
})


const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage })


app.post('/upload', upload.single('image'), (req, res) => {

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
  
    const { originalname, mimetype, filename } = req.file;
    const imageID = req.body.imageID
  
    console.log('File properties:', originalname, mimetype, filename);
    const image = {
      name: originalname,
      type: mimetype,
      data: filename,
      imageID: imageID,
    };
  
    db.query('INSERT INTO image SET ?', image, (err) => {
      if (err) throw err;
      console.log('Image uploaded to the database');
      res.json({ message: 'Image uploaded successfully' });
    });
  });

  app.post('/uploadFile', upload.single('file'), (req, res) => {

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
  
    const { originalname, mimetype, filename } = req.file;
    const fileID = req.body.fileID
  
    console.log('File properties:', originalname, mimetype, filename);
    const file = {
      name: originalname,
      type: mimetype,
      data: filename,
      fileID: fileID,
    };
  
    db.query('INSERT INTO files SET ?', file, (err) => {
      if (err) throw err;
      console.log('file uploaded to the database');
      res.json({ message: 'file uploaded successfully' });
    });
  });
  
  app.get('/ ', (req, res) => {
    db.query('SELECT * FROM image WHERE id = 1', (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        const { data } = result[0]
        const filename = data.toString()
        const imagePath = path.join(__dirname, '../uploads', filename)
        res.sendFile(imagePath);
      } else {
        res.json({ message: 'Image not found' });
      }
    });
  });

  app.get('/getImageByID/:id', (req, res) => {
    const id = req.params.id
    const query = 'SELECT * FROM image WHERE imageID = ?'

    db.query(query,[id], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        const { data } = result[0]
        const filename = data.toString()
        const imagePath = path.join(__dirname, '../uploads', filename)
        res.sendFile(imagePath);
      } else {
        res.json({ message: 'Image not found' });
      }
    });
  });

  app.get('/getALLImages', (req, res) => {
    const query = 'SELECT * FROM image'

    db.query(query, (err, data, result) => {
      if (err) {
        res.json(err)
      } else {
        res.send(data);
      }
    });
  });

  app.get('/getALLfiles', (req, res) => {
    const query = 'SELECT * FROM files'

    db.query(query, (err, data, result) => {
      if (err) {
        res.json(err)
      } else {
        res.send(data);
      }
    });
  });

  app.put('/updateImageAcct', upload.single('image'), (req, res) => {
  
    const query = 'UPDATE image SET name=?, type=?, data=? WHERE imageID =?'
    const { originalname, mimetype, filename } = req.file
    const imageID = req.body.imageID
  
    // console.log('File properties:', originalname, mimetype, filename);
    // console.log(imageID)

    const image = {
      name: originalname,
      type: mimetype,
      data: filename,
      imageID: imageID,
    };
  

    db.query(query,[originalname, mimetype, filename, imageID], (error, data, field) => {
        if (error) {
            res.json(error)
        }else {
            res.send('success update state!')
        }
    })
  })

  app.get('/getImage/:id', (req, res) => {
    const id = req.params.id
    const query = 'SELECT * FROM image WHERE imageID =?'
    db.query(query, [id], (error, data, field) => {
        if (error) {
            res.status(500).send('Internal Server Error')
        }else {
            res.json(data)
        }
    })
  })

  app.put('/updatePassword/:id', (req, res) => {
    const id = req.params.id
    const password = req.body.newPass
    const query = "UPDATE accounts SET password =? WHERE acctID =?"

    db.query(query,[password, id], (error, data, field) => {
        if (error) {
            res.json(error)
        }else {
            res.send('success update state!')
        }
    })
    })



    ////all get 

    app.get('/getAccounts', (req, res) => {
        const query = "SELECT * FROM accounts"
        db.query(query, (error, data, field) => {
            if (error) {
                res.json(error)
            } else {
                res.json(data)
            }
        })
    })

    app.get('/getFiles', (req, res) => {
        const query = 'SELECT * FROM files'
    
        db.query(query, (error, data, field) => {
            if (error) {
                res.status(404).json(error)
            }else {
                res.status(200).json(data)
            }
        })
    })

    app.get('/getFriends', (req, res) => {
        const query = "SELECT * FROM friends"
    
        db.query(query, (error, data, field) => {
            if (error) {
                res.json(error)
            }else {
                res.json(data)
            }
        })
    
    })

    app.get('/getQuestionBank', (req, res) => {
        const query = "SELECT * FROM questionbank"
        db.query(query, (error, data, field) => {
            if (error) {
                res.json(error)
            } else {
                res.json(data)
            }
        })
    })

    app.get('/getQuestions', (req, res) => {
        const query = "SELECT * FROM questions"
        db.query(query, (error, data, field) => {
            if (error) {
                res.json(error)
            } else {
                res.json(data)
            }
        })
    })

    const getScores = () => {
        const query = "SELECT * FROM scores"
        db.query(query, (error, data, field) => {
            if (error) {
               console.log(error)
            } else {
                schedulesList = data
            }
        })
    }

   
  



const port = process.env.PORT || 5001

server.listen(port, ()=> {
    console.log('Listening to port: ', port)
})