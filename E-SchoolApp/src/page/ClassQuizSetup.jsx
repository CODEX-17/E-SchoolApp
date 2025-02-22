import React, { useEffect, useState } from 'react'
import style from './ClassQuizSetup.module.css'
import { LuTimer } from "react-icons/lu";
import { ProgressBar } from  'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';
import { InfinitySpin } from  'react-loader-spinner';
import { VscPreview } from "react-icons/vsc";
import { MdDeleteOutline } from "react-icons/md";
import { MdExitToApp } from "react-icons/md";
import { BsCalendar3 } from "react-icons/bs";
import { IoTimeOutline } from "react-icons/io5";
import { RiDraftLine } from "react-icons/ri";
import io from 'socket.io-client'
import axios from 'axios';
const socket = io.connect('http://localhost:5001')


const ClassQuizSetup = ({ subjectName, navigateClass, classCode, postType, refreshData }) => {

 let currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})
 let currentDate = new Date().toDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        weekday: 'short'
 })

  const currentSubjectName = subjectName
  const [choices, setChoices] = useState(null)
  const [questions, setquestions] = useState([])
  const [quiz, setQuiz] = useState(null)
  const [quizDraftList, setquizDraftList] = useState([])
  const [images, setImages] = useState(null)
  const [currentBank, setcurrentBank] = useState('')
  const [bankSelected, setbankSelected] = useState(null)
  const [selectedBank, setselectedBank] = useState('')
  const [fillLayout, setFillLayout] = useState()
  const [isShowDurationBox, setisShowDurationBox] = useState(false)
  const [duration, setduration] = useState(0)
  const [random, setrandom] = useState(true)
  const [questionBank, setquestionBank] = useState(null)
  const [subjectNames, setSubjectName] = useState([])
  const [selectedSubject, setselectedSubject] = useState('')
  const [isShowCustomizedBox, setisShowCustomizedBox] = useState('setting')
  const [showLoading, setshowLoading] = useState(false)
  const [autoViewScore, setautoViewScore] = useState(false)
  const [selectState, setselectState] = useState(false)
  const [loadingMessage, setloadingMessage] = useState('Getting questions...')
  const [savingMessage, setSavingMessage] = useState("Saving the quiz.")
  const [quizInstruction ,setquizInstruction] = useState()
  const [quizTitle, setquizTitle] = useState()
  const [finalQuiz, setfinalQuiz] = useState([])
  const [isShowSavingLoad, setisShowSavingLoad] = useState(false)
  const [disabledSaveButton, setDisabledSaveButton] = useState(false)
 
  const [isShowPreview, setisShowPreview] = useState(false)
  const [isShowDraft, setisShowDraft] = useState(false)
  const [isShowPostModal, setisShowPostModal] = useState(false)
  const [isShowscheduleSetup, setisShowscheduleSetup] = useState(false)
  const currentUser = JSON.parse(localStorage.getItem('user'))
  
  const [schedDate, setSchedDate] = useState()
  const [schedTime, setSchedTime] = useState()
  const [dueDate, setDueDate] = useState()
  const [dueTime, setDueTime] = useState()
  const [closeDate, setCloseDate] = useState()
  const [closeTime, setCloseTime] = useState()
  const [postContent, setpostContent] = useState()
  const [objQuiz, setObjQuiz] =useState()
  
  let time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})
  let date = new Date().toDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    weekday: 'short' 
 })

  useEffect( () => {

    //GET ALL IMAGE
    axios.get('http://localhost:5001/images/getImages')
    .then((res) => {
        setImages(res.data)
        console.log("image", res.data)
    })
    .catch((err) => console.log(err))

    //GET ALL SUBJECTS
    axios.get('http://localhost:5001/subject/getSubject')
    .then(res => {
        setSubjectName(res.data)
        console.log("subject name", res.data)
    })
    .catch(err => console.error(err))

    //GET ALL FILLLAYOUT
    axios.get('http://localhost:5001/fillLayout/getFillLayout')
    .then((res) => setFillLayout(res.data))
    .catch((err) => console.log(err))

    //GET ALL QUESTIONS
    axios.get('http://localhost:5001/questions/getQuestions')
    .then((res) => {
        const result = res.data
        setquestions(() => {
            return result.map((data) => ({ ...data, checked: false }))
        })
    })
    .catch((err) => console.log(err))

    //GET ALL BANK
    axios.get('http://localhost:5001/questionBank/getQuestionBank')
    .then((res) => {
        setquestionBank(res.data)
        console.log("questionBank", res.data)
    })
    .catch((err) => console.log(err))

    //GET ALL QUIZ
    axios.get('http://localhost:5001/quiz/getQuiz')
    .then((res) => {
        const result = res.data
        setQuiz(result)

        const draft = result.filter((data) => data.postStatus === 'draft')
        setquizDraftList(draft)
    })
    .catch((err) => console.log(err))

    //GET ALL CHOICES
    axios.get('http://localhost:5001/choices/getChoices')
    .then((res) => setChoices(res.data))
    .catch((err) => console.log(err))


  },[])

  const notify = (message, state) => {
    console.log(message);

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

  const handleBankSelected = (bankID) => {
    const filter = questionBank.filter((bank) => bank.bankID === bankID)
    console.log("questions", questions)
    const questionID = filter[0].questionID
    let selectedQuestions = questions.filter((q) => q.questionID === questionID)
    console.log(selectedQuestions)

    if (selectedQuestions) {
        const filterTrue = selectedQuestions.filter((q) => q.checked === true).length
        const filterFalse = selectedQuestions.filter((q) => q.checked === false).length
        const number = selectedQuestions.length

        console.log(filterTrue, filterFalse)
        if (filterTrue === number) {
            setselectState(true)
        }

        if (filterFalse === number) {
            setselectState(false)
        }
    }

    setcurrentBank(filter[0])

    console.log('finalQuiz: ',finalQuiz)

    if (finalQuiz.length > 0) {
        let updated = [...selectedQuestions]

        for (let i = 0; i < finalQuiz.length; i++) {
            for (let x = 0; x < updated.length; x++) {
                if (finalQuiz[i].id === updated[x].id) {
                    updated[x].checked = true
                }
            }
        }

        setselectedBank(updated)
    }else {
        setselectedBank(selectedQuestions)
    }

  }

  const handleSelectSubject = (e) => {
    e.preventDefault()
    const selected = e.target.value
    setselectedSubject(selected)
    const filter = questionBank.filter((q) => q.subjectName === selected)
    setbankSelected(filter)
  }

  const handleSelectQuestion = (id, index) => {
    let updated = [...selectedBank]
    let savedQuiz = [...finalQuiz]

    if (updated[index].checked === true) {
        updated[index].checked = false
        const filter = savedQuiz.filter((q) => q.id !== updated[index].id)
        setfinalQuiz(filter)
    }else {
        updated[index].checked = true
        savedQuiz.push(updated[index])
        setfinalQuiz(savedQuiz)
    }

    setselectedBank(updated)
  }

  const handleSelectAll = () => {
    let updated = [...selectedBank]

    if (selectState) {
        for (let i = 0; i < updated.length; i++) {
            updated[i].checked = false
        }
        setselectedBank(updated)

        let final = [...finalQuiz]

        const filter = final.filter((items) => !updated.includes(items))
        console.log(filter)
        setfinalQuiz(filter)

        setselectState(!selectState)

    } else {
        for (let i = 0; i < updated.length; i++) {
            updated[i].checked = true
        }

        setselectedBank(updated)

        let final = [...finalQuiz]

        if (finalQuiz.length > 0) {

            for (let i = 0; i < updated.length; i++) {

                for (let x = 0; x < finalQuiz.length; x++) {
                    if (updated[i].id !== finalQuiz[x].id) {
                        final.push(updated[i])
                    }
                }

            }

            const uniqueValue = final.filter((value, index, self) => { return self.indexOf(value) === index})
            setfinalQuiz(uniqueValue)
        }else {
            for (let i = 0; i < updated.length; i++) {
                if (updated[i].id !== finalQuiz.id) {
                    final.push(updated[i])
                }
            }

            const uniqueValue = final.filter((value, index, self) => { return self.indexOf(value) === index})
            setfinalQuiz(uniqueValue)
        }
        
        console.log('final:',final)
        setselectState(!selectState)
    }

    setselectState(!selectState)
    
  }

  const handleShowPostModal = (quiz) => {
    console.log(objQuiz)
    if (quiz.quizID) {
        setObjQuiz(quiz)
        setquizTitle(quiz.quizTitle)
        setquizInstruction(quiz.quizInstructions)
        setisShowPostModal(true)
    }else {
        if (finalQuiz.length > 0) {
            if (quizTitle) {
                if (quizInstruction) {
                    setisShowPostModal(true)
                }else {
                    const message = 'Please enter quiz instruction.'
                    notify(message, 'err')
                }
            }else {
                const message = 'Please enter quiz title.'
                notify(message, 'err')
            }
        }else {
            const message = 'Please create quiz first.'
            notify(message, 'err')
        }  
    }


    
  }

  const handleSaveQuiz = () => {
    console.log('final questions done:', finalQuiz)
    const uniqueID = generateUniqueId()

    if (quizTitle) {
        if (quizInstruction) {
            setisShowSavingLoad(true)
            notif.play()
            const quiz = {
                quizID: uniqueID,
                quizTitle,
                quizInstructions: quizInstruction,
                questionID: uniqueID,
                subjectName: selectedSubject,
                totalPoints: generateTotalPoints(),
                totalQuestions: finalQuiz.length,
                time: currentTime,
                date: currentDate,
                duration,
                random,
                autoView: autoViewScore,
                postStatus: 'draft',
            }

            setObjQuiz(quiz)

            axios.post('http://localhost:5001/quiz/addQuiz', quiz)
            .then( res => {
                const result = res.data
                console.log(result.message)
            })
            .catch(err => console.error(err))

            let final = [...finalQuiz]

            if (finalQuiz.length > 0) {
                for (let i = 0; i < finalQuiz.length; i++) {
                    final[i].questionID = quiz.quizID
                    final[i].questionNumber = i+1
                }
            }else {
                final.questionID = quiz.quizID
                final.questionNumber = 1
            }

            //UpdateQuestions in database
           
            const data = {
                finalQuestionSet: final,
                fillLayout: [],
                choices: [],
                bank:[],
            }

            axios.post('http://localhost:5001/questions/addQuestions', data)
            .then( res => {
                const result = res.data
                console.log(result.message)
            })
            .catch(err => console.error(err))
                
            
            
            setDisabledSaveButton(true)

            setTimeout(() => {
                setisShowSavingLoad(false)
                const message = 'Success save quiz.'
                notify(message, 'success')
            }, 2000);
            
        }else {
            const message = 'Please enter quiz title.'
            notify(message, 'err')
        }
    }else {
        const message = 'Please enter quiz title.'
        notify(message, 'err')
    }

  }

  const  generateTotalPoints = () => {
    let totalPoints = 0

    for (let i = 0; i < finalQuiz.length; i++) {
        totalPoints += parseInt(finalQuiz[i].points)
    }

    console.log('total Points:', totalPoints)
    return totalPoints
  }

  const handlePreview = () => {
    setisShowPreview(true)
  }

  const handleDeleteQuestion = (id) => {
    const filter = finalQuiz.filter((q) => q.id !== id)
    let updated = [...selectedBank]

    console.log(id, finalQuiz)
    console.log(filter)

    for (let i = 0; i < updated.length; i++) {
        if (updated[i].id === id) {
            updated[i].checked = false
            break
        }
    }
    
    setselectedBank(updated)
        setfinalQuiz(filter)

  }

  const handleDeleteQuizInDraft = (quizID, questionID) => {
    if (quizID && questionID) {
        const filterDraftQuiz = quizDraftList.filter((data) => data.quizID !== quizID)
        const filterQuiz = quiz.filter((data) => data.quizID !== quizID)
        
        const data = {
            quizID,
            questionID
        }

        //API DELETE THE QUIZ IN DATABASE
        axios.post('http://localhost:5001/quiz/deleteQuiz', data)
        .then((res) => {
            const result = res.data
            console.log(result.message)
            setQuiz(filterQuiz)
            setquizDraftList(filterDraftQuiz)
        })
        .catch((err) => console.log(err))

        
    }
  }

  const handlePost = () => {
    if (isShowscheduleSetup) {

        if (schedDate && schedTime && dueDate && dueTime && closeDate && closeTime) {
        
            const scheduleDateTime = new Date(`${schedDate}T${schedTime}`)
            const closeDateTime = new Date(`${closeDate}T${closeTime}`)
            const dueDateTime = new Date(`${dueDate}T${dueTime}`)
            
            if (dueDateTime > scheduleDateTime) {
                if (closeDateTime > scheduleDateTime) {
                   
                    if (objQuiz) {
                        const uniqueID = generateUniqueId()
                        const name = currentUser.firstname + ' ' + currentUser.middlename.charAt(0).toUpperCase() + ' ' + currentUser.lastname
                
                        const data = {
                            postID: uniqueID,
                            acctID: currentUser.acctID,
                            name,
                            timePosted: schedTime,
                            datePosted: schedDate,
                            postContent,
                            replyID: uniqueID,
                            imageID: 'none',
                            fileID: 'none',
                            heartCount: 0,
                            likeCount: 0,
                            classCode,
                            subjectName,
                            postType: 'normal',
                            quizID: objQuiz.quizID,
                            schedID: uniqueID,
                            schedStatus: 'yes',
                            dueStatus: 'no',
                            closeStatus: 'no',
                            duration,
                            random,
                        }

                        const sched = {
                            schedID: uniqueID,
                            postID: uniqueID,
                            schedDate,
                            schedTime,
                            dueDate,
                            dueTime,
                            closeDate,
                            closeTime,
                        }

                        //API ADDING POST

                        axios.post('http://localhost:5001/post/addPost', data)
                        .then( res => {
                            const result = res.data
                            console.log(result.message)

                            //API ADDING SCHEDULE
                            axios.post('http://localhost:5001/schedule/addSchedule', sched)
                            .then((res) => {
                                const result = res.data
                                console.log(result.message)

                                setloadingMessage("Uploading post.")
                                setisShowPostModal(false)
                                setshowLoading(true)
                                setDisabledSaveButton(true)
                                setfinalQuiz([])

                                //Removed to draft the posted quiz
                                if (quizDraftList) {
                                    const result = quizDraftList.filter((data) => data.quizID !== data.quizID)
                                    setquizDraftList(result)
                                }

                                setTimeout(() => {
                                    const message = 'Quiz posted successfully'
                                    notify(message, 'success')
                                    setObjQuiz()
                                    setshowLoading(false)
                                }, 3000);

                            })
                            .catch((err) => console.log(err))
                            
                            
                        })
                        .catch(err => console.error(err))

                    }else {
                        const message = 'Makesure save your quiz first.'
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
    }else {
        if (objQuiz) {
            const uniqueID = generateUniqueId()
            const name = currentUser.firstname + ' ' + currentUser.middlename.charAt(0).toUpperCase() + ' ' + currentUser.lastname

            const data = {
                postID: uniqueID,
                acctID: currentUser.acctID,
                name,
                timePosted: time,
                datePosted: date,
                postContent,
                replyID: uniqueID,
                imageID: 'none',
                fileID: 'none',
                heartCount: 0,
                likeCount: 0,
                classCode, 
                subjectName,
                postType: 'normal',
                quizID: objQuiz.quizID,
                schedID: 'none',
                schedStatus: 'no',
                dueStatus: 'no',
                closeStatus: 'no',
                duration,
                random,
            }

            console.log(objQuiz)

           axios.post('http://localhost:5001/post/addPost', data)
            .then( res => {
                const result = res.data
                console.log(result.message)

                setloadingMessage("Uploading post.")
                setisShowPostModal(false)
                setshowLoading(true)
                setDisabledSaveButton(true)
                setfinalQuiz([])

                //Removed to draft the posted quiz
                if (quizDraftList) {
                    const result = quizDraftList.filter((data) => data.quizID !== data.quizID)
                    setquizDraftList(result)
                }

                setTimeout(() => {
                    const message = 'Quiz posted successfully'
                    notify(message, 'success')
                    setObjQuiz()
                    setshowLoading(false)
                }, 3000);
                
            })
            .catch(err => console.error(err))

        }else {
            const message = 'Makesure save your quiz first.'
            notify(message, 'err')
        }
        
    }


  }


  //Shorten the string
  const shorternString = (data) => {
    if (data) {
        if (data.length > 30) {
            return data.substring(0, 20) + '...'
        }
        return data
    }
  }

  //If the question is fillLayout it shows the layout
  const handleFillLayoutShowContent = (fillLayoutID) => {
    const filter = fillLayout.filter((data) => data.fillLayoutID === fillLayoutID).map((data) => data.fillContent)
    return shorternString(filter.join(' '))
  }

  
  return (
    <div className={style.container}>
        
        {
            isShowSavingLoad && (
                <div className={style.loading}>
                    <InfinitySpin 
                        width='200'
                        color="#099AED"
                    />
                    <h2>Loading...</h2>
                    <p>{savingMessage}</p>
                </div>
            )
        }

        {
            isShowPreview && (
                <div className={style.prevDev}>
                    <MdExitToApp size={20} id={style.exitQuesPrev} onClick={() => setisShowPreview(false)}/>
                    <p>Quiz Title</p>
                    <h2>{quizTitle ? quizTitle : 'Insert Quiz Title'}</h2>
                    <p>{quizInstruction ? quizInstruction : 'insert instruction'}</p>
                    <div className={style.listView}>
                        {
                            finalQuiz.map((data) => (
                                <div className={style.cardPrev}>
                                    <div className='d-flex w-100 justify-content-between position-relative'>
                                        <h1>Question:</h1>
                                        <MdDeleteOutline size={20} id={style.deleteQuest} onClick={() =>handleDeleteQuestion(data.id)}/>
                                    </div>
                                    {
                                      data.questionType === 'fill' ? (handleFillLayoutShowContent(data.fillLayoutID)) : (<p>{data.questionContent}</p>)
                                    }
                                    <div className='d-flex w-100 gap-2 mt-2'>
                                        <div id={style.badge}><p>{data.questionType}</p></div>
                                    </div>
                                </div>
                            ))
                        }
                       
                    </div>
                </div>
            )
        }

        {
            isShowDraft && (
                <div className={style.prevDev}>
                    <MdExitToApp size={20} id={style.exitQuesPrev} onClick={() => setisShowDraft(false)}/>
                    <h2>Draft Quiz</h2>
                    <div className={style.listView}>
                        {
                            quizDraftList.map((data) => (
                                <div className={style.cardDraft}>
                                    <div className='d-flex flex-column w-100'>
                                        <div className='d-flex flex-column w-100 mt-2 position-relative'>
                                            <h2>Title:</h2>
                                            <h1>{data.quizTitle}</h1>
                                            <MdDeleteOutline size={20} id={style.deleteQuest} onClick={() =>handleDeleteQuizInDraft(data.quizID, data.questionID)}/>
                                        </div>       
                                        <div className='d-flex flex-column mt-2'>
                                            <h2>Instructions:</h2>
                                            <p>{data.quizInstructions}</p>
                                        </div>
                                        <div className='d-flex flex-column mt-2'>
                                            <h2>Subject:</h2>
                                            <p>{data.subjectName}</p>
                                        </div>
                                        <div className='d-flex mt-2'>
                                            <button onClick={() => handleShowPostModal(data)}>Post</button>
                                        </div>
                                        
                                    </div>
                                    
                                </div>
                            ))
                        }
                       
                    </div>
                </div>
            )
        }

        {
            isShowPostModal && (
                <div className={style.postCon}>
                   <h2>Post Quiz</h2>
                    <textarea placeholder='Create caption' onChange={(e) => setpostContent(e.target.value)}></textarea>
                    {
                        isShowscheduleSetup && (
                            <div className={style.scheduleSetup}>
                                <MdExitToApp size={20} id={style.exitSchedule} onClick={() => setisShowscheduleSetup(false)}/>
                                <p>Schedule Date</p>
                                <div className={style.horizontalDate}>
                                    <BsCalendar3 className={style.icons}/>
                                    <input type="date" className={style.dateInput} onChange={(e) => setSchedDate(e.target.value)}/>
                                    <IoTimeOutline className={style.icons}/>
                                    <input type="time" className={style.timeInput} onChange={(e) => setSchedTime(e.target.value)}/>
                                </div>
                                <p>Due Date</p>
                                <div className={style.horizontalDate}>
                                    <BsCalendar3 className={style.icons}/>
                                    <input type="date" className={style.dateInput} onChange={(e) => setDueDate(e.target.value)}/>
                                    <IoTimeOutline className={style.icons}/>
                                    <input type="time" className={style.timeInput} onChange={(e) => setDueTime(e.target.value)}/>
                                </div>
                                <p>Close Date</p>
                                <div className={style.horizontalDate}>
                                    <BsCalendar3 className={style.icons}/>
                                    <input type="date" className={style.dateInput} onChange={(e) => setCloseDate(e.target.value)}/>
                                    <IoTimeOutline className={style.icons}/>
                                    <input type="time" className={style.timeInput} onChange={(e) => setCloseTime(e.target.value)}/>
                                </div>
                            </div>
                        )
                    }

                    <div className='d-flex justify-content-end gap-2 mt-2'>
                        <button style={{ backgroundColor: '#D24545' }} onClick={() => setisShowPostModal(false)}>Cancel</button>
                        {
                            !isShowscheduleSetup && <button onClick={() => setisShowscheduleSetup(true)}>Shedule</button>
                        }
                        
                        <button onClick={handlePost}>Post Now</button>
                    </div>
                </div>
            )
        }       
        
        <ToastContainer/>
        {
            showLoading ? (
                <div className={style.exitTrapNotif}>
                    <ProgressBar
                        id={style.progressBar}
                        visible={true}
                        height="80"
                        width="80"
                        color="green"
                        barColor= '#3E3F40'
                        borderColor= '#099AED'
                        ariaLabel="progress-bar-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                    <p>{loadingMessage}</p>
                </div>
            ) : (
             
                <div className={style.top}>
                    <div className={style.left}>
                        <div className='d-flex align-items-center gap-5'>
                            <h2>Create Quiz</h2>
                            <div className='d-flex gap-2'>
                                <VscPreview size={25} id={style.preview} title='preview' onClick={handlePreview}/>
                                <RiDraftLine size={24} id={style.preview} title='view draft quiz' onClick={() => setisShowDraft(!isShowDraft)}/>
                            </div>

                        </div>
                            <select className='form-control' id={style.selectSubj} onChange={handleSelectSubject}>
                                <option value="#">Select subject</option>
                                {
                                    subjectNames.length > 0 &&
                                    subjectNames.map((subj, index) => (
                                        <option value={subj.subjectName} key={index}>{subj.subjectName}</option>
                                    ))
                                }
                            </select>
                        {
                            selectedSubject && (
                                <>
                                <div className={style.listCards}>
                                    {
                                        bankSelected.length > 0 ? (
                                            bankSelected.map((bank, index) => (
                                                <div className={currentBank && currentBank.bankID === bank.bankID ? style.cardActive : style.card} key={index} onClick={() => handleBankSelected(bank.bankID)}>
                                                    <div className={style.title}>
                                                        <h2>{bank.bankTitle}</h2>
                                                        <p>{bank.bankID}</p>
                                                    </div>
                                                    <div className={style.created}>
                                                        <p>Date Created:</p>
                                                        <p>{bank.time} ({bank.date})</p>
                                                    </div>
                                                </div>
                                            ))
                                        ):(
                                            'No questions created.'
                                        ) 
                                    }
                                    

                                </div>
                                </>
                            )
                        }
                        

                        <div className={style.dashboard}>
                            <div className={style.leftDash}>
                                <p>Total Questions</p>
                                <h2>
                                    { finalQuiz.length > 0 ? finalQuiz.length : 0}
                                </h2>
                                <p>Total Points</p>
                                <h2>
                                    { finalQuiz.length > 0 ? generateTotalPoints() : 0}
                                </h2>
                            </div>
                            <div className={style.rightDash}>
                                <div className={style.horizontal}>
                                    <div className={style.vertical}>
                                        <h2>Enumeration</h2>
                                        <p>
                                            {
                                                finalQuiz.length > 0 ? 
                                                finalQuiz.filter((q) => q.questionType === 'enumeration').length
                                                : 0
                                            }
                                        </p>
                                    </div>
                                    <div className={style.vertical}>
                                        <h2>Choices Quiz</h2>
                                        <p>
                                            {
                                                finalQuiz.length > 0 ? 
                                                finalQuiz.filter((q) => q.questionType === 'choices').length
                                                : 0
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className={style.horizontal}>
                                    <div className={style.vertical}>
                                        <h2>Fill in the Blank</h2>
                                        <p>
                                            {
                                                finalQuiz.length > 0 ? 
                                                finalQuiz.filter((q) => q.questionType === 'fill').length
                                                : 0
                                            }
                                        </p>
                                    </div>
                                    <div className={style.vertical}>
                                        <h2>True OR False</h2>
                                        <p>
                                            {
                                                finalQuiz.length > 0 ? 
                                                finalQuiz.filter((q) => q.questionType === 'True Or False').length
                                                : 0
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            currentBank && (
                                <div className={style.bottom}>
                                    {
                                        isShowCustomizedBox === 'duration' && (
                                            <>
                                                <div 
                                                    className={duration === 0 ? style.radioMinutesActive : style.radioMinutes}
                                                    onClick={() => {setduration(0), setisShowCustomizedBox('setting')}}
                                                    >No limit
                                                </div>
                                                <div 
                                                    className={duration === 15 ? style.radioMinutesActive : style.radioMinutes}
                                                    onClick={() => {setduration(15), setisShowCustomizedBox('setting')}}
                                                    >15 Minutes
                                                </div>
                                                <div 
                                                    className={duration === 30 ? style.radioMinutesActive : style.radioMinutes}
                                                    onClick={() => {setduration(30), setisShowCustomizedBox('setting')}}
                                                    >30 Minutes
                                                </div>
                                               
                                                <div 
                                                    className={duration !== 60 && duration !== 40 && duration !== 30 && duration !== 15 && duration !== 0 ? style.radioMinutesActive : style.radioMinutes}
                                                    onClick={() => {setisShowCustomizedBox('costumized')}}
                                                    >Costumized
                                                </div>
                                            </>
                                        ) ||
                                        
                                        isShowCustomizedBox === 'costumized' &&  (
                                            <div className={style.durationBox}>
                                                    <input type="number" value={duration} min={1} onChange={(e) => setduration(e.target.value)}/>
                                                    <button id={style.btnSet} onClick={() => {setisShowCustomizedBox('duration'), setisShowCustomizedBox('setting')}}>Set</button>
                                                    <button id={style.btnBack} onClick={() => setisShowCustomizedBox('duration')}>Back</button>
                                            </div>
                                        ) ||

                                        isShowCustomizedBox === 'setting' && (
                                            <div className={style.randomBox}>
                                                <div className='d-flex gap-2'>
                                                        <p>Randomized</p>
                                                        <input type="checkbox" checked={random ? true : false} onChange={(e) => setrandom(e.target.checked)}/>
                                                </div>
                                                <div className='d-flex gap-2'>
                                                        <p>Auto view core</p>
                                                        <input type="checkbox" checked={autoViewScore ? true : false} onChange={(e) => setautoViewScore(e.target.checked)}/>
                                                </div>
                                            
                                            </div>
                                        )

                                }

                                </div>
                            )
                        }
                        
                    </div>
                    <div className={style.right}>
                        <div className={style.headTitle}>
                            <p>Quiz Title</p>
                            <input type="text" onChange={(e) => setquizTitle(e.target.value)}/>
                            <p>Instruction</p>
                            <textarea type="text" onChange={(e) => setquizInstruction(e.target.value)}/>
                        </div>
                        <div className={style.box}>
                            <div className={style.header}>
                                <h2>{currentBank? currentBank.bankTitle : 'Title'}</h2>
                                    {
                                        selectedBank.length > 1 && <button onClick={() =>handleSelectAll()}>{selectState ? 'Unselect All':'Select All'}</button>
                                    }
                                   
                                
                            </div>
                            <div className={style.list}>
                                {
                                    selectedBank.length > 0 ? (
                                    selectedBank
                                        .map((q, index) => (
                                            <div className='d-flex w-100 align-items-center justify-content-center'>
                                                <div className={style.cardQuest} key={index}>
                                                    <div id={style.circle}>{q.questionNumber}</div>
                                                    {
                                                        q.questionType === 'fill' ? handleFillLayoutShowContent(q.fillLayoutID) : <p>{shorternString(q.questionContent)}</p>
                                                    }
                                                    
                                                    <div className={style.typeQuest}>{q.questionType}</div>
                                                </div>
                                                <input type="checkbox" checked={q.checked} onChange={() => handleSelectQuestion(q.id, index)}/>
                                            </div>
                                            
                                        ))
                                    ):(
                                        'no selected questions.'
                                    )
                                }
                            
                            </div>
                        </div>
                        <div className={style.botRight}>
                            <button id={style.btnSetDurations} onClick={() => setisShowCustomizedBox('duration')}><LuTimer/> Set Duration</button>
                            {
                                objQuiz && <button onClick={handleShowPostModal}>Post</button>
                            }
                            <button onClick={handleSaveQuiz} disabled={disabledSaveButton}>Save Quiz</button>

                        </div>
                    </div>
                </div>
              
            )
        }
        
    </div>
  )
}

export default ClassQuizSetup