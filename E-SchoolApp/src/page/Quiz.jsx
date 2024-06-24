import React, {useEffect, useState} from 'react'
import style from './Quiz.module.css'
import { BiSolidRightArrowAlt } from "react-icons/bi"
import { RiImageAddFill } from "react-icons/ri"
import { MdDelete } from "react-icons/md"
import { BsPlusCircleFill } from "react-icons/bs"
import { AiOutlineCloseCircle, AiFillCheckCircle } from "react-icons/ai"
import { Howl, Howler } from "howler";
import notifSound from '../assets/sound/notif.mp3';
import erroSound from '../assets/sound/error.mp3';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PreviewQuiz from './PreviewQuiz'
import axios from 'axios'
import logo from '../assets/logo.png'
import ListPreviewQuiz from './ListPreviewQuiz'
import PrintLayout from '../components/PrintLayout'
import { InfinitySpin } from  'react-loader-spinner';
import sample from '../assets/sample.jpg'
import { FaInfoCircle } from "react-icons/fa";
import { useBankStore } from '../stores/useBankStore'
import { FaThList } from "react-icons/fa";
import { MdOutlinePreview } from "react-icons/md";
import MiniQuizDashboard from '../components/MiniQuizDashboard'
import QuestionEnumeration from '../components/QuestionEnumeration'
import QuestionFillintheBlank from '../components/QuestionFillintheBlank'
import QuestionChoicesQuiz from '../components/QuestionChoicesQuiz'
import QuestionTrueOrFalse from '../components/QuestionTrueOrFalse'


export const Quiz = () => {

const [isShowChoices, setisShowChoices] = useState(false)
const [selectedQuestionType, setselectedQuestionType] = useState('enumeration')
const [showPreview, setshowPreview] = useState('generator')
const [isNoChoices, setNoChoices] = useState(false)
const [tempChoices, setTempChoices] = useState([])
const [isShowImageModal ,setisShowImageModal] = useState(false)
const [isShowThumbnail, setisShowThumbnail] = useState(false)
const [uniqueId, setuniqueId] = useState('') // variable for uniqueID
const [allQuestionData, setAllQuestionData] = useState([])
const [showLoading, setShowLoading] = useState(false)
const [isShowTips, setisShowTips] = useState(false)
const { addBank } = useBankStore()

const [currentFillType, setCurrentFillType] = useState(true)
const [fillContent, setFillContent] = useState('')
const [fillLayoutSet, setfillLayoutSet] = useState([])
const [fillPosition, setfillPosition] = useState(1)

const [totalTextQuizzes, setTotalTextQuizzes] = useState(0)
const [totalChoicesQuizzes, setTotalChoicesQuizzes] = useState(0)
const [totalTORF, setTotalTORF] = useState(0)
const [totalFillIntheBlankQuizzes, setTotalFillIntheBlankQuizzes] = useState(0)

const [letter, setLetter] = useState('E');
const [content, setContent] = useState('');
const [correct, setCorrect] = useState(false);

const [quizTitle, setQuizTitle] = useState('');
const [quizDescription, setQuizDescription] = useState('')
const [subjectName, setsubjectName]  = useState(null) // variable for selected question subject
const [subjectNameList, setsubjectNameList] = useState(null) // storage for subjectname lists
const [required, setrequired] = useState(false);
const [points, setpoints] = useState(1);
const [questionContent, setQuestionContent] = useState(null) // variable for question content
const [questionAnswerText, setQuestionAnswerText] = useState(null) // variable for text-answer to the questions
const [questionNumber, setQuestionNumber] = useState(1) // variable for number per questions
const [keySensitive, setKeySensitive] = useState(false)
const [numberOfAnswer, setNumberOfAnswer] = useState(1) // number of answer per questions
const [selectedImage, setSelectedImage] = useState(null) //Storage for uploaded images
const [imageSetQuestion, setImageSetQuestion] = useState([])
const [choicesID, setChoicesID] = useState(null)
const [trueORFalseAnswer, setTrueOrFalseAnswer] = useState(null)
const [tips, setTips] = useState('')

const [finalQuestionSet, setFinalQuestionSet] = useState([]) // varaible for final set of questions

const [choices, setChoices] = useState([]) //obj

const [questionObj, setQuestionObj] = useState([]) //obj;
const [fillLayout, setFillLayout] = useState([]) //obj

const notif = new Howl({ src: [notifSound]})
const errSound = new Howl({ src: [erroSound]})

let currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})
let currentDate = new Date().toDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        weekday: 'short' 
})

const [choicesA, setChoicesA] = useState({
    choicesID: uniqueId,
    letter: 'A',
    content: '',
    correct: false,
})

const [choicesB, setChoicesB] = useState({
    choicesID: uniqueId,
    letter: 'B',
    content: '',
    correct: false,
})

const [choicesC, setChoicesC] = useState({
    choicesID: uniqueId,
    letter: 'C',
    content: '',
    correct: false,
})

const [choicesD, setChoicesD] = useState({
    choicesID: uniqueId,
    letter: 'D',
    content: '',
    correct: false,
})

useEffect(() => {
    // create a uniqueID for the questionsSet when mount this page
    setuniqueId(generateUniqueID()) 

    axios.get('http://localhost:5001/getSubjects')
    .then(res => setsubjectNameList(res.data))
    .catch(err => console.error(err))

},[])


 const generateTips = () => {
    const tips = [
        'When you create questions it will be store in question bank.',
        'You can create a different type of questions.',
        'After you create questions you can create a quiz with the question you created.',
        'Only faculty account can generate quizes.',
        'You can select any category of subjects.',
    ]

    const random = Math.floor(Math.random() * tips.length)
    return tips[random]
 }

useEffect(()=>{
    getAnalytics()
},[questionObj, choicesA])

const generateFullname = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const generated = user.firstname + ' '+ user.middlename.charAt(0) + '. '+ user.lastname
    return generated
}

const fullname = generateFullname()

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

const generateUniqueID = () => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const length = 8
    let result = ''
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length)
        result += charset.charAt(randomIndex)
    }
   
    return result
}

const deleteAllData = () => {
    setQuestionObj([])
    setChoices([])
    setFillLayout([])
    setImageSetQuestion([])
    setsubjectName('')
    setQuizTitle('')
    setQuizDescription('')
}



const previewShow = (data) => {
    setshowPreview(data)
}

const handleDeleteChoices = (letter) => {
    let data = choices
    const filterData = data.filter((choice) => choice.letter !== letter)
    let updatedData = filterData

    for (let i = 0; i < filterData.length; i++) {
        const letter = String.fromCharCode(69 + i);
        updatedData[i].letter = letter
    }
    setTempChoices(updatedData)
    setChoices(updatedData)
}

const handleCorrect = (isCorrect, letter, Id) => {
    let updatedTempData = [...tempChoices]

   for (let x = 0; x < updatedTempData.length; x++) {
        if (updatedTempData[x].letter === letter) {
            updatedTempData[x].correct = isCorrect;
        }
   }
    setTempChoices(updatedTempData)
}

const handleMenus = (choice) => {
    setselectedQuestionType(choice)
    if (uniqueId.length === 0) {
        generateUniqueID()
    }
}

const handleChangetype = (e) => {
    e.preventDefault()
    setCurrentFillType(!currentFillType)
}

const resetValues = (level) => {
    if (level === 1) {
        const message = 'Question Successfully added!'
        notify(message, 'success')
    }else {
        setQuizTitle('')
        setQuizDescription('')
        setQuestionObj([])
    }
        setfillPosition(1)
        setTrueOrFalseAnswer(null)
        setSelectedImage(null)
        setTempChoices([])
        generateUniqueID()
        setLetter('A')
        setQuestionContent('')
        setrequired(false)
        setKeySensitive(false)
        setpoints(1)
        setFillLayout([])
        setQuestionAnswerText('')
        setisShowThumbnail(false)
}

const getAnalytics = () => {
    const questions = questionObj.filter((question) => question.quizTitle === quizTitle)
    const text = questions.filter(question => question.questionType === 'text').length
    const choices = questions.filter(question => question.questionType === 'choices').length
    const fill = questions.filter(question => question.questionType === 'fill').length
    const torf = questions.filter(question => question.questionType === 'True Or False').length
    
    setTotalFillIntheBlankQuizzes(fill)
    setTotalChoicesQuizzes(choices)
    setTotalTextQuizzes(text)
    setTotalTORF(torf)
}



const handleFileInputChange = (e) => {
    e.preventDefault()
    
    const file = e.target.files[0]
    console.log(file)
    if (file && isImageType(file)) {
        setSelectedImage(file)
    } else {
        const message = 'Only images are allowed'
        notify(message, 'err')
    }

}

const handleCancelImage = (e) => {
    e.preventDefault()
    setisShowImageModal(false)
}

const isImageType = (file) => {
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif']
    const extension = file.name.split('.').pop().toLowerCase()
    return allowedExtensions.includes(extension)
}

const handleUploadImage = (e) => {
    e.preventDefault()

    if (selectedImage) {
        imageSetQuestion.push({
            file: selectedImage,
            imageID: uniqueId,  
        })

        setisShowThumbnail(true)
        setisShowImageModal(false)
        const message = 'Image Uploaded successfully'
        notify(message, 'success')
        
    }else {
        const message = 'Please Insert Image before uploading'
        notify(message, 'err')
    }
    
}

const handleRemoveImage = () => {
    const filter = imageSetQuestion.filter(image => image.imageID != uniqueId)
    setImageSetQuestion(filter)
    setSelectedImage(null)
    setisShowThumbnail(false)
}

const handleSelectSubjectNamee = (e) => {
    setsubjectName(e)
}

const handleDisableUploadBtn = () => {
    const data = imageSetQuestion.filter(image => image.imageID === uniqueId)

    if (data.length > 0) {
        return true
    }else {
        return false
    }
}

const handleUpdatedQuestion = (title, instructions, subject, ques, choicesSet, imageSet, fillLayout) => {
    if (ques) {
        setQuestionObj(ques)
        setQuizTitle(title)
        setQuizDescription(instructions)
        setsubjectName(subject)
    }

    if (choicesSet) {
        setChoices(choicesSet)
    }

    if (imageSet) {
        setImageSetQuestion(imageSet)
    }

    if (fillLayout) {
        setfillLayoutSet(fillLayout)
    }
}

//Add questions to variable questionObject
const handleAddQuestions = () => {

    //If theirs no image uploaded in questions it will return none
    const imageID = selectedImage ? generateUniqueID() : 'none'
    const questionID = generateUniqueID()

    if (selectedQuestionType === 'enumeration') {

        const question = {
            questionID,
            questionNumber: finalQuestionSet.length + 1,
            questionContent: questionContent,
            questionType: selectedQuestionType,
            points: points,
            required: required,
            keySensitive: keySensitive,
            questionAnswerText: questionAnswerText,
            numberOfAns: numberOfAnswer,
            choicesID: 'none',
            imageID: imageID,
            fillLayoutID: 'none',
            subjectName: subjectName,
        }

        setFinalQuestionSet((prevData) => [...prevData, question])
        
    }else if (selectedQuestionType === 'choices') {

        console.log('add q choiceID:', choicesID)

        const question = {
            questionID,
            questionNumber: finalQuestionSet.length + 1,
            questionContent: questionContent,
            questionType: selectedQuestionType,
            points: points,
            required: required,
            keySensitive: keySensitive,
            questionAnswerText: questionAnswerText,
            numberOfAns: numberOfAnswer,
            choicesID,
            imageID: imageID,
            fillLayoutID: 'none',
            subjectName: subjectName,
        }

        setFinalQuestionSet((prevData) => [...prevData, question])
        
    }else if (selectedQuestionType === 'fill') {

        const question = {
            questionID,
            questionNumber: finalQuestionSet.length + 1,
            questionContent: questionContent,
            questionType: selectedQuestionType,
            points: points,
            required: required,
            keySensitive: keySensitive,
            questionAnswerText: 'none',
            numberOfAns: numberOfAnswer,
            choicesID: 'none',
            imageID: imageID,
            fillLayoutID: questionID,
            subjectName: subjectName,
        }

        setFinalQuestionSet((prevData) => [...prevData, question])
        
    }else if (selectedQuestionType === 'TOR') {

        const question = {
            questionID,
            questionNumber: finalQuestionSet.length + 1,
            questionContent: questionContent,
            questionType: selectedQuestionType,
            points: points,
            required: required,
            keySensitive: keySensitive,
            questionAnswerText: questionAnswerText,
            numberOfAns: numberOfAnswer,
            choicesID: 'none',
            imageID: imageID,
            fillLayoutID: 'none',
            subjectName: subjectName,
        }

        setFinalQuestionSet((prevData) => [...prevData, question])
        
    }

    console.log(finalQuestionSet)

}

const handleAnswerTORF = (answer) => {
    setTrueOrFalseAnswer(answer)
}

const addFillLayout = (event) => {
    event.preventDefault()
    if (fillContent) {
        setFillLayout((prevData) => [...prevData, {
            fillType: currentFillType ? 'text' : 'blank',
            fillContent,
            fillPosition,
            fillLayoutID: uniqueId,
        }])
        setfillLayoutSet((prevData) => [...prevData, {
            fillType: currentFillType ? 'text' : 'blank',
            fillContent,
            fillPosition,
            fillLayoutID: uniqueId,
        }])
    }else {
        const message = 'Please insert content.'
        notify(message, 'err')
    }
    setfillPosition((preData) => preData + 1)
    setFillContent('')
}

const addChoices = () =>{
    const total = tempChoices.length
    const updatedLetter = String.fromCharCode(69 + total)

    if (content) {
        setLetter(String.fromCharCode(letter.charCodeAt(0)+1));
        setTempChoices([...tempChoices, {
            choicesID: uniqueId,
            letter: updatedLetter,
            content,
            correct,
        }])
        setNoChoices(false)
        setContent('')
    }else {
        const message = 'Choices must have content.'
        notify(message, 'err')
    }
}

const handleFillLayoutQuestionAdd = (e) => {
    e.preventDefault()

    const ifImageSet = imageSetQuestion.filter((image) => image.imageID === uniqueId)
    let result = ifImageSet.length > 0 ? uniqueId : 'none'
    const num = questionObj.length
    const numberOfAns = fillLayout.filter((fill) => fill.fillType === 'blank').length
    const haveText = fillLayout.filter((fill) => fill.fillType === 'text').length

    if (numberOfAns) {
        if (haveText) {
            if (subjectName) {
                if (fillLayout.length > 0) {
                    setQuestionObj([...questionObj,
                        {
                            questionID: uniqueId,
                            questionContent: 'none',
                            questionNumber: num+1,
                            questionType: 'fill',
                            required,
                            keySensitive,
                            points: parseInt(points),
                            questionAnswerText: 'none',
                            numberOfAns,
                            choicesID: 'none',
                            imageID: result,
                            fillLayoutID: uniqueId,
                            subjectName
                        }
                    ])
                    console.log(questionObj)
                    resetValues(1)
                }else {
                    const message = 'Please insert layout first before adding.'
                    notify(message, 'err')
                }
            }else {
                const message = 'You must provide subject'
                notify(message, 'err')
            }
        }else {
            const message = 'Please insert text layout.'
            notify(message, 'err')
        }
       
    }else {
        const message = 'Please insert blank layout.'
        notify(message, 'err')
    }
            
   
}

const handleChoicesQuestionAdd = (e) => {
    e.preventDefault()
    
    let updatedChoices = []
    updatedChoices.push(choicesA)
    updatedChoices.push(choicesB)
    updatedChoices.push(choicesC)
    updatedChoices.push(choicesD)

    if (tempChoices) {
        for (let i = 0; i < tempChoices.length; i++) {
            updatedChoices.push(tempChoices[i])
        }
    }

    const isContainsTrue = updatedChoices.map((choice) => choice.correct).filter((choice) => choice === true).length;
    const haveImage = !selectedImage ? 'none' : uniqueId;
    const num = questionObj.length
    const numberOfAns = updatedChoices.filter((choice) => choice.correct === true).length

    if (isContainsTrue) {
        if (updatedChoices.length > 0) {
                setQuestionObj([...questionObj,
                    {
                        questionID: uniqueId,
                        questionContent,
                        questionNumber: num+1,
                        questionType: 'choices',
                        required,
                        keySensitive: false,
                        points: parseInt(points),
                        questionAnswerText: 'none',
                        numberOfAns,
                        choicesID: uniqueId,
                        imageID: haveImage,
                        fillLayoutID: 'none',
                        subjectName,
                    }
                ])

                for (let x = 0; x < updatedChoices.length; x++) {
                    updatedChoices[x].choicesID = uniqueId;
                }

                for (let i = 0; i < updatedChoices.length; i++) {
                    choices.push(updatedChoices[i])
                }

                updatedChoices=[]
                resetValues(1)
                generateUniqueID()
                setChoicesA({
                    choicesID: uniqueId,
                    letter: 'A',
                    content: '',
                    correct: false,
                })
                setChoicesB({
                    choicesID: uniqueId,
                    letter: 'B',
                    content: '',
                    correct: false,
                })
                setChoicesC({
                    choicesID: uniqueId,
                    letter: 'C',
                    content: '',
                    correct: false,
                })
                setChoicesD({
                    choicesID: uniqueId,
                    letter: 'D',
                    content: '',
                    correct: false,
                })
                setTempChoices([])
        }else {
            setNoChoices(true)
            const message = 'Must add choices!'
            notify(message, 'err')
        }
    }else {
        const message = 'Choices must have atleast one correct answer!'
        notify(message, 'err')
    }
   
}

const handleEnumerationAdd = (e) => {
    e.preventDefault()
    
    const ifImageSet = imageSetQuestion.filter((image) => image.imageID === uniqueId)
    let result = ifImageSet.length > 0 ? uniqueId : 'none'
    const num = questionObj.length

        if (subjectName) {
            setQuestionObj([...questionObj,
                {
                    questionID: uniqueId,
                    questionContent,
                    questionNumber: num+1,
                    questionType: 'enumeration',
                    required,
                    keySensitive,
                    points: parseInt(points),
                    questionAnswerText,
                    numberOfAns: 1,
                    choicesID: 'none',
                    imageID: result,
                    fillLayoutID: 'none',
                    subjectName,
                }
            ])
            resetValues(1)
        }else {
            const message = 'You must select subject'
            notify(message, 'err')
        }

}

const handleTORFquestionAdd = (e) => {
    e.preventDefault()
    const ifImageSet = imageSetQuestion.filter((image) => image.imageID === uniqueId)
    let result = ifImageSet.length > 0 ? uniqueId : 'none'
    const num = questionObj.length

        if (subjectName) {
            if (questionContent) {
                if (trueORFalseAnswer !== null) {
                    setQuestionObj([...questionObj,
                        {
                            questionID: uniqueId,
                            questionContent,
                            questionNumber: num+1,
                            questionType: 'True Or False',
                            required,
                            keySensitive: 'none',
                            points: parseInt(points),
                            questionAnswerText: trueORFalseAnswer,
                            numberOfAns: 1,
                            choicesID: 'none',
                            imageID: result,
                            fillLayoutID: 'none',
                            subjectName
                        }
                    ])
                    resetValues(1)
                }else {
                    const message = 'You must select either TRUE or FALSE'
                    notify(message, 'err')
                }
            }else {
                const message = 'Question is empty'
                notify(message, 'err')
            }

        }else {
            const message = 'You must select subject'
            notify(message, 'err')
        }

}

const computeTotalPoints = () => {
    let total = 0
    for (let i = 0; i < questionObj.length; i++) {
        const points = parseInt(questionObj[i].points);
        total += points
    }
    return total
}

const handleFinalQuestion = () => {
    setShowLoading(true)
    const id = uniqueId
    const totalPoints = computeTotalPoints()
    const totalQuestions = questionObj.length

    if (quizTitle) {

            const obj = {
                bankID: id,
                bankTitle: quizTitle,
                subjectName,
                questionID: id,
                totalPoints,
                totalQuestions,
                time: currentTime,
                date: currentDate,
            }

            addBank(obj)

            if(questionObj.length > 0){
                for (let i = 0; i < questionObj.length; i++) {
                    const dataObj = questionObj[i]
                    axios.post('http://localhost:5001/questions', { dataObj, id } )
                    .then(res => {
                        resetValues(2)
                    })
                    .catch(err => console.log(err))
                }
                setTimeout(() => {
                    setShowLoading(false)
                    const message = `${questionObj.length} question Successfully Saved! `
                    notify(message, 'success')
                }, 3000);    
            }
        
            if (choices.length > 0 ) {
          
                for (let i = 0; i < choices.length; i++) {
                    const dataObj = choices[i]
                    axios.post('http://localhost:5001/choices', { dataObj } )
                    .then(res => {
                        console.log(res)
                        setChoices([])
                    })
                    .catch(err => console.log(err))
                }
            }
        
            if (imageSetQuestion.length > 0) {
                
                for (let i = 0; i < imageSetQuestion.length; i++) {
                    const { imageID, file} = imageSetQuestion[i]
                    const formData = new FormData()
                    formData.append('image', file)
                    formData.append('imageID', imageID)
        
                    axios.post('http://localhost:5001/upload', formData, {
                        headers: {
                        'Content-Type': 'multipart/form-data',
                        },
                    })
                    .then(response => {
                        console.log(response.data)
                        setImageSetQuestion([])
                    })
                    .catch(error => console.log(error))          
                }
            }
        
            if (fillLayoutSet.length > 0) {
                for (let i = 0; i < fillLayoutSet.length; i++) {
                    const data = fillLayoutSet[i];
                    axios.post('http://localhost:5001/fillLayout', { data } )
                    .then(res => {
                        console.log(res.data)
                        setfillLayoutSet([])
                    })
                    .catch(err => console.log(err))
                }
                
            }

    }else {
        const message = 'Insert title.'
        notify(message, 'err')
    }

     clearImmediate(tipsInterval)
}


const generateTotalPoints = () => {
    if (questionObj.length > 0) {
        let total = 0

        for (let i = 0; i < questionObj.length; i++) {
            total += questionObj[i].points
        }

        return total
    }
    return 0
}

// Check if the questions is valid it will enabled the button
const checkIfTheQuestionIsValid = () => {

    if (selectedQuestionType === 'enumeration' || selectedQuestionType === 'TOR') {
        if (questionContent && questionAnswerText) {
            return false
        }else {
            return true
        }
    }

    if (selectedQuestionType === 'choices') {
        if (choices.length !== 0 && questionContent) {
            return false
        }else {
            return true
        }
    }

    if (selectedQuestionType === 'fill') {
        if (fillLayout.length !== 0) {
            return false
        }else {
            return true
        }
    }

}

const handleSubmitFinalQuestions = () => {
    console.log('choices:',choices)
    console.log('fillLayout:',fillLayout)
    console.log('final:',finalQuestionSet)
    console.log('images:', imageSetQuestion)

    if (finalQuestionSet.length > 0) {

        const data = {
            choices,
            fillLayout,
            finalQuestionSet,
        }

        
        axios.post('http://localhost:5001/questions/addQuestions', data)
        .then((res) => {
            const data = res.data
            console.log(data.message)
        })
        .catch((error) => console.log(error))

        if (imageSetQuestion.length > 0) {
            for (let i = 0; i < imageSetQuestion.length; i++) {
                
                const formData = new FormData
                formData.append('image', imageSetQuestion[i].file)
                formData.append('imageID', imageSetQuestion[i].imageID)
                formData.append('dateUploaded', imageSetQuestion[i].datePosted)
                formData.append('timeUploaded', imageSetQuestion[i].timePosted)
                formData.append('acctID', imageSetQuestion[i].acctID)
                formData.append('classCode', imageSetQuestion[i].classCode)

                axios.post('http://localhost:5001/images/addImage', formData)
                .then((res) => {
                    const data = res.data
                    console.log(data.message)
                })
                .catch((error) => console.log(error))
            }  
        }




    }

}

const handleSetQuestionTitle = (data) => {
    setQuizTitle(data)
}

const handleSetQuestionDescription = (data) => {
    setQuizDescription(data)
}

const handleSetSelectedImage = (data) => {
    setSelectedImage(data)
}

const handleSetQuestionContent = (data) => {
    setQuestionContent(data)
}

const handleSetQuestionAnswerText = (data) => {
    setQuestionAnswerText(data)
}

const handleSetNumberOfAnswer= (data) => {
    setNumberOfAnswer(data)
}

const handleSetSubjectName = (data) => {
    setsubjectName(data)
}

const handleSetImageSetQuestion = (data) => {
    setImageSetQuestion((oldData) => [...oldData, data])
}

const handleSetChoices = (data) => {
    console.log('update choices:', choices)
    setChoices((oldData) => [...oldData, ...data])
}

const handleSetFinalQuestionSet = (data) => {
    console.log('data', data)
    setFinalQuestionSet((oldData) => [...oldData, data])
}

const handleSetFillLayout = (data) => {
    setFillLayout((oldData) => [...oldData, ...data])
}

const handleSetUniqueID = (data) => {
    setuniqueId(data)
}

const handleNotificationFromChild = (message, type) => {
    notify(message, type)
}

const handleSetChoicesID = (data) => {
    setChoicesID(data)
}

//Reset all questions variables
const resetQuestionsVariables = () => {
    setChoices([])
    setQuestionAnswerText(null)
    setQuestionContent(null)
    setpoints(1)
    setrequired(false)
    setKeySensitive(false)
    setSelectedImage(null)
    setTrueOrFalseAnswer(null)
}


  return (
    <>

            {
                showLoading && (
                    <div className={style.exitTrapNotif}>
                        <InfinitySpin 
                            width='200'
                            color="#099AED"
                        />
                        <h2>Loading...</h2>
                        <p>Saving the questions.</p>
                    </div>
                )
            }

        {
            showPreview === 'printLayout' && ( 
                <PrintLayout
                    className={style.ListPreviewQuiz}
                    previewShow={previewShow}
                    quizTitle={quizTitle}
                    quizDescription={quizDescription}
                    finalQuestionSet={finalQuestionSet}
                    choices={choices}
                    imageSetQuestion={imageSetQuestion}
                    fillLayoutSet={fillLayoutSet}
                    subjectNameList={subjectNameList}
                    handleUpdatedQuestion={handleUpdatedQuestion}
                    deleteAllData={deleteAllData}
                    
                />
            )
        }

        {
            showPreview === 'previewList' && (
                <ListPreviewQuiz
                    className={style.ListPreviewQuiz}
                    previewShow={previewShow}
                    quizTitle={quizTitle}
                    quizDescription={quizDescription}
                    finalQuestionSet={finalQuestionSet}
                    choices={choices}
                    imageSetQuestion={imageSetQuestion}
                    fillLayoutSet={fillLayoutSet}
                    subjectNameList={subjectNameList}
                    handleUpdatedQuestion={handleUpdatedQuestion}
                    deleteAllData={deleteAllData}
                    handleNotificationFromChild={handleNotificationFromChild}
                />
            )
        }
        {
            showPreview === 'preview' && (

                <PreviewQuiz 
                    id={style.previewQuiz}
                    onData={previewShow}
                    quizTitle={quizTitle}
                    quizDescription={quizDescription}
                    questionObj={questionObj}
                    choices={choices}
                    fillLayoutSet={fillLayout}
                    imageSetQuestion={imageSetQuestion}
                    finalQuestionSet={finalQuestionSet}
                />
            )  
        }

        {
            showPreview === 'generator' && (
                <div className={style.container}>
                    <div className={style.tipsContainer}>
                        <div className='d-flex align-items-center gap-2'>
                            <FaInfoCircle size={19} color='#099AED'/>
                            <h2>YOU NEED TO KNOW:</h2>
                        </div>
                        <p id={style.tipsContent}>{generateTips()}</p>
                    </div>
                    
                    <div className={style.content}>
                        <ToastContainer/>   
                        {
                            isShowImageModal && (
                                <div className={style.imageModal}>
                                    <div className='w-50 d-flex align-items-center justify-content-center h-50 p-2'>
                                        <img src={ selectedImage ? URL.createObjectURL(selectedImage) : logo } alt="" height={200}/>
                                    </div>
                                    <p>Upload Image</p>
                                
                                    <div className="input-group mb-3">
                                        <input
                                            type="file"
                                            className="form-control"
                                            accept="image/*"
                                            onChange={handleFileInputChange}
                                            aria-describedby="inputGroupFileAddon03"
                                            aria-label="Upload"/>
                                    </div>
                                    <div className='d-flex gap-3'>
                                        
                                        {
                                            selectedImage && (
                                                <>
                                                    <button className='btn btn-primary' disabled={handleDisableUploadBtn()} onClick={handleUploadImage}>Upload</button>
                                                    <button className='btn btn-danger' onClick={handleRemoveImage}>Remove</button>
                                                </>
                                               
                                            ) 
                                        }
                                        <button className='btn btn-warning' onClick={handleCancelImage}>Cancel</button>
                                    </div>
                                </div>
                            )
                        }
                        <div className={style.left}>
                            <MiniQuizDashboard 
                                finalQuestionSet={finalQuestionSet}
                                quizTitle={quizTitle}
                                quizDescription={quizDescription}
                                subjectNameList={subjectNameList}
                                handleSetSubjectName={handleSetSubjectName}
                                handleSetQuestionTitle={handleSetQuestionTitle}
                                subjectName={subjectName}
                                quiz
                                handleSetQuestionDescription={handleSetQuestionDescription}
                            />
    
                        </div>
        
                        <div className={style.right}>
                            <div className={style.headMenu}>
                                <div className={style.queNumCard}>
                                    Question Number: {finalQuestionSet.length + 1}
                                </div>
                                <div className='d-flex gap-2 align-items-center'>
                                    {
                                        finalQuestionSet.length > 0 &&
                                        <>
                                            <div 
                                                className={style.circleBtn} 
                                                title='Preview' 
                                                onClick={() => setshowPreview('preview')}
                                            >
                                                <MdOutlinePreview size={18} color='white' cursor={'pointer'}/>
                                            </div>
                                            <div 
                                                className={style.circleBtn} 
                                                title='List' 
                                                onClick={() => setshowPreview('previewList')}
                                            >
                                                <FaThList size={15} color='white' cursor={'pointer'}/>
                                            </div>
                                        </>
                                    }

                                    <button id={style.btnSubmitQues} onClick={handleSubmitFinalQuestions}>Submit</button>
                                </div>
                                
                            </div>
                            <div className={style.contentQuestion}>
                                <div className={style.headMenuContent}>
                                    <h1>Question Type:</h1>
                                    <div className={style.listBtnMenu}>
                                        <button className={selectedQuestionType === 'enumeration' ? style.btnQuesTypeActive : style.btnQuesType} onClick={() => {setselectedQuestionType('enumeration')}}>Enumeration</button>
                                        <button className={selectedQuestionType === 'choices' ? style.btnQuesTypeActive : style.btnQuesType} onClick={() => {setselectedQuestionType('choices')}}>Choices Quiz</button>
                                        <button className={selectedQuestionType === 'fill' ? style.btnQuesTypeActive : style.btnQuesType} onClick={() => {setselectedQuestionType('fill')}}>Fill in the Blank</button>
                                        <button className={selectedQuestionType === 'TOR' ? style.btnQuesTypeActive : style.btnQuesType} onClick={() => {setselectedQuestionType('TOR')}}>True or False</button>
                                    </div>
                                </div>
                                <div className={style.contentFillQuestion}>
                                    {selectedQuestionType === 'enumeration' &&  
                                        <QuestionEnumeration 
                                            finalQuestionSet={finalQuestionSet}
                                            subjectName={subjectName}
                                            handleSetImageSetQuestion={handleSetImageSetQuestion}
                                            handleSetFinalQuestionSet={handleSetFinalQuestionSet}
                                            handleNotificationFromChild={handleNotificationFromChild}
                                        />
                                    }

                                    {selectedQuestionType === 'choices' && 
                                        <QuestionChoicesQuiz 
                                            finalQuestionSet={finalQuestionSet}
                                            subjectName={subjectName}
                                            handleSetChoices={handleSetChoices}
                                            handleSetImageSetQuestion={handleSetImageSetQuestion}
                                            handleSetFinalQuestionSet={handleSetFinalQuestionSet}
                                            handleNotificationFromChild={handleNotificationFromChild}
                                        />
                                    }

                                    {selectedQuestionType === 'fill' &&  
                                        <QuestionFillintheBlank 
                                            finalQuestionSet={finalQuestionSet}
                                            subjectName={subjectName}
                                            handleSetFillLayout={handleSetFillLayout}
                                            handleSetImageSetQuestion={handleSetImageSetQuestion}
                                            handleSetFinalQuestionSet={handleSetFinalQuestionSet}
                                            handleNotificationFromChild={handleNotificationFromChild}
                                            
                                        />
                                    }

                                    {selectedQuestionType === 'TOR' && 
                                        <QuestionTrueOrFalse 
                                        finalQuestionSet={finalQuestionSet}
                                        subjectName={subjectName}
                                        handleSetImageSetQuestion={handleSetImageSetQuestion}
                                        handleSetFinalQuestionSet={handleSetFinalQuestionSet}
                                        handleNotificationFromChild={handleNotificationFromChild}
                                        />
                                    }
                                </div>
                            </div>


                        </div>
                        
                    </div>
                    
                </div>   
            )
        }

    </>
  )
}
