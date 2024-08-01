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
const messageRoutes = require('./Routes/messageRoutes')
const notificationRoutes = require('./Routes/notificationRoutes')
const questionBankRoutes = require('./Routes/questionBank')



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
})

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
app.use('/message', messageRoutes)
app.use('/notification', notificationRoutes)
app.use('/questionBank', questionBankRoutes)


// const date = new Date(2024, 6, 19, 16, 47, 0);
// const date1 = new Date(2024, 6, 19, 16, 48, 0);

// const arrayDate = [date, date1]

// for (let i = 0; i < arrayDate.length; i++) {
//     schedule.scheduleJob(arrayDate[i], function(){
//         console.log('executed' + i);
//     });
// }





let onlineList = []
let currentAcctId = ''
let schedulesList = []
let jobsList = []


io.on('connection', (socket) => {

      console.log('user connected', onlineList)

      //Convert date from database into valid format
      const convertToDateObject = (dateStr, timeStr) => {
        const [dayOfWeek, month, day, year] = dateStr.split(' ');
        const [time, period] = timeStr.split(' ');
        const [hours, minutes] = time.split(':');
        
        const monthIndex = new Date(`${month} 1, 2000`).getMonth(); // Get the month index from month name
        let hours24 = parseInt(hours, 10);
      
        // Convert to 24-hour format
        if (period === 'PM' && hours24 !== 12) {
          hours24 += 12;
        } else if (period === 'AM' && hours24 === 12) {
          hours24 = 0;
        }
      
        return new Date(year, monthIndex, day, hours24, minutes, 0);
      }
      
      //Get all schedules in database
      const getSchedule = () => {
          const query = "SELECT schedule.*, post.* FROM schedule INNER JOIN post ON schedule.schedID = post.schedID"
          db.query(query, (error, data, field) => {
              if (error) {
                 console.log(error)
              }
            
      
              let dateList = []
      
              for (let i = 0; i < data.length; i++) {

                  const roomID = data[i].classCode
                  const post = {
                    postID: data[i].postID,
                    acctID: data[i].acctID,
                    name: data[i].name,
                    timePosted: data[i].schedTime,
                    datePosted: data[i].schedDate,
                    postContent: data[i].postContent,
                    replyID: data[i].replyID,
                    imageID: data[i].imageID,
                    file: data[i].fileID,
                    heartCount: data[i].heartCount,
                    likeCount: data[i].likeCount,
                    classCode: data[i].classCode,
                    subjectName: data[i].subjectName,
                    postType: 'normal',
                    quizID: data[i].quizID,
                    schedID: 'none',
                    duration: data[i].duration,
                    random: data[i].random,
                  }

                  const schedDate = convertToDateObject(data[i].schedDate, data[i].schedTime)
                  const dueDate = convertToDateObject(data[i].dueDate, data[i].dueTime)
                  const closeDate = convertToDateObject(data[i].closeDate, data[i].closeTime)

                  const schedID = data[i].schedID

                  ///JOB FOR SCHEDULE
                  schedule.scheduleJob(schedDate, function(){
                      console.log('SCHEDULE' + schedDate);
                      console.log('roomID', roomID)
                      
                      const timePosted = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})
                      const datePosted = new Date().toDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric',
                        weekday: 'short' 
                      })

                      
                      //QUERY TO UPDATE POST TABLE
                      const query = "UPDATE post SET timePosted=?, datePosted=?, schedStatus='no' WHERE schedID=?"
                      db.query(query,[timePosted, datePosted, schedID], (error, data, field) => {
                        if (error) {
                            console.log(error)
                        }

                        io.to(roomID).emit('receivedSchedPost', 'Succefully posted.')
                        
                        })

                });


                ///JOB FOR SCHEDULE
                  schedule.scheduleJob(dueDate, function(){
                      console.log('dueDate' + dueDate);

                      //QUERY TO UPDATE POST TABLE
                      const query = "UPDATE post SET dueStatus='yes' WHERE schedID=?"
                      db.query(query,[schedID], (error, data, field) => {
                        if (error) {
                            console.log(error)
                        }

                        io.to(roomID).emit('receivedSchedPost', 'Due respose.')
                        
                        })

                  });
      
                  schedule.scheduleJob(closeDate, function(){
                      console.log('closeDate' + closeDate);
                     
                      //QUERY TO UPDATE POST TABLE
                      const query = "UPDATE post SET dueStatus='no', closeStatus='yes' WHERE schedID=?"
                      db.query(query,[schedID], (error, data, field) => {
                        if (error) {
                            console.log(error)
                        }
                        
                            //QUERY TO DELETE SCHEDULE
                            const querySched = "DELETE FROM schedule WHERE schedID=?"
                            db.query(querySched,[schedID], (error, data, field) => {
                                if (error) {
                                    console.log(error)
                                }

                                io.to(roomID).emit('receivedSchedPost', 'closed respose.')

                            })

                        })
                        
                   });
      
                  dateList.push(schedDate)
                  dateList.push(dueDate)
                  dateList.push(closeDate)
              }
      
              return dateList
          })
      }

    let schedules = getSchedule()

    //Update client-side post variable
    socket.on('UpdatePost', (roomID) => {
        io.to(roomID).emit('receivedSchedPost', 'closed respose.')
    })

    
    socket.emit('onlinePerson', { message: 'Message received!' })

    socket.emit('getOnlineList', "wehehh!!")

    socket.on('addOnlineList', (data) => {

        console.log('account online: ', data)
        onlineList.push(data)
        currentAcctId = data

        // You can emit a response back to the client if needed
        io.emit('getOnlineList', onlineList)
    });


    //Listen to past the updated Online accts
    socket.on('viewOnline', () => {
        // You can emit a response back to the client if needed
        io.emit('getOnlineList', onlineList)
    });


    //Join Room socket
    socket.on('joinRoom', (roomID) => {
            socket.join(roomID)
            console.log("user: " + currentAcctId + " has joined in roomID:" + roomID)  
    })


    //Typing socket base in roomID
    socket.on('typing', (roomID) => {
        socket.broadcast.to(roomID).emit('notifTyping', true)
        console.log("typing..")
    })


    //Listen to sendMessage by the sender
    socket.on('sendMessage', (roomID, obj) => {
        io.to(roomID).emit('receivedMessage', obj)
    })

    //Listen to addNotification
    socket.on('addNotification', (roomID, obj) => {
        socket.broadcast.to(roomID).emit('receivedNotification', obj)
    })

  
    //Disconnect User in socket
    socket.on('disconnect', () => {
      io.emit('disconnectAcct', currentAcctId)

      onlineList = onlineList.filter((acctId) => acctId !== currentAcctId)
      
      io.emit('getOnlineList', onlineList)

      console.log('user disconnected', currentAcctId)
    })


})

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


const port = process.env.PORT || 5001

server.listen(port, ()=> {
    console.log('Listening to port: ', port)
})