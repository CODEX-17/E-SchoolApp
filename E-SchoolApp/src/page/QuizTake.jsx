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
import TimerComponent from '../components/TimerComponent'
import LeaderBoard from './LeaderBoard'
import io from 'socket.io-client'
import { useScoreStore } from '../stores/useScoreStore'
import axios from 'axios'
const socket = io.connect('http://localhost:5001')


const QuizTake = () => {

    const notif = new Howl({ src: [notifSound]})
    const errSound = new Howl({ src: [erroSound]})
    const quizTakeID = JSON.parse(localStorage.getItem('quizTakeID'))
    const { quizID, postID } = quizTakeID
    const currentUser = JSON.parse(localStorage.getItem('user'))
    const [quiz, setquiz] = useState()
    const [images, setImage] = useState()
    const [choices, setChoices] = useState()
    const [fillLayout, setFillLayout] = useState()
    const [post, setPost] = useState()
    const [schedules, setSchedule] = useState()
    const [currentPost, setCurrentPost] = useState()
    const [questions, setQuestions] = useState( )
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


    const [userAnswer, setUserAnswer] = useState([])

    const [currentQuiz, setCurrentQuiz] = useState()

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

    const expiryTimestamp = new Date()
    const [filterPost, setFilterPost] = useState()
    const [time, setTime] = useState()

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
    
    useEffect( async () =>  {

        try {
           
            // GET ALL CHOICES, FILL LAYOUT, IMAGES in parallel
            const [choicesResponse, fillLayoutResponse, imagesResponse, quizResponse] = await Promise.all([
                axios.get('http://localhost:5001/choices/getChoices'),
                axios.get('http://localhost:5001/fillLayout/getFillLayout'),
                axios.get('http://localhost:5001/images/getImages'),
                axios.get(`http://localhost:5001/quiz/getQuizInnerJoinQuestion/${quizID}`),
            ]);

            const choices = choicesResponse.data
            const fillLayout = fillLayoutResponse.data
            const images = imagesResponse.data
            const questions = quizResponse.data
            let finalQuestions = []

            // Update the state with the fetched data
            setChoices(choices)
            setFillLayout(fillLayout)
            setImage(images)
            setQuestions(questions)

            

            for (let i = 0; i < questions.length; i++) {
                
                questions[i].questionNumber = i+1
                const type = questions[i].questionType
                const points = questions[i].points
                const keySensitive = questions[i].keySensitive
                const answerText = questions[i].questionAnswerText
                const choicesID = questions[i].choicesID
                const fillLayoutID = questions[i].fillLayoutID

                if (type === "enumeration" || type === "True Or False") {
                    setanswers((oldData) => {
                        let newData = [...oldData]

                        // Ensure the element at the specific index is an array
                        if (!Array.isArray(newData[i]) || numberOfAns > 1) {
                            newData[i] = [];
                        }

                        newData[i][0] = {
                            type: type,
                            answer: answerText,
                            keySensitive: keySensitive,
                            points: points,
                        }

                        return newData
                    })
                }
                
                if (type === "choices") {

                    const resuit = choices
                    .filter((data) => data.choicesID === choicesID && data.correct === 1)
                    .map((data, index) => ({
                        letter: data.letter,
                        index: index,
                    }))

                    setanswers((oldData) => {
                        let newData = [...oldData]

                        // Ensure the element at the specific index is an array
                        if (!Array.isArray(newData[i]) || numberOfAns > 1) {
                            newData[i] = [];
                        }

                       
                        for (let x = 0; x < resuit.length; x++) {
                            
                            newData[i][resuit[x].index] = {
                                type: type,
                                answer: resuit[x].letter,
                                keySensitive: keySensitive,
                                points: points,
                            }
                        }

                        return newData
                        
                    })
                }

                if (type === "fill") {

                    const result = fillLayout
                    .filter((data) => data.fillLayoutID === fillLayoutID)
                    .map((data, index) => ({ ...data, originalIndex: index }))
                    .filter((data) => data.fillType === "blank")
                    .map((data) => ({
                        answer: data.fillContent,
                        index: data.originalIndex,
                    }))


                    setanswers((oldData) => {
                        let newData = [...oldData]

                        // Ensure the element at the specific index is an array
                        if (!Array.isArray(newData[i]) || numberOfAns > 1) {
                            newData[i] = [];
                        }

                        for (let x = 0; x < result.length; x++) {
                            const data = result[x]

                            newData[i][data.index] = {
                                type: type,
                                answer: data.answer,
                                keySensitive: keySensitive,
                                points: points,
                            }
                        }

                        return newData
                    })
                }
                
                finalQuestions.push(questions[i])
            }
            setquestionSet(finalQuestions)


        } catch (error) {
            console.log(error)
        }


        //GET ALL POST
        axios.get('http://localhost:5001/post/getPost')
        .then((res) => {
            const result = res.data
            console.log('filter post', result)
            console.log('postID', postID)
            setPost(result)

            const filter = result.filter((post) => post.postID === postID)

            console.log('filter post', filter)
            const time = filter[0]?.duration
            setTime(time)
            setCurrentPost(filter[0])
            setclosedTime(filter[0].closeTime)
            setclosedDate(filter[0].closeDate)
            

            if (filter[0].random) {
                const ran = shuffleArray(filteredQuestions)
            }
        })
        .catch((err) => console.log(err))

        //GET ALL SCHEDULE
        axios.get('http://localhost:5001/schedule/getSchedule')
        .then((res) => setSchedule(res.data))
        .catch((err) => console.log(err))

        //GET ALL QUIZ
        axios.get('http://localhost:5001/quiz/getQuiz')
        .then((res) => {
            const result = res.data
            setquiz(result)

            const filter = result.filter((data) => data.quizID === quizID)
            setCurrentQuiz(filter[0])
            setduration(filter[0].duration)
            setquizTitle(filter[0].quizTitle)
            setquizInstructions(filter[0].quizInstructions)

            })

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

        let score = 0

        for (let i = 0; i < answers.length; i++) {

            if (answers[i]) {
                if (
                    answers[i].some(data => data.type === 'enumeration') ||
                    answers[i].some(data => data.type === 'True Or False')
                ) {
                    const points = parseInt(answers[i][0].points)

                    //the question is not keysentive
                    if (answers[i][0]?.keySensitive === 0) {
                        if (answers[i][0]?.answer.toUpperCase() === userAnswer[i][0]?.answer.toUpperCase()) {
                            score = points + score
                        }
                    }else {
                        if (answers[i][0]?.answer === userAnswer[i][0]?.answer) {
                            score = points + score
                        }
                    }
                     
                }



                if (answers[i].some(data => data.type === 'choices')) {

                    let contains = 0
                    const points = parseInt(answers[i][0].points)
                    const numOfAnswer = answers[i].length

                    for (let x = 0; x < answers[i].length; x++) {
                        const correctLetter = answers[i][x].answer

                        if (numOfAnswer > 1) {
                            if (userAnswer[i].some(data => data?.answer === correctLetter)) {
                                contains += 1
                            }
                        }else {

                            //Check if the first user answer index is not undefiend and proceed to the next
                            for (let x = 0; x < userAnswer[i].length; x++) {
                                if (userAnswer[i][x] !== undefined) {
                                    if (answers[i][0].answer === userAnswer[i][x].answer) {
                                        score = points + score
                                    }else {
                                        break
                                    }
                                }
                                
                            }
                            
                        }
                        
                        
                    }

                    if (contains === answers[i].length) {
                        score = points + score
                    }
                    
                }


                if (answers[i].some(data => data.type === 'fill')) {

                    //Get the point in array the not undefined
                    const getPoints = (data) => {
                        for (let x = 0; x < data.length; x++) {
                            
                            if (data[x] !== undefined) {
                               return parseInt(data[x].points)
                            }
                        }
                    }

                    //Get the number of answer
                    const getTheNumberOfAnswer = (data) => {
                        let total = 0
                        for (let x = 0; x < data.length; x++) {
                            if (data[x] !== undefined) {
                                total += 1
                            }
                        }
                        return total
                    }

                    let correct = 0
                    const points = getPoints(answers[i])
                    const numOfAnswer = getTheNumberOfAnswer(answers[i])
                    
                    for (let x = 0; x < answers[i].length; x++) {
                        
                        if (answers[i][x] !== undefined) {

                            //Check if keysentive 0 means false
                            if (answers[i][x].keySensitive === 0) {
                                if (answers[i][x].answer.toUpperCase() === userAnswer[i][x].answer.toUpperCase()) {
                                    console.log("correct")
                                    correct += 1
                                }
                            }else {
                                if (answers[i][x].answer === userAnswer[i][x].answer) {
                                    correct += 1
                                }
                            }
                        }
                    }

                    //Check if the number of correct is same in the number of answer
                    if (correct === numOfAnswer) {
                        score = points + score
                    }
                }


            }
            
        }

        const data = {
            scoreID: generateUniqueId(),
            quizID: quizID,
            acctID: currentUser.acctID,
            fullname: generateFullname(),
            score: score,
        }

        console.log(data)

        axios.post("http://localhost:5001/scores/addScore", data)
        .then((res) => {
            const result = res.data
            console.log(result.message)
        })
        .catch((err) => console.log(err))


        setfinalScore(score)
        setisShow('result')

    }

    const enableSubmitAnswer = () => {

        let requiredQuestions = []

        for (let i = 0; i < questions?.length; i++) {
            
            if (questions[i].required === 1) {
                requiredQuestions.push(i)
            }
        }

        if (requiredQuestions.length === 0) {
            return false
        }

        if (userAnswer.length > 0) {
             for (let x = 0; x < requiredQuestions.length; x++) {
                if (userAnswer[x]?.length > 0) {
                    return false
                }
            }
        }else {
            return true
        }
       
        return true
    }

    const handleAnswers = (number, type, answer, numberOfAns, index, keySensitive) => {

        if (type === "enumeration" || type === "True Or False") {
            setUserAnswer((oldData) => {
                let newData = [...oldData]

                // Ensure the element at the specific index is an array
                if (!Array.isArray(newData[number]) || numberOfAns > 1) {
                    newData[number] = [];
                }

                newData[number][0] = {
                    type: type,
                    answer: answer,
                    keySensitive: keySensitive,
                }

                return newData
            }) 
        }

        if (type === "choices") {
            setUserAnswer((oldData) => {
                let newData = [...oldData]
                
                // Ensure the element at the specific index is an array
                if (!Array.isArray(newData[number]) || numberOfAns > 1) {
                    newData[number] = []
                }
                
                if (newData[number].length !== 0) {

                    if (newData[number][index]?.answer === answer) {
                        let oldData = [...newData[number]]

                        const result = oldData.filter(data => data !== undefined)
                        .filter(data => data.answer !== answer)

                        console.log(result)

                        newData[number] = result

                    }else {
                     
                         // Push the new answer to the array at the specific index
                        newData[number][index] = {
                            type: type,
                            answer: answer,
                            keySensitive: keySensitive,
                        }
                    }
                }else {
                   
                     // Push the new answer to the array at the specific index
                    newData[number][index] = {
                        type: type,
                        answer: answer,
                        keySensitive: keySensitive,
                    }
                }

               
        
                // Remove duplicates by converting to a Set and then back to an array
                newData[number] = [...new Set(newData[number])]
        
                return newData
            })
        }

        if (type === "fill") {
            setUserAnswer((oldData) => {
                let newData = [...oldData];
                
                // Ensure the element at the specific index is an array
                if (!Array.isArray(newData[number] || numberOfAns > 1)) {
                    newData[number] = []
                }
        
                // Push the new answer to the array at the specific index
                newData[number][index] = {
                    type: type,
                    answer: answer,
                    keySensitive: keySensitive,
                }
        
                // // Remove duplicates by converting to a Set and then back to an array
                // newData[number][index] = [...new Set(newData[number])];
        
                return newData
            });
        }

    }

    const containsAnswer = (answer, letter) => {
    
        if (letter, answer) {
            for (let i = 0; i < answer.length; i++) {

                //Check if the current array is not empty to avoid error
                if (answer[i]) {
                    if (answer[i].answer === letter) {
                        return true
                    }
                }
                
            }
        }

        return false

    }

    const generatePicture = (data) => {
        return 'http://localhost:1/'+ data
    }

    const generateCloseTime = () => {
        const result = convertDateFormat(closedDate)+' ('+convertTo12HourFormat(closedTime)+')'
        if (currentPost) {
            if (currentPost.schedID === 'none') {
                return 'none'
           }
        }
        return result
    }


    const handleStart = () => {
       
        setisShow('take')
        if (duration > 0) {
            setisShowTimer(true)
        }else {
            setenableSubmit(false)
        }

        const { quizID } = quizTakeID
        const room = quizID

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
                    <TimerComponent duration={duration} handleSubmitAnswer={handleSubmitAnswer}/>
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
                                                        onChange={(e) => handleAnswers(target, questions.questionType, e.target.value, questions.numberOfAns, 0, questions.keySensitive)}
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
                                                            onChange={(e) => handleAnswers(target, questions.questionType, e.target.value, questions.numberOfAns, 0, questions.keySensitive)}
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
                                                                className={ containsAnswer(userAnswer[target], chs.letter) ? style.choicesActive : style.choices }
                                                                onClick={(e) => handleAnswers(target, questions.questionType, chs.letter, questions.numberOfAns, index, questions.keySensitive)}
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
                                                                    className={ containsAnswer(userAnswer[target], chs.letter) ? style.choicesActive : style.choices }
                                                                    onClick={(e) => handleAnswers(target, questions.questionType, chs.letter, questions.numberOfAns, index, questions.keySensitive)}
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
                                                                fillLayout
                                                                    .filter((fill) => fill.fillLayoutID === questions.fillLayoutID)
                                                                    .map((fill, index) => (
                                                                        fill.fillType === 'text' && (<h2 className={style.fillText} title='text' key={index}>{fill.fillContent}</h2>) ||
                                                                        fill.fillType === 'blank' && (
                                                                            <input 
                                                                                key={index}
                                                                                className={style.fillBlank}
                                                                                placeholder='Write the answer'
                                                                                required={questions.required ? true : false}
                                                                                onChange={(e) => handleAnswers(target, questions.questionType, e.target.value, questions.numberOfAns, index, questions.keySensitive)}
                                                                                >
                                                                            </input>
                                                                        )
                                                                    ))
                                                            }
                                                        </div>
                                                        <p style={{ fontSize: '8pt'}}>
                                                            <i>Fill {fillLayout.filter((fill) => fill.fillType === 'blank' && fill.fillLayoutID === questions.fillLayoutID).length} answers.{questions.keySensitive ? ' Key senstive answer.' : ' Not key senstive answer.' }{questions.required ? '(REQUIRED).' :''}</i>
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
                                                                                    onChange={(e) => handleAnswers(target, questions.questionType, e.target.value, questions.numberOfAns, index, questions.keySensitive)}
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
                                                            className={ containsAnswer(userAnswer[target], 'true') ? style.choicesActive : style.choices }
                                                            onClick={(e) => handleAnswers(target, questions.questionType,'true', questions.numberOfAns, 0, questions.keySensitive)}
                                                        >
                                                            true 
                                                        </div>
                                                        <div 
                                                            className={ containsAnswer(userAnswer[target], 'false') ? style.choicesActive : style.choices }
                                                            onClick={() => handleAnswers(target, questions.questionType, 'false', questions.numberOfAns, 0, questions.keySensitive)}
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
                                                                className={ containsAnswer(userAnswer[target], 'true') ? style.choicesActive : style.choices }
                                                                onClick={(e) => handleAnswers(target, questions.questionType,'true', questions.numberOfAns, 0, questions.keySensitive)}
                                                            >true
                                                            </div>
                                                            <div 
                                                                className={ containsAnswer(userAnswer[target], 'false') ? style.choicesActive : style.choices }
                                                                onClick={() => handleAnswers(target, questions.questionType, 'false', questions.numberOfAns, 0, questions.keySensitive)}
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
                            <button className={style.btnSubmit} type='submit' disabled={enableSubmitAnswer()}>Submit</button>
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
                        <button className={style.btnBack} onClick={() => setisShow('leaderboards')}>LeaderBoard</button>
                       
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