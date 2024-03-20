import React, { useEffect, useState, useRef } from 'react'
import style from './QuizTake.module.css'
import { BiExit } from "react-icons/bi"
import { FiEdit } from 'react-icons/fi'
import sample from '../assets/sample.jpg'
import { SlPrinter } from "react-icons/sl";
import { useNavigateStore } from '../stores/useNavigateStore'
import { useTimer } from 'react-timer-hook'
import notifSound from '../assets/sound/notif.mp3';
import erroSound from '../assets/sound/error.mp3';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StopwatchTimer from 'react-stopwatch-timer';
import LeaderBoard from './LeaderBoard'
import io from 'socket.io-client'
import { useScoreStore } from '../stores/useScoreStore'
const socket = io.connect('http://localhost:5000')


const QuizTake = () => {

    const notif = new Howl({ src: [notifSound]})
    const errSound = new Howl({ src: [erroSound]})
    const quizTakeID = JSON.parse(localStorage.getItem('quizTakeID'))
    const { quizID, postID } = quizTakeID
    const currentUser = JSON.parse(localStorage.getItem('user'))
    const quiz = JSON.parse(localStorage.getItem('quiz'))
    const images = JSON.parse(localStorage.getItem('images'))
    const choices = JSON.parse(localStorage.getItem('choices'))
    const fill = JSON.parse(localStorage.getItem('fillLayout'))
    const post = JSON.parse(localStorage.getItem('post'))
    const schedules = JSON.parse(localStorage.getItem('schedules'))
    const [currentPost, setCurrentPost] = useState()
    const questions = JSON.parse(localStorage.getItem('questions'))
    const [questionSet, setquestionSet] = useState(null)
    const [quizTitle, setquizTitle] = useState(null)
    const [quizInstructions, setquizInstructions] = useState(null)
    const [isShow, setisShow] = useState('start')
    const [overAll, setoverAll] = useState(0)
    const [duration, setduration] = useState(0)
    const [closedTime, setclosedTime] = useState()
    const [closedDate, setclosedDate] = useState()
    const { updateRouteChoose } = useNavigateStore()
    const [answers, setanswers] = useState([])
    const [correctQuestionList, setcorrectQuestionList] = useState([])
    const [finalScore, setfinalScore] = useState(0)
    const [isShowTimer, setisShowTimer] = useState(false)
    const [enableSubmit, setenableSubmit] = useState(false)

    const { addScore } = useScoreStore()


    const shuffleArray = (obj) => {
        let questions = obj
        
        for (let i = questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questions[i], questions[j]] = [questions[j], questions[i]];
        }

        for (let i = 0; i < questions.length; i++) {
            questions[i].questionNumber = i+1
        }

        return questions
    }

    useEffect(() => {
        const filter = quiz.filter((quiz) => quiz.quizID === quizID)
        const filteredQuestions = questions.filter((q) => q.questionID === filter[0].questionID)
        console.log('filteredQuestions',filteredQuestions)

        const filterPost = post.filter((post) => post.postID === postID)
        if (filterPost[0].schedID !== 'none') {
            const filterSchedule = schedules.filter((sched) => sched.postID === postID)
            setclosedTime(filterSchedule[0].closeTime)
            setclosedDate(filterSchedule[0].closeDate)
        }
        setCurrentPost(filterPost[0])
        setduration(filterPost[0].duration)
        setquizTitle(filter[0].quizTitle)
        setquizInstructions(filter[0].quizInstructions)
        setquestionSet(filteredQuestions)
        setoverAll(filteredQuestions.length)
       
        if (filter[0].random) {
            const ran = shuffleArray(filteredQuestions)
        }
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

    const convertTo12HourFormat = (time24) =>{
        if (time24) {
            const [hours, minutes] = time24.split(':')
            const date = new Date(2000, 0, 1, hours, minutes)
            const time12 = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })
            return time12
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

    const convertDateFormat = (inputDate) => {
        if (inputDate) {
            const [year, month, day] = inputDate.split('-')
            const date = new Date(year, month - 1, day)
            const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`
            return formattedDate
        }
    }

    const handleExit = () => {
        updateRouteChoose('class')
    }

    const generateOverAllScore = () => {
        let points = 0

       for (let i = 0; i < questionSet.length; i++) {
            points += parseInt(questionSet[i].points)
       }
        return points
    }

    const handleSubmitAnswer = (e) => {
        e.preventDefault()
        setisShowTimer(false)
        const dataAnswer = answers
        console.log('dataAnswer',dataAnswer)

        let scoreFinal = 0

        const requiredQuestions = questionSet.filter((q) => q.required === true || q.required === 0)
        let filledQuestions = 0

        for (let i = 0; i < requiredQuestions.length; i++) {
            const currentQuestion = dataAnswer.filter((ans) => ans.number === requiredQuestions[i].questionNumber)
            
            if (currentQuestion) {
                filledQuestions++
            }else {
                continue
            }
        }

        if (filledQuestions === requiredQuestions.length) {
            for (let i = 0; i < questionSet.length; i++) {
            
                if (questionSet[i].questionType === 'enumeration') {

                    const correctAns = questionSet[i].questionAnswerText
                    const currentAns = dataAnswer.filter((ans) => ans.number === questionSet[i].questionNumber).map((ans) => ans.answer)

                    if (questionSet[i].keySensitive) {
                        if (correctAns.toUpperCase() === currentAns[0].toUpperCase()) {
                            let oldData = [...correctQuestionList]
                            oldData.push({
                                questionNumber: questionSet[i].questionNumber,
                                answer: currentAns[0],
                            })
                            setcorrectQuestionList(oldData)
                            
                            const points = parseInt(questionSet[i].points)
                            scoreFinal = scoreFinal + points
                        }
    
                    }else {
                        if (correctAns === currentAns[0]) {
                            let oldData = [...correctQuestionList]
                            oldData.push({
                                questionNumber: questionSet[i].questionNumber,
                                answer: currentAns[0],
                            })

                            setcorrectQuestionList(oldData)
                            const points = parseInt(questionSet[i].points)
                            scoreFinal = scoreFinal + points
                        }
                    }
    
                }

                if (questionSet[i].questionType === 'True Or False') {

                    const correctAns = questionSet[i].questionAnswerText === 1 ? true : false
                    const currentAns = dataAnswer.filter((ans) => ans.number === questionSet[i].questionNumber).map((ans) => ans.answer)
                    
                    console.log('correctAns:', correctAns)
                    console.log('currentAns:', currentAns[0])

                        if (correctAns.toString() == currentAns[0].toString()) {
                            let oldData = [...correctQuestionList]
                            oldData.push({
                                questionNumber: questionSet[i].questionNumber,
                                answer: currentAns[0],
                            })
                            setcorrectQuestionList(oldData)
                            
                            const points = parseInt(questionSet[i].points)
                            scoreFinal = scoreFinal + points
                        }
    
                }

                
                if (questionSet[i].questionType === 'choices') {

                    const currentAns = dataAnswer.filter((ans) => ans.number === questionSet[i].questionNumber)
                    const correctChoices = choices.filter((choice) => choice.choicesID === questionSet[i].choicesID && choice.correct).map((choice) => choice.letter)
                    
                    if (currentAns.length > 0) {
                        if (currentAns.length > 1) {
    
                            const currentAnsList = currentAns.map((ans) => ans.answer)
                            const correct = currentAnsList.every((letter) => correctChoices.includes(letter))
                            
                            console.log('currentAnsList:', currentAnsList)
                            console.log('correct:', correct)
                            
                            if (correct) { 
                                let oldData = [...correctQuestionList]
                                oldData.push({
                                    questionNumber: questionSet[i].questionNumber,
                                    answer: currentAns,
                                })
    
                                setcorrectQuestionList(oldData)
    
                                const points = parseInt(questionSet[i].points)
                                scoreFinal = scoreFinal + points
    
                            }
    
                        }else {
                           
                            if (currentAns[0]?.answer === correctChoices[0]) {

                                let oldData = [...correctQuestionList]
                                oldData.push({
                                    questionNumber: questionSet[i].questionNumber,
                                    answer: currentAns,
                                })
    
                                setcorrectQuestionList(oldData)
    
                                const points = parseInt(questionSet[i].points)
                                scoreFinal = scoreFinal + points

                            }else {
                                continue
                            }
                            
                        }
        
                    }else {
                        continue
                    }
                    
                }
                
                if (questionSet[i].questionType === 'fill') {

                    
                    const currentAns = dataAnswer[i]
                    //const currentAns = dataAnswer.filter((ans) => ans.number === questionSet[i].questionNumber).map((ans) => ans.answer)
                    const blankFill = fill.filter((fill) => fill.fillLayoutID === questionSet[i].fillLayoutID && fill.fillType === 'blank').map((fill) => fill.fillContent)
                    //

                    console.log("currentAns:", currentAns)
                    console.log("blankFill:", blankFill)

                    if (currentAns.length > 1) {
                        const filterAns = currentAns.filter((ans) => ans.answer !== '').map((ans) => ans.answer)
                        const correct = filterAns.every((ans, index) => ans === blankFill[index])
                       
                        if (correct) {
                            let oldData = [...correctQuestionList]
                            oldData.push({
                                questionNumber: questionSet[i].questionNumber,
                                answer: currentAns,
                            })

                            console.log(oldData)
                            setcorrectQuestionList(oldData)

                            const points = parseInt(questionSet[i].points)
                            scoreFinal = scoreFinal + points
                        }

                    }else {
                        if (questionSet[i].keySensitive) {
                            if (currentAns.answer === blankFill[0]) {
                                let oldData = [...correctQuestionList]
                                oldData.push({
                                    questionNumber: questionSet[i].questionNumber,
                                    answer: currentAns,
                                })
    
                                console.log(oldData)
                                setcorrectQuestionList(oldData)
    
                                const points = parseInt(questionSet[i].points)
                                scoreFinal = scoreFinal + points
                            }
                        }else {
 
                            const myAns = currentAns.answer
                            const corAns = blankFill[0]

                            if (myAns.toUpperCase() === corAns.toUpperCase()) {
                                let oldData = [...correctQuestionList]
                                oldData.push({
                                    questionNumber: questionSet[i].questionNumber,
                                    answer: currentAns,
                                })
    
                                console.log(oldData)
                                setcorrectQuestionList(oldData)
    
                                const points = parseInt(questionSet[i].points)
                                scoreFinal = scoreFinal + points
                            }
                        }
                        
                    }

                }


            }

           
            const { quizID } = quizTakeID

            const data = {
                    scoreID: generateUniqueId(),
                    quizID: quizID,
                    acctID: currentUser.acctID,
                    fullname: generateFullname(currentUser.acctID),
                    score: scoreFinal,
            }
                

            addScore(data)
            setfinalScore(scoreFinal)
            console.log(correctQuestionList)
            console.log('scoreFinal',scoreFinal)

        }else {
            const message = 'Please fill the required question.'
            notify(message, 'err')
        }
        
        console.log(questions)
        setisShow('result')
    }

    const handleAnswers = (index, number, type, answer, limit, position) => {
        const newAnswer = [...answers]
        const numberOfAns = questionSet.filter((q) => q.questionNumber === number).map((q) => q.questionNumber)

        console.log(index,number,type,answer,limit,position)

        if (type === 'choices') {
            if (limit > 1) {
                console.log('more')
                if (!Array.isArray(newAnswer[index])) {
                    newAnswer[index] = []
                    newAnswer[index][0] = {
                        index,
                        number,
                        type,
                        answer,
                        correct: false,
                    }

                }else {
                    
                    for (let i = 0, items = 0; i < limit; i++) {

                        if (newAnswer[index][i]) {
                            items++
                            if (newAnswer[index][i].answer === answer) {
                                newAnswer[index].splice(i, 1)
                                break
                            }else {
                                
                                if (items === parseInt(limit)) {
                                    console.log('executed')
                                    newAnswer[index][0] =
                                        {
                                            index,
                                            number,
                                            type,
                                            answer,
                                            correct: false,
                                        }
                                    break
                                }else {
                                    continue
                                }
                                
                            }

                            
                            
                        }else if (!newAnswer[index][i]) {
                            console.log('execute space')
                            newAnswer[index][i] =
                                {
                                    index,
                                    number,
                                    type,
                                    answer,
                                    correct: false,
                                }
                            break
                        }else {
                            console.log('execute full')
                            newAnswer[index][0] =
                                {
                                    index,
                                    number,
                                    type,
                                    answer,
                                    correct: false,
                                }
                            break
                        }
                    }
                }

                
                
            }else {
                newAnswer[index] = {
                    index,
                    number,
                    type,
                    answer,
                    correct: false,
                }
            }

            
        }
        
        if (type === 'fill') {

            if (limit > 1) {

                if (!Array.isArray(newAnswer[index])) {
                    console.log('execute2')
                    newAnswer[index] = []
                    newAnswer[index][position] = {
                        index,
                        number,
                        type,
                        answer,
                        correct: false,
                    }
                }else {

                    const items = newAnswer[index].length

                        newAnswer[index][position] = {
                            index,
                            number,
                            type,
                            answer,
                            correct: false,
                        }

                   

                }

            }else {
                newAnswer[index] = {
                    index,
                    number,
                    type,
                    answer,
                    correct: false,
                }
            }


        }
        
        if (type === 'enumeration' || type === 'True Or False') {

            newAnswer[index] = {
                index,
                number,
                type,
                answer,
                correct: false,
            }
        }

        console.log(newAnswer)
        setanswers(newAnswer)
    }

    const containsAnswer = (answer, target, letter) => {

        if (letter) {
            if (answers[target]?.answer === letter) {
                return true
            }

             if (Array.isArray(answers[target])) {
                const filter = answers[target].filter((ans) => ans.answer === letter)
                if (filter.length > 0) {
                    return true
                }else {
                    return false
                }
             }
        }

    }

    const generatePicture = (data) => {
        return 'http://localhost:5000/'+data
    }

    const generateCloseTime = () => {
        console.log(closedDate, closedTime)
        const result = convertDateFormat(closedDate)+' ('+convertTo12HourFormat(closedTime)+')'
        if (currentPost) {
            if (currentPost.schedID === 'none') {
                return 'none'
           }
        }
        return result
    }


    const expiryTimestamp = new Date()
    const filterPost = post.filter((post) => post.postID === postID)
    let time = filterPost[0].duration
        expiryTimestamp.setMinutes(expiryTimestamp.getMinutes() + time);
        const {
            seconds,
            minutes,
            start,
            stop,
        } = useTimer({
            expiryTimestamp,
            onExpire: () => {
                setenableSubmit(true);
            },
        })
    
    

    const handleStart = () => {
        const filterPost = post.filter((post) => post.postID === postID)
        let time = filterPost[0].duration
        console.log(time)
        setisShow('take')
        if (time > 0) {
            setisShowTimer(true)
            start()
        }else {
            setenableSubmit(false)
            stop()
        }

        const { quizID } = quizTakeID
        const room = quizID
        socket.emit('joinQuiz', room)

    }


    const generateFullname = () => {
        const fullname = currentUser.firstname + ' ' + currentUser.middlename.charAt(0).toUpperCase() + ' ' + currentUser.lastname
        return fullname
    }

    
      return (
        <div className={style.container}>
             <ToastContainer/>
            {
                isShowTimer && (
                    <div id={style.timer}>
                        <p>{`Timer: ${minutes}:${seconds}`}</p>
                    </div>
                )
            }
            
            {
                isShow === 'start' && (
                    <div className={style.contentStart}>
                        <div className={style.containerTop}>
                            <BiExit id={style.btnBack} title='back' onClick={handleExit}/>
                            <h1>{quizTitle}</h1>
                            <p>{quizInstructions}</p>
                            <div id={style.overCon}>{overAll}/{overAll}</div>
                        </div>
                        <div className={style.containerBot}>
                            <p><b>Take Duration:</b> {duration+'mins'} <b>Close Date:</b> {generateCloseTime()}</p>
                            <button onClick={handleStart}>Start</button>
                        </div>
                    </div>
                ) ||
                
                isShow === 'take' && (
                    <div className={style.content}>
                        <div className={style.header}>
                            <p id={style.quizTitle}>Quiz title</p>
                            <h2>{quizTitle}</h2>
                            <p>{quizInstructions}</p>
                            
                        </div>
                        <form action="" className={style.form} onSubmit={handleSubmitAnswer}>
                            {
                                questionSet && (
                                    questionSet.map((questions, target) => (
                                        
                                        questions.questionType === 'enumeration' && questions.imageID === 'none' && (
                    
                                            <div className={style.quizContainer} key={target}>
                                                <div className={style.topquizContainer}>
                                                    <div id={style.circle}>Q{questions.questionNumber}</div>
                                                    <div className={style.titlesDiv}>
                                                        <p>Question:</p>
                                                        <h2>{questions.questionContent.replace(/(.{70})/g, "$1\n")}</h2>
                                                        <p style={{ fontSize: '8pt'}}><i>{questions.keySensitive ? 'key senstive answer.' : 'not key senstive answer. '}{questions.required ? '(REQUIRED).' :''}</i></p>
                                                    </div>
                                                </div>
                                                <div className={style.botquizContainer}>
                                                    <p style={{ margin: '0', fontSize: '10pt'}}>Answer:</p>
                                                    <textarea
                                                        id={style.textAnswer}
                                                        
                                                        required={questions.required ? true : false}
                                                        onChange={(e) => handleAnswers(target, questions.questionNumber, questions.questionType, e.target.value, questions.numberOfAns)}
                                                    >
                                                    </textarea>
                                                </div>
                                            </div>
                    
                                        ) ||
                    
                                        questions.questionType === 'enumeration' && questions.imageID != 'none' && (
                    
                                            <div className={style.quizContainer} key={target}>
                                                <div className={style.topquizContainer}>
                                                    <div id={style.circle}>Q{questions.questionNumber}</div>
                                                    <div className={style.titlesDiv}>
                                                        <p>Question:</p>
                                                        <h2>{questions.questionContent.replace(/(.{70})/g, "$1\n")}</h2>
                                                        <p style={{ fontSize: '8pt'}}><i>{questions.keySensitive ? 'key senstive answer.' : 'not key senstive answer.'}{questions.required ? '(REQUIRED).' :''}</i></p>
                                                    </div>
                                                </div>
                                                <div className={style.botquizContainerImage}>
                                                    <div className={style.botLeft}>
                                                        <p style={{ margin: '0', fontSize: '10pt'}}>Answer:</p>
                                                        <textarea
                                                            id={style.textAnswer}
                                                            required={questions.required ? true : false}
                                                            onChange={(e) => handleAnswers(target, questions.questionNumber, questions.questionType, e.target.value, questions.numberOfAns)}
                                                        >
                                                        </textarea>
                                                    </div>
                                                    <div className={style.botRight}>
                                                        {
                                                            images
                                                                .filter((image) => image.imageID === questions.imageID)
                                                                .map((images, index) => (
                                                                <img
                                                                    key={index}
                                                                    src={generatePicture(images.data)}
                                                                    alt="image"
                                                                    className={style.imgQuestion}
                                                                />
                                                                ))
                                                        }
                                                    </div>
                                                    
                                                </div>
                                            </div>
                    
                                        ) ||
                    
                                        questions.questionType === 'choices' && questions.imageID === 'none' && (
                    
                                            <div className={style.quizContainer} key={target}>
                                                <div className={style.topquizContainer}>
                                                    <div id={style.circle}>Q{questions.questionNumber}</div>
                                                    <div className={style.titlesDiv}>
                                                        <p>Question:</p>
                                                        <h2>{questions.questionContent.replace(/(.{70})/g, "$1\n")}</h2>
                                                        <p style={{ fontSize: '8pt'}}><i>Choose {questions.numberOfAns} answers. {questions.required ? '(REQUIRED).' :''}</i></p>
                                                    </div>
                                                </div>
                                                <div className={style.botquizContainerChoices}>
                                                    {
                                                        choices
                                                            .filter((chs) => chs.choicesID === questions.choicesID)
                                                            .map((chs, index) => (
                                                            <div 
                                                                key={index}
                                                                className={ containsAnswer(answers[target], target, chs.letter) ? style.choicesActive : style.choices }
                                                                onClick={(e) => handleAnswers(target, questions.questionNumber, questions.questionType, chs.letter, questions.numberOfAns)}
                                                            >
                                                                {chs.letter}. {chs.content}

                                                            </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ) ||
                    
                                        questions.questionType === 'choices' && questions.imageID != 'none' && (
                    
                                            <div className={style.quizContainer} key={target}>
                                                <div className={style.topquizContainer}>
                                                    <div id={style.circle}>Q{questions.questionNumber}</div>
                                                    <div className={style.titlesDiv}>
                                                        <p>Question:</p>
                                                        <h2>{questions.questionContent.replace(/(.{70})/g, "$1\n")}</h2>
                                                        <p style={{ fontSize: '8pt'}}><i>Choose {questions.numberOfAns} answers. {questions.required ? '(REQUIRED).' :''}</i></p>
                                                    </div>
                                                </div>
                                                <div className={style.botquizContainerImage}>
                                                    <div className={style.botLeft}>
                                                        <div className={style.botListChoices}>
                                                        {
                                                            choices
                                                                .filter((chs) => chs.choicesID === questions.choicesID)
                                                                .map((chs, index) => (
                                                                <div 
                                                                    key={index}
                                                                    className={answers[target] === chs.letter ? style.choicesActiveImage : style.choicesImage }
                                                                    onClick={(e) => handleAnswers(target, questions.questionNumber, questions.questionType, chs.letter, questions.numberOfAns)}
                                                                >
                                                                    {chs.letter}. {chs.content}
                                                                </div>
                                                        ))}
                                                        </div>
                                                    </div>
                                                    <div className={style.botRight}>
                                                        {
                                                        images
                                                            .filter((image) => image.imageID === questions.imageID)
                                                            .map((images, index) => (
                                                            <img
                                                                key={index}
                                                                src={generatePicture(images.data)}
                                                                alt="image"
                                                                className={style.imgQuestion}
                                                            />
                                                            ))
                                                        }
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        ) ||
                    
                                        questions.questionType === 'fill' && questions.imageID === 'none' && (
                    
                                            <div className={style.quizContainer} key={target}>
                                                <div className={style.topquizContainer}>
                                                    <div id={style.circle}>Q{questions.questionNumber}</div>
                                                    <div className={style.titlesDiv}>
                                                        <p>Question:</p>
                                                        <div className={style.fillContentList}>
                                                            {
                                                                fill
                                                                    .filter((fill) => fill.fillLayoutID === questions.fillLayoutID)
                                                                    .map((fill, index) => (
                                                                        fill.fillType === 'text' && (<h2 className={style.fillText} title='text' key={index}>{fill.fillContent}</h2>) ||
                                                                        fill.fillType === 'blank' && (
                                                                            <input 
                                                                                key={index}
                                                                                className={style.fillBlank}
                                                                                placeholder='Write the answer'
                                                                                required={questions.required ? true : false}
                                                                                onChange={(e) => handleAnswers(target, questions.questionNumber, questions.questionType, e.target.value, questions.numberOfAns, index)}
                                                                                >
                                                                            </input>
                                                                        )
                                                                    ))
                                                            }
                                                        </div>
                                                        <p style={{ fontSize: '8pt'}}>
                                                            <i>Fill {fill.filter((fill) => fill.fillType === 'blank' && fill.fillLayoutID === questions.fillLayoutID).length} answers.{questions.keySensitive ? ' Key senstive answer.' : ' Not key senstive answer.' }{questions.required ? '(REQUIRED).' :''}</i>
                                                        </p>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        ) || 
                    
                                        questions.questionType === 'fill' && questions.imageID !== 'none' && (
                                            <div className={style.quizContainer} key={target}>
                                                <div className={style.topquizContainer}>
                                                    <div className={style.leftDivFill}>
                                                        <div id={style.circle}>Q{questions.questionNumber}</div>
                                                        <div className={style.titlesDivFill}>
                                                            <p>Question:</p>
                                                            <div className={style.fillContent}>
                                                                {
                                                                    fill
                                                                        .filter((fill) => fill.fillLayoutID === questions.fillLayoutID)
                                                                        .map((fill, index) => (
                                                                            fill.fillType === 'text' && (<h2 className={style.fillText} title='text' key={index}>{fill.fillContent}</h2>) ||
                                                                            fill.fillType === 'blank' && (
                                                                                <input 
                                                                                    key={index}
                                                                                    className={style.fillBlank}
                                                                                    required={questions.required ? true : false}
                                                                                    placeholder='Write the answer'
                                                                                    onChange={(e) => handleAnswers(target, questions.questionNumber, questions.questionType, e.target.value, questions.numberOfAns, index)}
                                                                                    
                                                                                    >
                                                                                </input>
                                                                            )
                                                                        ))
                                                                }
                                                            
                                                            </div>
                                                            <p style={{ fontSize: '8pt'}}><i>Fill {fill.filter((fill) => fill.fillType === 'blank' && fill.fillLayoutID === questions.fillLayoutID).length} answers.{questions.keySensitive && ' Key senstive answer. '}{questions.required ? '(REQUIRED).' :''}</i></p>
                                                        </div>
                                                    </div>
                                                    <div className={style.rightDivFill}>
                                                        {
                                                        images
                                                                .filter((image) => image.imageID === questions.imageID)
                                                                .map((images, index) => (
                                                                <img
                                                                    id={style.imgFill}
                                                                    key={index} 
                                                                    src={generatePicture(images.data)}
                                                                    alt="image"
                                                                    className={style.imgQuestion}
                                                                />
                                                                ))
                                                            }
                                                    </div>
                                                    
                                                </div>
                                                
                                            </div>
                                        ) ||
                    
                                        questions.questionType === 'True Or False' && questions.imageID === 'none' && (
                    
                                            <div className={style.quizContainer} key={target}>
                                                <div className={style.topquizContainer}>
                                                    <div id={style.circle}>Q{questions.questionNumber}</div>
                                                    <div className={style.titlesDiv}>
                                                        <p>Question:</p>
                                                        <h2>{questions.questionContent.replace(/(.{70})/g, "$1\n")}</h2>
                                                        <p style={{ fontSize: '8pt'}}><i>{questions.required ? 'required to answer.' : 'not required to answer.'}{questions.required ? '(REQUIRED).' :''}</i></p>
                                                    </div>
                                                </div>
                                                <div className={style.botquizContainer}>
                                                    <p style={{ margin: '0', fontSize: '10pt'}}>Answer:</p>
                                                    <div className='d-flex justify-content-center'>
                                                        <div 
                                                            className={answers[target]?.answer === 'true' ? style.choicesActive : style.choices }
                                                            onClick={() => handleAnswers(target, questions.questionNumber, questions.questionType, 'true')}
                                                        >
                                                            true 
                                                        </div>
                                                        <div 
                                                            className={answers[target]?.answer === 'false'? style.choicesActive : style.choices }
                                                            onClick={() => handleAnswers(target, questions.questionNumber, questions.questionType, 'false')}
                                                        >
                                                            false
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                    
                                        ) ||
                    
                                        questions.questionType === 'True Or False' && questions.imageID != 'none' && (
                    
                                            <div className={style.quizContainer} key={target}>
                                                <div className={style.topquizContainer}>
                                                    <div id={style.circle}>Q{questions.questionNumber}</div>
                                                    <div className={style.titlesDiv}>
                                                        <p>Question:</p>
                                                        <h2>{questions.questionContent.replace(/(.{70})/g, "$1\n")}</h2>
                                                        <p style={{ fontSize: '8pt'}}><i>{questions.required ? 'required to answer.' : 'not required to answer.'}{questions.required ? '(REQUIRED).' :''}</i></p>
                                                    </div>
                                                </div>
                                                <div className={style.botquizContainerImage}>
                                                    <div className={style.botLeft}>
                                                        <p style={{ margin: '0', fontSize: '10pt'}}>Answer:</p>
                                                        <div className='d-flex'>
                                                            <div 
                                                                className={answers[target]?.answer === 'true' ? style.choicesActive : style.choices }
                                                                onClick={() => handleAnswers(target, questions.questionNumber, questions.questionType, 'true')}
                                                            >true
                                                            </div>
                                                            <div 
                                                                className={answers[target]?.answer === 'false' ? style.choicesActive : style.choices }
                                                                onClick={() => handleAnswers(target, questions.questionNumber, questions.questionType, 'false')}
                                                            >false
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={style.botRight}>
                                                        {
                                                        images
                                                                .filter((image) => image.imageID === questions.imageID)
                                                                .map((images, index) => (
                                                                <img
                                                                    key={index}
                                                                    src={generatePicture(images.data)}
                                                                    alt="image"
                                                                    className={style.imgQuestion}
                                                                />
                                                                ))
                                                        }
                                                    </div>
                                                    
                                                </div>
                                            </div>
                    
                                        )
                    
                                    ))
                                )
                            }

                        <div className='w-100 d-flex justify-content-end'>
                            <button className={style.btnSubmit} type='submit' disabled={enableSubmit}>Submit</button>
                        </div>
                        </form>
                    </div>
                ) ||
                
                isShow === 'result' && (
                    <div className={style.containerResults}>
                        <h2>Result</h2>
                        <div className={style.scoreBox}>
                            <p>Your Score</p>
                            <h1>{finalScore}/{generateOverAllScore()}</h1>
                        </div>
                        <button className={style.btnBack} onClick={() => updateRouteChoose('class')}>Back</button>
                       
                    </div>
                ) ||

                isShow === 'leaderboards' && (
                    <LeaderBoard finalScore={finalScore} quizID={quizTakeID.quizID}/>
                )

            }
            
            
        </div>
  )
}

export default QuizTake