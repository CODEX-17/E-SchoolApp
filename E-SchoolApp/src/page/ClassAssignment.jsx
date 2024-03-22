import React, { useEffect, useState } from 'react'
import style from './ClassAssignment.module.css'
import { BsCalendar3 } from "react-icons/bs";
import { IoTimeOutline } from "react-icons/io5";
import { GoStar } from "react-icons/go";
import { IoIosSend } from "react-icons/io";
import { SlNotebook } from "react-icons/sl";
import { RiContrastDropLine } from 'react-icons/ri';
import notifSound from '../assets/sound/notif.mp3';
import erroSound from '../assets/sound/error.mp3'; 
import { Howl, Howler } from "howler";
import { ToastContainer, toast } from 'react-toastify';
import { useScheduleStore } from '../stores/useScheduleStore';
import io from 'socket.io-client'
const socket = io.connect('http://localhost:5001')


const ClassAssignment = ({ postType, quizObj, handlePostAssignment }) => {

  const currentPostType = postType? postType : 'schedule'
  const currentQuizObj = quizObj
  const currentQuizID = currentQuizObj?.quizID
  const currentQuizTitle = currentQuizObj?.quizTitle
  const [isShowQuizThumbnail, setShowQuizThumbnail] = useState(false)
  const [postContent, setpostContent] = useState('')
  const [schedDate, setSchedDate] = useState()
  const [schedTime, setSchedTime] = useState()
  const [dueDate, setDueDate] = useState()
  const [dueTime, setDueTime] = useState()
  const [closeDate, setCloseDate] = useState()
  const [closeTime, setCloseTime] = useState()
  const [quizPoints, setquizPoints] = useState()
  const { addSchedule } = useScheduleStore()

  const notif = new Howl({ src: [notifSound]})
  const errSound = new Howl({ src: [erroSound]})
  const notify = (message, state) => {
    if (state === 'err') {
       errSound.play()
       toast.error(message, {
           position: "top-right",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "light",
           });
    }

   else if (state ==='success') {
       notif.play()
       toast.success(message, {
           position: "top-right",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "light",
       });
   }
   
  }

  const generateUniqueId = () => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const length = 8
    let result = ''

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length)
        result += charset.charAt(randomIndex)
    }

    return result
}


  useEffect(()=>{
    console.log(currentQuizObj)
    postType && setShowQuizThumbnail(true)
  },[])

  const handlePost = () => {
    const uniqueID = generateUniqueId()

    if (postType === 'post') {

        if (postContent) {

            if (currentQuizObj) { 
                const quizID = currentQuizObj.quizID
                const duration = currentQuizObj.duration
                const random = currentQuizObj.random
                
                handlePostAssignment(uniqueID, postContent, quizID, duration, postType, random)

                const message = 'Quiz successfully posted'
                notify(message, 'success')


            }

        }else {
            const message = 'Please insert Content'
            notify(message, 'err')
        }

    }else {
        if (schedDate && schedTime && dueDate && dueTime && closeDate && closeTime || postType === 'post') {
        
            const scheduleDateTime = new Date(`${schedDate}T${schedTime}`)
            const closeDateTime = new Date(`${closeDate}T${closeTime}`)
            const dueDateTime = new Date(`${dueDate}T${dueTime}`)
            
            if (dueDateTime > scheduleDateTime) {
                if (closeDateTime > scheduleDateTime) {
                    
                    settingSchedule(uniqueID)
    
                    if (postContent) {
                        if (currentQuizObj) {
                            const quizID = currentQuizObj.quizID
                            const duration = currentQuizObj.duration
                            const random = currentQuizObj.random

                            socket.emit('schedulePost', scheduleDateTime,{ 
                                uniqueID,
                                postContent,
                                quizID,
                                duration,
                                postType,
                                random
                            })

                            
                            //handlePostAssignment(uniqueID, postContent, quizID, duration, postType, random)
                            const message = 'Quiz successfully posted'
                            notify(message, 'success')
                        }
                    }else {
                        const message = 'Please insert Content'
                        notify(message, 'err')
                    }
    
                }else {
                    const message = 'Cannot set close in the past or after schedule'
                    notify(message, 'err')
                }
            }else {
                const message = 'Cannot set due in the past or after schedule'
                notify(message, 'err')
            }
    
    
            
    
        }else {
            const message = 'Please fill all schedule'
            notify(message, 'err')
        }
    }

    

  }

  const settingSchedule = (id) => {
    
    const obj = {
        schedID: id,
        postID: id,
        schedDate,
        schedTime,
        dueDate,
        dueTime,
        closeDate,
        closeTime,
    }

    addSchedule(obj)
  }


  return (
    <div className={style.container}>
        <ToastContainer/>
        <div className={style.horizontal}>
            <h2>Assignment</h2>
            <button onClick={handlePost}><IoIosSend/> Post</button>
        </div>
        <textarea cols="30" rows="10" placeholder='Write something...' value={postContent} onChange={(e) => setpostContent(e.target.value)}></textarea>
        {
            isShowQuizThumbnail && <div className={style.quiz}><SlNotebook/> {currentQuizTitle}</div>
        }
        
        {
            currentPostType === 'schedule' && (
                <>
                    <p>Schedule Date</p>
                    <div className={style.horizontal}>
                        <BsCalendar3 className={style.icons}/>
                        <input type="date" className={style.dateInput} onChange={(e) => setSchedDate(e.target.value)}/>
                        <IoTimeOutline className={style.icons}/>
                        <input type="time" className={style.timeInput} onChange={(e) => setSchedTime(e.target.value)}/>
                    </div>
                    <p>Due Date</p>
                    <div className={style.horizontal}>
                        <BsCalendar3 className={style.icons}/>
                        <input type="date" className={style.dateInput} onChange={(e) => setDueDate(e.target.value)}/>
                        <IoTimeOutline className={style.icons}/>
                        <input type="time" className={style.timeInput} onChange={(e) => setDueTime(e.target.value)}/>
                    </div>
                    <p>Close Date</p>
                    <div className={style.horizontal}>
                        <BsCalendar3 className={style.icons}/>
                        <input type="date" className={style.dateInput} onChange={(e) => setCloseDate(e.target.value)}/>
                        <IoTimeOutline className={style.icons}/>
                        <input type="time" className={style.timeInput} onChange={(e) => setCloseTime(e.target.value)}/>
                    </div>
                    {
                        !isShowQuizThumbnail && (
                            <>
                                <p>Points</p>
                                <div className='d-flex gap-2 align-items-center'>
                                    <GoStar className={style.icons}/>
                                    <input type="number" className={style.pointsInput} onChange={(e) => setquizPoints(e.target.value)}/>
                                </div>
                            </>
                        )
                    }
                    
                   
                </>
            )
        }
        
    </div>
  )
}

export default ClassAssignment