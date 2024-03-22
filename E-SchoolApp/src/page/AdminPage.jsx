import React, { useEffect, useState } from 'react'
import style from './AdminPage.module.css'
import sample from '../assets/sample.jpg'
import titleLogo from '../assets/title.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Howl, Howler } from "howler";
import notifSound from '../assets/sound/notif.mp3';
import erroSound from '../assets/sound/error.mp3';
import { MdSupervisorAccount } from "react-icons/md"
import { useImageStore } from '../stores/useImageStore'
import { useAccountStore } from '../stores/useAccountsStore'
import { useClassStore } from '../stores/useClassStore'
import { usePostStore } from '../stores/usePostStore'
import { useMemberStore } from '../stores/useMemberStore'
import { useQuestionsStore } from '../stores/useQuestionsStore'
import { useFillLayoutStore } from '../stores/useFillLayoutStore'
import { useChoicesStore } from '../stores/useChoicesStore'
import { useQuizStore } from '../stores/useQuizStore'
import { useMessageStore } from '../stores/useMessageStore'
import { useFriendStore } from '../stores/useFriendStore'
import { useFilesStore } from '../stores/useFilesStore'
import { useScheduleStore } from '../stores/useScheduleStore'
import { useSubjectsStore } from '../stores/useSubjectsStore'
import { FaPlus } from "react-icons/fa6";
import { MdExitToApp } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { ProgressBar } from  'react-loader-spinner';


const AdminPage = () => {

const [choose, setChoose] = useState('accounts')
const [uniqueID, setuniqueID] = useState()
const currentUser = JSON.parse(localStorage.getItem('user'))
const { getAccounts, deleteAccount, addAccounts, updateAccounts } = useAccountStore()
const { getClass, deleteClass, addClasses, updateClass} = useClassStore()
const { getImages, deleteImages, addImage } = useImageStore()
const { getPost, deletePost, addPost} = usePostStore()
const { getMembers, deleteMembers, addMember, updateMember } = useMemberStore()
const { getQuestion, deleteQuestions, addQuestion } = useQuestionsStore()
const { getFillLayout, deleteFillLayout, addFillLayout } = useFillLayoutStore()
const { getChoices, deleteChoices, addChoices } = useChoicesStore()
const { getQuiz, deleteQuiz, addQuiz} = useQuizStore()
const { getMessages, deleteMessages, addMessage } = useMessageStore()
const { getFriend, deleteFriend, addFriend, updateFriend} = useFriendStore()
const { getFiles, deleteFiles, addFiles } = useFilesStore()
const { getSchedule, deleteSchedule, addSchedule } = useScheduleStore()
const { getSubjects, deleteSubject, addSubject, updateSubject} = useSubjectsStore()
const [isShowModal, setisShowModal] = useState(false)
const [showProfileCard, setShowProfileCard] = useState(false)
const [isShowModalEdit, setisShowModalEdit] = useState(false)
const [editChoose, seteditChoose] = useState('')

const [accountSet, setaccountSet] = useState()
const [choicesSet, setchoicesSet] = useState()
const [classesSet, setclassesSet] = useState()
const [filesSet, setfilesSet] = useState()
const [fillLayoutSet, setfillLayoutSet] = useState()
const [friendsSet, setfriendsSet] = useState()
const [imagesSet, setimagesSet] = useState()
const [membersSet, setmembersSet] = useState()
const [messagesSet, setmessagesSet] = useState()
const [postSet, setpostSet] = useState()
const [questionsSet, setquestionsSet] = useState()
const [quizSet, setquizSet] = useState()
const [scheduleSet, setscheduleSet] = useState()
const [subjectSet, setsubjectSet] = useState()

const notif = new Howl({ src: [notifSound]})
const errSound = new Howl({ src: [erroSound]})

useEffect(() => {
    getSchedule() 
    getFriend()
    getQuiz()
    getChoices()
    getQuestion()
    getFillLayout()
    getMembers()
    getClass()
    getPost()
    getImages()
    getAccounts()
    getMessages()
    getFiles()
    getSubjects()
    generateUniqueId()

    setTimeout(() => {
      generateDatas()
      setshowLoading(false)
    }, 5000);

},[])


const generateDatas = () => {
    setimagesSet(JSON.parse(localStorage.getItem('images')))
    setaccountSet(JSON.parse(localStorage.getItem('accounts')))
    setchoicesSet(JSON.parse(localStorage.getItem('choices')))
    setclassesSet(JSON.parse(localStorage.getItem('class')))
    setfilesSet(JSON.parse(localStorage.getItem('files')))
    setfillLayoutSet(JSON.parse(localStorage.getItem('fillLayout')))
    setfriendsSet(JSON.parse(localStorage.getItem('friends')))
    setmembersSet(JSON.parse(localStorage.getItem('members')))
    setmessagesSet(JSON.parse(localStorage.getItem('messages')))
    setpostSet(JSON.parse(localStorage.getItem('post')))
    setquestionsSet(JSON.parse(localStorage.getItem('questions')))
    setquizSet(JSON.parse(localStorage.getItem('quiz')))
    setscheduleSet(JSON.parse(localStorage.getItem('schedules')))
    setsubjectSet(JSON.parse(localStorage.getItem('subjects')))
}

const [accountID, setAccountID] = useState()
const [accountType, setAccountType] = useState('student')
const [email, setEmail] = useState()
const [password, setPassword] = useState()
const [firstname, setFirstname] = useState()
const [middlename, setMiddlename] = useState()
const [lastname, setLastname] = useState()
const [status, setStatus] = useState('offline')
const [imageID, setImageID] = useState()

const [choicesID, setchoicesID] = useState()
const [letter, setLetter] = useState()
const [content, setContent] = useState()
const [correct, setCorrect] = useState()

const [classID, setClassID] = useState()
const [className, setClassName] = useState()
const [classDescription, setClassDescription] = useState()
const [classCode, setClassCode] = useState()
const [membersID, setMembersID] = useState()
const [hiddden, setHiddden] = useState()

const [id, setId] = useState()
const [name, setName] = useState()
const [type, setType] = useState()
const [data, setData] = useState()
const [fileID, setFileID] = useState()

const [fillContent, setFillContent] = useState()
const [fillType, setFillType] = useState()
const [fillPosition, setFillPosition] = useState()
const [fillLayoutID, setFillLayoutID] = useState()

const [friendAccountID, setFriendAccountID] = useState()
const [fullName, setFullName] = useState()

const [firstName, setFirstName] = useState()
const [middleName, setMiddleName] = useState()
const [memberType, setMemberType] = useState()

const [messageID, setMessageID] = useState()
const [roomID, setRoomID] = useState()
const [messageContent, setMessageContent] = useState()
const [messageSender, setMessageSender] = useState()
const [messageReceiver, setMessageReceiver] = useState()
const [date, setDate] = useState()
const [time, setTime] = useState()

const [postID, setPostID] = useState()
const [timePosted, setTimePosted] = useState()
const [datePosted, setDatePosted] = useState()
const [postContent, setPostContent] = useState()
const [replyID, setReplyID] = useState()
const [heartCount, setHeartCount] = useState()
const [likeCount, setLikeCount] = useState()
const [subjectName, setSubjectName] = useState()
const [postType, setPostType] = useState()
const [quizID, setQuizID] = useState()
const [scheduleID, setScheduleID] = useState()
const [duration, setDuration] = useState()
const [random, setRandom] = useState()

const [questionID, setQuestionID] = useState()
const [questionNumber, setQuestionNumber] = useState()
const [questionContent, setQuestionContent] = useState()
const [questionType, setQuestionType] = useState()
const [points, setPoints] = useState()
const [required, setRequired] = useState()
const [keySensitive, setKeySensitive] = useState()
const [questionAnswerText, setQuestionAnswerText] = useState()
const [numberOfAnswer, setNumberOfAnswer] = useState()
const [hidden, setHidden] = useState()

const [quizTitle, setQuizTitle] = useState()
const [quizInstructions, setQuizInstruction] = useState()
const [totalPoints, setTotalPoints] = useState()
const [totalQuestions, setTotalQuestions] = useState()
const [creator, setCreator] = useState()

const [schedID, setSchedID] = useState()
const [scheduleDate, setScheduleDate] = useState()
const [scheduleTime, setScheduleTime] = useState()
const [dueDate, setDueDate] = useState()
const [dueTime, setDueTime] = useState()
const [closeDate, setCloseDate] = useState()
const [closeTime, setCloseTime] = useState()
const [imageFile, setImageFile] = useState()

const [subjectCode, setSubjectCode] = useState()
const [currentID, setcurrentID] =useState()
const [showLoading, setshowLoading] = useState(true)

const generateUniqueId = () => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const length = 8
    let result = ''
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length)
        result += charset.charAt(randomIndex)
    }
    setuniqueID(result)
}

const handleUploadImage = (e) => {
    const file = e.target.files[0]
    if (file) {
        setImageFile({
            imageID: uniqueID,
            file,
        })
    }
}

const handleEdit = (state, choose, id) => {
    setisShowModalEdit(state)
    setAddChoose(choose)
    setcurrentID(id)

    if (choose === 'accounts') {
        const filter = accountSet.filter((act) => act.acctID === id)

        setAccountID(filter[0].acctID)
        setAccountType(filter[0].acctype)
        setEmail(filter[0].email)
        setPassword(filter[0].password)
        setFirstname(filter[0].firstname)
        setMiddlename(filter[0].middlename)
        setLastname(filter[0].lastname)
        setStatus(filter[0].status)
        setImageID(filter[0].imageID)

        setisShowModalEdit(true)
    }

    if (choose === 'choices') {
        const filter = choicesSet.filter((choice) => choice.id === id)

        setchoicesID(filter[0].choicesID)
        setLetter(filter[0].letter)
        setContent(filter[0].content)
        setCorrect(filter[0].correct)
        
    }
    
    if (choose === 'class') {
        const filter = classesSet.filter((classes) => classes.classID  === id)

        setClassID(filter[0].classID )
        setClassName(filter[0].className)
        setClassDescription(filter[0].classDesc)
        setClassCode(filter[0].classCode)
        setMembersID(filter[0].membersID)
        setImageID(filter[0].imageID)
        setHiddden(filter[0].hidden)

        const data = {
            classID: filter[0].classID,
            className: filter[0].className,
            classDesc: filter[0].classDesc,
            classCode: filter[0].classCode,
            membersID: filter[0].membersID,
            imageID: filter[0].imageID,
            lastname: filter[0].lastname,
            hidden: filter[0].hidden
        }

        updateAccounts(data)
    }

    if (choose === 'files') {
        const filter = filesSet.filter((files) => files.id === id)

        console.log(filter)
        setId(filter[0].id)
        setName(filter[0].name)
        setType(filter[0].type)
        setData(filter[0].data)
        setFileID(filter[0].fileID)
    }

    if (choose === 'fillLayout') {
        const filter = fillLayoutSet.filter((fillLayout) => fillLayout.id === id)

        setId(filter[0].id)
        setFillContent(filter[0].fillContent)
        setFillType(filter[0].fillType)
        setFillPosition(filter[0].fillPosition)
        setFillLayoutID(filter[0].fillLayoutID)
    }

    if (choose === 'friends') {
        const filter = friendsSet.filter((friend) => friend.id === id)

        setId(filter[0].id)
        setAccountID(filter[0].acctID)
        setFriendAccountID(filter[0].friendAcctID)
        setFullName(filter[0].fullname)

        const data = {
            id : filter[0].id ,
            acctID: filter[0].acctID,
            friendAcctID: filter[0].friendAcctID,
            fullname: filter[0].fullname,
        }

        updateAccounts(data)
    }

    if (choose === 'image') {
        const filter = imagesSet.filter((img) => img.id === id)

        setId(filter[0].id)
        setName(filter[0].name)
        setType(filter[0].type)
        setData(filter[0].data)
        setImageID(filter[0].imageID)
    }

    if (choose === 'members') {
        const filter = membersSet.filter((member) => member.ID === id)

        setId(filter[0].ID)
        setMembersID(filter[0].membersID)
        setAccountID(filter[0].acctID)
        setMiddleName(filter[0].midleName)
        setFirstName(filter[0].firstName)
        setLastname(filter[0].lastName)
        setMemberType(filter[0].memberType)
        setHiddden(filter[0].hidden)

        const data = {
            ID : filter[0].ID ,
            membersID: filter[0].membersID,
            acctID: filter[0].acctID,
            firstName: filter[0].firstName,
            midleName: filter[0].midleName,
            lastName: filter[0].lastName,
            memberType: filter[0].memberType,
            hidden: filter[0].hidden
        }

        updateAccounts(data)
    }

    if (choose === 'messages') {
        const filter = messagesSet.filter((message) => message.id === id)

        setId(filter[0].id)
        setMessageID(filter[0].messageID)
        setRoomID(filter[0].roomID)
        setMessageContent(filter[0].messageContent)
        setMessageSender(filter[0].messageSender)
        setMessageReceiver(filter[0].messageReceiver)
        setDate(filter[0].date)
        setTime(filter[0].time)
    }

    if (choose === 'post') {
        const filter = postSet.filter((posted) => posted.id === id)

        setId(filter[0].id)
        setPostID(filter[0].postID)
        setAccountID(filter[0].acctID)
        setName(filter[0].name)
        setTimePosted(filter[0].timePosted)
        setDatePosted(filter[0].datePosted)
        setPostContent(filter[0].postContent)
        setReplyID(filter[0].replyID)
        setImageID(filter[0].imageID)
        setFileID(filter[0].fileID)
        setHeartCount(filter[0].heartCount)
        setLikeCount(filter[0].likeCount)
        setClassCode(filter[0].classCode)
        setSubjectName(filter[0].subjectName)
        setPostType(filter[0].postType)
        setQuizID(filter[0].quizID)
        setScheduleID(filter[0].schedID)
        setDuration(filter[0].duration)
        setRandom(filter[0].random)

        const data = {
            id  : filter[0].id  ,
            postID: filter[0].postID,
            acctID: filter[0].acctID,
            name: filter[0].name,
            timePosted: filter[0].timePosted,
            datePosted: filter[0].datePosted,
            postContent: filter[0].postContent,
            replyID: filter[0].replyID,
            imageID : filter[0].imageID ,
            fileID: filter[0].fileID,
            heartCount: filter[0].heartCount,
            likeCount: filter[0].likeCount,
            classCode: filter[0].classCode,
            subjectName: filter[0].subjectName,
            postType: filter[0].postType,
            schedID: filter[0].schedID,
            duration: filter[0].duration,
            random: filter[0].random
        }

        updateAccounts(data)
    }

    if (choose === 'questions') {
        const filter = questionsSet.filter((quest) => quest.id === id)

        setId(filter[0].id)
        setQuestionID(filter[0].questionID)
        setQuestionNumber(filter[0].questionNumber)
        setQuestionContent(filter[0].questionContent)
        setQuestionType(filter[0].questionType)
        setPostContent(filter[0].postContent)
        setPoints(filter[0].points)
        setRequired(filter[0].required)
        setKeySensitive(filter[0].keySensitive)
        setQuestionAnswerText(filter[0].questionAnswerText)
        setNumberOfAnswer(filter[0].numberOfAns)
        setchoicesID(filter[0].choicesID)
        setImageID(filter[0].imageID)
        setFillLayoutID(filter[0].fillLayoutID)
        setSubjectName(filter[0].subjectName)
    }

    if (choose === 'quiz') {
        const filter = quizSet.filter((quiz) => quiz.id === id)

        setQuizID(filter[0].quizID)
        setQuizTitle(filter[0].quizTitle)
        setQuizInstruction(filter[0].quizInstructions)
        setQuestionID(filter[0].questionID)
        setSubjectName(filter[0].subjectName)
        setTotalPoints(filter[0].totalPoints)
        setTotalQuestions(filter[0].totalQuestions)
        setCreator(filter[0].creator)
        setTime(filter[0].time)
        setDate(filter[0].date)
    }

    if (choose === 'schedule') {
        const filter = scheduleSet.filter((sched) => sched.id === id)

        setId(filter[0].id)
        setScheduleID(filter[0].schedID)
        setPostID(filter[0].postID)
        setScheduleDate(filter[0].schedDate)
        setScheduleTime(filter[0].schedTime)
        setDueDate(filter[0].dueDate)
        setDueTime(filter[0].dueTime)
        setCloseDate(filter[0].closeDate)
        setCloseTime(filter[0].closeTime)
    }

    if (choose === 'subject') {
        const filter = subjectSet.filter((subj) => subj.id === id)
        console.log(filter)
        setId(filter[0].id)
        setSubjectName(filter[0].subjectName)
        setSubjectCode(filter[0].subjectCode)

        const data = {
            id  : filter[0].id  ,
            subjectName: filter[0].subjectName,
            subjectCode: filter[0].subjectCode
        }

        updateAccounts(data)
    }
}

const navigate = useNavigate()

const handleLogout = () => {
    localStorage.clear()
    navigate('/')
}

const handleChoose = (data) => {
    setChoose(data)
}

const generateFullname = () => {
    return currentUser.firstname+' '+currentUser.middlename+'. '+currentUser.lastname
}

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

const generateProfilePic = () => {
    if (currentUser && imagesSet) {
        
        const filter = imagesSet.filter((images) => images.imageID === currentUser.imageID).map((img) => img.data)
        return 'http://localhost:5001/'+filter[0]
    }
    
}

const fullname = generateFullname()
const [addChoose, setAddChoose] = useState()

/// DELETE SECTIONS ///

const handleDelete = (data, fieldName) => {

    if (fieldName === 'accounts') {
        deleteAccount(data)
        const filter = accountSet.filter((account) => account.acctID !== data)
        setaccountSet(filter)

        const message = 'Account deleted'
        notify(message, 'success')
    }
    
    if (fieldName === 'choices') {
        deleteChoices(data)
        const filter = choicesSet.filter((choices) => choices.id !== data)
        
        setchoicesSet(filter)
        const message = 'Choices deleted'
        notify(message, 'success')
    }

    if (fieldName === 'class') {
        deleteClass(data)
        const filter = classesSet.filter((cls) => cls.classID !== data)
        setclassesSet(filter)
        const message = 'Class deleted'
        notify(message, 'success')
    }

    if (fieldName === 'files') {
        deleteFiles(data)
        const filter = filesSet.filter((file) => file.id !== data)
        setfilesSet(filter)
        const message = 'File deleted'
        notify(message, 'success')
    }

    if (fieldName === 'fillLayout') {
        deleteFillLayout(data)
        const filter = fillLayoutSet.filter((fill) => fill.id !== data)
        setfillLayoutSet(filter)
        const message = 'FillLayout deleted'
        notify(message, 'success')
    }

    if (fieldName === 'friends') {
        deleteFriend(data)
        const filter = friendsSet.filter((frd) => frd.id !== data)
        setfriendsSet(filter)
        const message = 'Friend deleted'
        notify(message, 'success')
    }

    if (fieldName === 'images') {
        deleteImages(data)
        const filter = imagesSet.filter((img) => img.id !== data)
        setimagesSet(filter)
        const message = 'Image deleted'
        notify(message, 'success')
    }

    if (fieldName === 'members') {
        deleteMembers(data)
        const filter = membersSet.filter((mem) => mem.ID !== data)
        setmembersSet(filter)
        const message = 'Members deleted'
        notify(message, 'success')
    }

    if (fieldName === 'messages') {
        deleteMessages(data)
        const filter = messagesSet.filter((mess) => mess.id !== data)
        setmessagesSet(filter)
        const message = 'Messages deleted'
        notify(message, 'success')
    }

    if (fieldName === 'post') {
        deletePost(data)
        const filter = postSet.filter((post) => post.id !== data)
        setpostSet(filter)
        const message = 'Post deleted'
        notify(message, 'success')
    }

    if (fieldName === 'questions') {
        deleteQuestions(data)
        const filter = questionsSet.filter((q) => q.id !== data)
        setquestionsSet(filter)
        const message = 'Questions deleted'
        notify(message, 'success')
    }

    if (fieldName === 'quiz') {
        deleteQuiz(data)
        const filter = quizSet.filter((quiz) => quiz.quizID !== data)
        setquizSet(filter)
        const message = 'Quiz deleted'
        notify(message, 'success')
    }

    if (fieldName === 'schedules') {
        deleteSchedule(data)
        const filter = scheduleSet.filter((schedule) => schedule.id !== data)
        setscheduleSet(filter)
        const message = 'Schedules deleted'
        notify(message, 'success')
    }

    if (fieldName === 'subjects') {
        deleteSubject(data)
        const filter = subjectSet.filter((sub) => sub.id !== data)
        setsubjectSet(filter)
        const message = 'Subjects deleted'
        notify(message, 'success')
    }
}

/// ADD SECTIONS ///

const handleAddAccounts = (e) => {
    e.preventDefault()
    const { imageID } = imageFile

    let updated = [...accountSet]

    const data = {
        acctID: uniqueID,
        acctype: accountType,
        email,
        password,
        firstname,
        middlename,
        lastname,
        status,
        imageID,
    }

    updated.push(data)
    console.log(data)
    setaccountSet(updated)
    addAccounts(data)
}

const handleAddChoices = (e) => {
    e.preventDefault()
    let updated = [...choicesSet]

    const data = {
        choicesID,
        letter,
        content,
        correct,
    }

    updated.push(data)
    setchoicesSet(updated)
    addChoices(data)
}

const handleAddClass = (e) => {
    e.preventDefault()
    let updated = [...classesSet]
    const data = {
        className,
        classDesc: classDescription,
        classCode,
        membersID: uniqueID,
        imageID,
        hidden,
    }
    updated.push(data)
    setclassesSet(updated)
    addClasses(data)
}

const handleAddFiles = (e) => {
    e.preventDefault()
    let updated = [...filesSet]
    const data = {
        name,
        type,
        data,
        fileID,
    }
    updated.push(data)
    setfilesSet(updated)
    addFiles(data)
}

const handleAddFillLayout = (e) => {
    e.preventDefault()
    let updated = [...fillLayoutSet]
    const data = {
        fillContent,
        fillType,
        fillPosition,
        fillLayoutID,
    }
    updated.push(data)

    setfillLayoutSet(updated)
    addFillLayout(data)
}

const handleAddFriends = (e) => {
    e.preventDefault()
    let updated = [...friendsSet]
    const data = {
        acctID: accountID,
        friendAcctID: friendAccountID,
        fullname,
    }
    updated.push(data)

    setfriendsSet(updated)
    addFriend(data)
}

const handleAddImage = (e) => {
    e.preventDefault()
    let updated = [...imagesSet]
    const data = {
        name,
        type,
        data,
        imageID,
    }
    updated.push(data)

    setimagesSet(updated)
    addImage(data)
}

const handleAddMembers = (e) => {
    e.preventDefault()
    let updated = [...membersSet]
    const data = {
        membersID: uniqueID,
        acctID: accountID,
        firstName,
        middleName,
        lastname,
        memberType,
        hidden,
    }
    updated.push(data)

    setmembersSet(updated)
    addMember(data)
}

const handleAddMessages = (e) => {
    e.preventDefault()
    let updated = [...messagesSet]
    const data = {
        messageID,
        roomID,
        messageContent,
        messageSender,
        messageReceiver,
        date,
        time,
    }
    updated.push(data)

    setmessagesSet(updated)
    addMessage(data)
}

const handleAddPost = (e) => {
    e.preventDefault()
    let updated = [...postSet]
    const data = {
        postID,
        acctID: accountID,
        name,
        timePosted,
        datePosted,
        postContent,
        replyID,
        imageID,
        fileID,
        heartCount,
        likeCount,
        classCode,
        subjectName,
        postType,
        quizID,
        schedID: scheduleID,
        duration,
        random,
    }
    updated.push(data)

    setpostSet(updated)
    addPost(data)
}

const handleAddQuestions = (e) => {
    e.preventDefault()
    let updated = [...questionsSet]
    const data = {
        questionID,
        questionNumber,
        questionContent,
        questionType,
        points,
        required,
        keySensitive,
        questionAnswerText,
        numberOfAns: numberOfAnswer,
        choicesID,
        imageID,
        fillLayoutID,
        subjectName	,
    }
    updated.push(data)

    setquestionsSet(updated)
    addQuestion(data)
    isShowModal(false)
}

const handleAddQuiz = (e) => {
    e.preventDefault()
    let updated = [...quizSet]
    const data = {
        quizTitle,
        quizInstructions,
        questionID,
        subjectName,
        totalPoints,
        totalQuestions,
        creator,
        time,
        date,
    }
    updated.push(data)
    setquizSet(updated)
    addQuiz(data)
}

const handleAddSchedule = (e) => {
    e.preventDefault()
    let updated = [...scheduleSet]
    const data = {
        schedID,
        postID,
        schedDate: scheduleDate,
        schedTime: scheduleTime,
        dueDate,
        dueTime,
        closeDate,
        closeTime,
    }
    updated.push(data)
    setscheduleSet(updated)
    addSchedule(data)

}   

const handleAddSubject = (e) => {
    e.preventDefault()
    let updated = [...subjectSet]
    const data = {
        subjectName,
        subjectCode,
    }
    updated.push(data)
    setsubjectSet(updated)
    addSubject(data)
}

/// EDIT SECTIONS ///
const handleEditAccounts = (e) => {
    e.preventDefault()
    const imageID = imageFile.imageID

    const data = {
        acctID: accountID,
        acctype: accountType,
        email,
        password,
        firstname,
        middlename,
        lastname,
        status,
        imageID,
    }

    updateAccounts(data)
    
    //const filter = accountSet.filter((act) => act.acctID !== currentID)
    let updated = [...accountSet]

    for (let i = 0; i < updated.length; i++) {
        if (updated[i].acctID === currentID) {
            updated[i] = data
            break
        }
    }

    setaccountSet(updated)
}

const handleEditClass = (e) => {
    e.preventDefault()

    const data = {
        classID,
        className,
        classDesc: classDescription,
        classCode,
        membersID,
        imageID,
        hidden,
    }

    updateClass(data)
    
    let updated = [...classesSet]

    for (let i = 0; i < updated.length; i++) {
        if (updated[i].classID === currentID) {
            updated[i] = data
            break
        }
    }
    
    setclassesSet(updated)
}

const handleEditFriends = (e) => {
    e.preventDefault()

    const data = {
        id,
        acctID: accountID,
        friendAcctID: friendAccountID,
        fullname: fullName,
    }
    updateFriend(data)
   
    
    let updated = [...friendsSet]
    
    for (let i = 0; i < updated.length; i++) {
        if (updated[i].id === currentID) {
            updated[i] = data
            break
        }
    }
    
    setfriendsSet(updated)
}

const handleEditMembers = (e) => {
    e.preventDefault()

    const data = {
        ID: currentID,
        membersID,
        acctID: accountID,
        firstName,
        midleName: middleName,
        lastName: lastname,
        memberType,
        hidden: hiddden,
    }

    updateMember(data)
    console.log(data)
    
    let updated = [...membersSet]

    for (let i = 0; i < updated.length; i++) {
        if (updated[i].ID === currentID) {
            updated[i] = data
            break
        }
    }
    console.log(currentID)
    setmembersSet(updated)
}

const handleEditSubject = (e) => {
    e.preventDefault()

    const data = {
        id: currentID,
        subjectName,
        subjectCode,
    }

    updateSubject(data)
    console.log(data)
    
    let updated = [...subjectSet]

    for (let i = 0; i < updated.length; i++) {
        if (updated[i].ID === currentID) {
            updated[i] = data
            break
        }
    }
    console.log(updated)
    setsubjectSet(updated)
}

  return (
    <div className={style.container}>
        <ToastContainer/>
        {
            showLoading && (
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
                <p>Getting datas...</p>
            </div>
            )
        }

        {
            isShowModal && (
                <div className={style.modalCon}>
                    <div className={style.modalCard}>
                        <div className={style.horizontalHead}>
                            <h2>Add {addChoose}</h2>
                            <MdExitToApp id={style.btnExit} onClick={() => setisShowModal(false)}/>
                        </div>
                        <div className={style.formBody}>
                            {
                                addChoose === 'accounts' && (
                                    <form className={style.formAdd} onSubmit={handleAddAccounts}>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Account ID</label>
                                                <input type="text" className="form-control" value={uniqueID} disabled maxLength={8} onChange={(e) => setAccountID(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Account Type</label>
                                                <select className="form-select" required onChange={(e) => setAccountType(e.target.value)}>
                                                    <option value="member" selected>member</option>
                                                    <option value="admin">admin</option>
                                                </select>
                                            </div>
                                        </div>
        
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Email</label>
                                                <input type="email" className="form-control" required onChange={(e) => setEmail(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Password</label>
                                                <input type="text" className="form-control" required onChange={(e) => setPassword(e.target.value)}/>
                                            </div>
                                        </div>
        
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Firstname</label>
                                                <input type="text" className="form-control" required onChange={(e) => setFirstname(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Middlename</label>
                                                <input type="text" className="form-control" required onChange={(e) => setMiddlename(e.target.value)}/>
                                            </div>
                                        </div>
        
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Lastname</label>
                                                <input type="text" className="form-control" required onChange={(e) => setLastname(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Status</label>
                                                <select class="form-select" onChange={(e) => setStatus(e.target.value)}>
                                                    <option value="offline" selected>offline</option>
                                                    <option value="online">online</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Upload Image</label>
                                                <input type="file" accept='images/*' required className="form-control" onChange={handleUploadImage}/>
                                            </div>
                                            
                                        </div>
                                        
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                                ) || 

                                addChoose === 'choices' && (
                                    <form className={style.formAdd} onSubmit={handleAddChoices}>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Choices ID</label>
                                                <input type="text" className="form-control" required maxlength={8} onChange={(e) => setchoicesID(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Letter</label>
                                                <input type="text" className="form-control" required onChange={(e) => setLetter(e.target.value)}/>
                                            </div>
                                        </div>
        
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Content</label>
                                                <input type="text" className="form-control" required onChange={(e) => setContent(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Correct</label>
                                                <input type="text" className="form-control" required onChange={(e) => setCorrect(e.target.value)}/>
                                            </div>
                                        </div>
                                        
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                                )  || 

                                addChoose === 'class' && (
                                    <form className={style.formAdd} onSubmit={handleAddClass}>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Class ID</label>
                                                <input type="text" className="form-control" disabled onChange={(e) => setClassID(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Class Name</label>
                                                <input type="text" className="form-control" required onChange={(e) => setClassName(e.target.value)}/>
                                            </div>
                                        </div>
        
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Class Description</label>
                                                <input type="text" className="form-control" required onChange={(e) => setClassDescription(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Class Code</label>
                                                <input type="text" className="form-control" required onChange={(e) => setClassCode(e.target.value)}/>
                                            </div>
                                        </div>
        
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Members ID</label>
                                                <input type="text" className="form-control" required onChange={(e) => setMembersID(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Image ID</label>
                                                <input type="text" className="form-control" required onChange={(e) => setImageID(e.target.value)}/>
                                            </div>
                                        </div>
        
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                            <select class="form-select" onChange={(e) => setHidden(e.target.value)}>
                                                    <option value="True" selected>True</option>
                                                    <option value="False">False</option>
                                                </select>
                                            </div>
                                        </div>
                                        
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                                )  || 

                                addChoose === 'files' && (
                                    <form className={style.formAdd} onSubmit={handleAddFiles}>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">ID</label>
                                                <input type="text" className="form-control" disabled onChange={(e) => setId(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Name</label>
                                                <input type="text" className="form-control" required onChange={(e) => setName(e.target.value)}/>
                                            </div>
                                        </div>
        
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Type</label>
                                                <input type="text" className="form-control" required onChange={(e) => setType(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Data</label>
                                                <input type="text" className="form-control" required onChange={(e) => setData(e.target.value)}/>
                                            </div>
                                        </div>
        
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">File ID</label>
                                                <input type="text" className="form-control" required maxlength={8} onChange={(e) => setFileID(e.target.value)}/>
                                            </div>
                                        </div>
                                        
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                                )  || 

                                addChoose === 'fillLayout' && (
                                    <form className={style.formAdd} onSubmit={handleAddFillLayout}>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">ID</label>
                                                <input type="text" className="form-control" disabled onChange={(e) => setId(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Fill Content</label>
                                                <input type="text" className="form-control" required onChange={(e) => setFillContent(e.target.value)}/>
                                            </div>
                                        </div>
        
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Fill Type</label>
                                                <input type="text" className="form-control" required onChange={(e) => setFillType(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Fill Position</label>
                                                <input type="text" className="form-control" required onChange={(e) => setFillPosition(e.target.value)}/>
                                            </div>
                                        </div>
        
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Fill Layout ID</label>
                                                <input type="text" className="form-control" required maxlength={8} onChange={(e) => setFillLayoutID(e.target.value)}/>
                                            </div>
                                        </div>
                                        
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                                )  || 

                                addChoose === 'friends' && (
                                    <form className={style.formAdd} onSubmit={handleAddFriends}>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">ID</label>
                                                <input type="text" className="form-control" disabled onChange={(e) => setId(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Account ID</label>
                                                <input type="text" className="form-control" required onChange={(e) => setAccountID(e.target.value)}/>
                                            </div>
                                        </div>
        
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Friend Account ID</label>
                                                <input type="text" className="form-control" required onChange={(e) => setFriendAccountID(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Fullname</label>
                                                <input type="text" className="form-control" required onChange={(e) => setFullName(e.target.value)}/>
                                            </div>
                                        </div>
                                        
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                                )  || 

                                addChoose === 'image' && (
                                    <form className={style.formAdd} onSubmit={handleAddImage}>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">ID</label>
                                                <input type="text" className="form-control" disabled onChange={(e) => setId(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Name</label>
                                                <input type="text" className="form-control" required onChange={(e) => setName(e.target.value)}/>
                                            </div>
                                        </div>
        
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Type</label>
                                                <input type="text" className="form-control" required onChange={(e) => setType(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Data</label>
                                                <input type="text" className="form-control" required onChange={(e) => setData(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Image ID</label>
                                                <input type="text" className="form-control" required  maxlength={8} onChange={(e) => setImageID(e.target.value)}/>
                                            </div>
                                        </div>
                                        
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                                )  || 

                                addChoose === 'members' && (
                                    <form className={style.formAdd} onSubmit={handleAddMembers}>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">ID</label>
                                                <input type="text" className="form-control" disabled onChange={(e) => setID(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Members ID</label>
                                                <input type="text" className="form-control" required onChange={(e) => setMembersID(e.target.value)}/>
                                            </div>
                                        </div>
        
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Account ID</label>
                                                <input type="text" className="form-control" required onChange={(e) => setAccountID(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Firstname</label>
                                                <input type="text" className="form-control" required onChange={(e) => setFirstName(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Middlename</label>
                                                <input type="text" className="form-control" required onChange={(e) => setMiddleName(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Lastname</label>
                                                <input type="text" className="form-control" required onChange={(e) => setLastname(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Member Type</label>
                                                <input type="text" className="form-control" required onChange={(e) => setImageID(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Hidden</label>
                                                <input type="text" className="form-control" required onChange={(e) => setMemberType(e.target.value)}/>
                                            </div>
                                        </div>
                                        
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                                )  || 

                                addChoose === 'messages' && (
                                    <form className={style.formAdd} onSubmit={handleAddMessages}>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">ID</label>
                                                <input type="text" className="form-control" disabled onChange={(e) => setId(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Message ID</label>
                                                <input type="text" className="form-control" required  maxlength={8} onChange={(e) => setMessageID(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Room ID</label>
                                                <input type="text" className="form-control" required onChange={(e) => setRoomID(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Message Content</label>
                                                <input type="text" className="form-control" required onChange={(e) => setMessageContent(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Message Sender</label>
                                                <input type="text" className="form-control" required onChange={(e) => setMessageSender(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Message Receiver</label>
                                                <input type="text" className="form-control" required onChange={(e) => setMessageReceiver(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Date</label>
                                                <input type="text" className="form-control" required onChange={(e) => setDate(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Time</label>
                                                <input type="text" className="form-control" required onChange={(e) => setTime(e.target.value)}/>
                                            </div>
                                        </div>
                                        
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                                )  || 

                                addChoose === 'post' && (
                                    <form className={style.formAdd} onSubmit={handleAddPost}>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">ID</label>
                                                <input type="text" className="form-control" disabled onChange={(e) => setId(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Post ID</label>
                                                <input type="text" className="form-control" required onChange={(e) => setPostID(e.target.value)}/>
                                            </div>
                                        </div>
        
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Account ID</label>
                                                <input type="text" className="form-control" required onChange={(e) => setAccountID(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Name</label>
                                                <input type="text" className="form-control" required onChange={(e) => setName(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Time Posted</label>
                                                <input type="text" className="form-control" required onChange={(e) => setTimePosted(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Date Posted</label>
                                                <input type="text" className="form-control" required onChange={(e) => setDatePosted(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Post Content</label>
                                                <input type="text" className="form-control" required onChange={(e) => setPostContent(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Reply ID</label>
                                                <input type="text" className="form-control" required  maxlength={8} onChange={(e) => setReplyID(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Image ID</label>
                                                <input type="text" className="form-control" required  maxlength={8}  onChange={(e) => imageID(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">File ID</label>
                                                <input type="text" className="form-control" required={(e) => setFileID(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Heart Count</label>
                                                <input type="text" className="form-control" required={(e) => setHeartCount(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Like Count</label>
                                                <input type="text" className="form-control" required={(e) => setLikeCount(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Class Code</label>
                                                <input type="text" className="form-control" required onChange={(e) => setClassCode(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Subject Name</label>
                                                <input type="text" className="form-control" required onChange={(e) => setSubjectName(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Post Type</label>
                                                <input type="text" className="form-control" required onChange={(e) => setPostType(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Quiz ID</label>
                                                <input type="text" className="form-control" required onChange={(e) => setQuizID(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Schedule ID</label>
                                                <input type="text" className="form-control" required onChange={(e) => setScheduleID(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Duration</label>
                                                <input type="text" className="form-control" required onChange={(e) => setDuration(e.target.value)}/>
                                            </div>
                                        </div>
                                        
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                                ) || 

                                addChoose === 'questions' && (
                                    <form className={style.formAdd} onSubmit={handleAddQuestions}>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">ID</label>
                                                <input type="text" className="form-control" disabled  maxlength={8} onChange={(e) => setId(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Question ID</label>
                                                <input type="text" className="form-control" required onChange={(e) => setQuestionID(e.target.value)}/>
                                            </div>
                                        </div>
        
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Question Number</label>
                                                <input type="text" className="form-control" required onChange={(e) => setQuestionNumber(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Question Content</label>
                                                <input type="text" className="form-control" required  onChange={(e) => setQuestionContent(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Question Type</label>
                                                <input type="text" className="form-control" required onChange={(e) => setQuestionType(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Required</label>
                                                <input type="text" className="form-control" required onChange={(e) => setRequired(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Key Sensitive</label>
                                                <input type="text" className="form-control" required onChange={(e) => setKeySensitive(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Question Answer Text</label>
                                                <input type="text" className="form-control"required  onChange={(e) => setQuestionAnswerText(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Number of Answer</label>
                                                <input type="text" className="form-control" required onChange={(e) => setNumberOfAnswer(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Choice ID</label>
                                                <input type="text" className="form-control" required onChange={(e) => setChoicesID(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Image ID</label>
                                                <input type="text" className="form-control" required onChange={(e) => setImageID(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Fill Layout ID</label>
                                                <input type="text" className="form-control"required  onChange={(e) => setFillLayoutID(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Subject Name</label>
                                                <input type="text" className="form-control" required onChange={(e) => setSubjectName(e.target.value)}/>
                                            </div>
                                        </div>
                                        
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                                ) || 

                                addChoose === 'quiz' && (
                                    <form className={style.formAdd} onSubmit={handleAddQuiz}>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Quiz ID</label>
                                                <input type="text" className="form-control" disabled  maxlength={8} onChange={(e) => setQuizID(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Quiz Title</label>
                                                <input type="text" className="form-control" required onChange={(e) => setQuizTitle(e.target.value)}/>
                                            </div>
                                        </div>
        
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">	Quiz Instructions</label>
                                                <input type="text" className="form-control" required onChange={(e) => setQuizInstruction(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Question ID</label>
                                                <input type="text" className="form-control"required  maxlength={8} onChange={(e) => questionID(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Subject Name	</label>
                                                <input type="text" className="form-control" required onChange={(e) => setSubjectName(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Total Points</label>
                                                <input type="text" className="form-control" required onChange={(e) => setTotalPoints(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Total Questions</label>
                                                <input type="text" className="form-control" required onChange={(e) => setTotalQuestions(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Creator</label>
                                                <input type="text" className="form-control"required  onChange={(e) => setCreator(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Time</label>
                                                <input type="text" className="form-control" required onChange={(e) => setTime(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Date</label>
                                                <input type="text" className="form-control" required onChange={(e) => setDate(e.target.value)}/>
                                            </div>
                                        </div>
                                        
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                                ) || 

                                addChoose === 'schedule' && (
                                    <form className={style.formAdd} onSubmit={handleAddSchedule}>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">ID</label>
                                                <input type="text" className="form-control" disabled onChange={(e) => setID(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Sched ID</label>
                                                <input type="text" className="form-control" required  maxlength={8} onChange={(e) => setSchedID(e.target.value)}/>
                                            </div>
                                        </div>
        
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">	Post ID</label>
                                                <input type="text" className="form-control" onChange={(e) => setPostID(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">	Schedule Date</label>
                                                <input type="text" className="form-control" required  maxlength={8} onChange={(e) => setScheduleDate(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Schedule Time</label>
                                                <input type="text" className="form-control" required onChange={(e) => setScheduleTime(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Due Date</label>
                                                <input type="text" className="form-control" required onChange={(e) => setDueDate(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">	Due Time</label>
                                                <input type="text" className="form-control" required onChange={(e) => setDueTime(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Close Date</label>
                                                <input type="text" className="form-control" required onChange={(e) => setCloseDate(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>

                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Close Time</label>
                                                <input type="text" className="form-control" required onChange={(e) => setCloseTime(e.target.value)}/>
                                            </div>
                                        </div>
                                        
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                                ) || 

                                addChoose === 'subject' && (
                                    <form className={style.formAdd} onSubmit={handleAddSubject}>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">ID</label>
                                                <input type="text" className="form-control" disabled onChange={(e) => setId(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Subject Name</label>
                                                <input type="text" className="form-control" required onChange={(e) => setSubjectName(e.target.value)}/>
                                            </div>
                                        </div>
        
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Subject Code</label>
                                                <input type="text" className="form-control" required onChange={(e) => setSubjectCode(e.target.value)}/>
                                            </div>
                                        </div>
                                        
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                                ) 
                            }

                        </div>
                    </div>
                </div>
            )
        }

        {
            isShowModalEdit && (
                <div className={style.modalCon}>
                    <div className={style.modalCard}>
                        <div className={style.horizontalHead}>
                            <h2>Add {addChoose}</h2>
                            <MdExitToApp id={style.btnExit} onClick={() => setisShowModalEdit(false)}/>
                        </div>
                        <div className={style.formBody}>
                            {
                                addChoose === 'accounts' && (
                                    
                                   
                                            <form className={style.formAdd} onSubmit={handleEditAccounts}>
                                                <div className='d-flex gap-2'>
                                                    <div className="mb-3">
                                                        <label for="exampleInputEmail1" className="form-label">Account ID</label>
                                                        <input type="text" className="form-control" value={accountID} disabled/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label for="exampleInputEmail1" className="form-label">Account Type</label>
                                                        <select className="form-select" value={accountType} onChange={(e) => setAccountType(e.target.value)}>
                                                            <option value="member" selected>member</option>
                                                            <option value="admin">admin</option>
                                                        </select>
                                                    </div>
                                                </div>
                
                                                <div className='d-flex gap-2'>
                                                    <div className="mb-3">
                                                        <label for="exampleInputEmail1" className="form-label">Email</label>
                                                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label for="exampleInputEmail1" className="form-label">Password</label>
                                                        <input type="text" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                                    </div>
                                                </div>
                
                                                <div className='d-flex gap-2'>
                                                    <div className="mb-3">
                                                        <label for="exampleInputEmail1" className="form-label">Firstname</label>
                                                        <input type="text" className="form-control" value={firstname} onChange={(e) => setFirstname(e.target.value)}/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label for="exampleInputEmail1" className="form-label">Middlename</label>
                                                        <input type="text" className="form-control" value={middlename} onChange={(e) => setMiddlename(e.target.value)}/>
                                                    </div>
                                                </div>
                
                                                <div className='d-flex gap-2'>
                                                    <div className="mb-3">
                                                        <label for="exampleInputEmail1" className="form-label">Lastname</label>
                                                        <input type="text" className="form-control" value={lastname} onChange={(e) => setLastname(e.target.value)}/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label for="exampleInputEmail1" className="form-label">Status</label>
                                                        <select class="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                                                            <option value="offline" selected>offline</option>
                                                            <option value="online">online</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className='d-flex gap-2'>
                                                    <div className="mb-3">
                                                        <label for="exampleInputEmail1" className="form-label">Upload Image</label>
                                                        <input type="file" accept='images/*' required className="form-control" onChange={handleUploadImage}/>
                                                    </div>
                                                    
                                                </div>
                                                
                                                <button type="submit" className="btn btn-primary">Save</button>
                                            </form>
                                      
                                    
                                    
                                ) ||  

                                addChoose === 'class' && (
                                    <form className={style.formAdd} onSubmit={handleEditClass}>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Class ID</label>
                                                <input type="text" className="form-control" value={classID} onChange={(e) => setClassID(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Class Name</label>
                                                <input type="text" className="form-control" value={className} onChange={(e) => setClassName(e.target.value)}/>
                                            </div>
                                        </div>
        
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Class Description</label>
                                                <input type="text" className="form-control" value={classDescription} onChange={(e) => setClassDescription(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Class Code</label>
                                                <input type="text" className="form-control" value={classCode} onChange={(e) => setClassCode(e.target.value)}/>
                                            </div>
                                        </div>
        
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Members ID</label>
                                                <input type="text" className="form-control" value={membersID} onChange={(e) => setMembersID(e.target.value)}/>
                                            </div>
                                        </div>
        
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                            <select class="form-select" value={hiddden} aonChange={(e) => setHidden(e.target.value)}>
                                                    <option value="True" selected>True</option>
                                                    <option value="False">False</option>
                                                </select>
                                            </div>
                                        </div>
                                        
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                                )  || 

                                addChoose === 'files' && (
                                    <form className={style.formAdd} onSubmit={handleAddFiles}>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">ID</label>
                                                <input type="text" className="form-control" value={id} disabled onChange={(e) => setId(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Name</label>
                                                <input type="text" className="form-control" value={name} required onChange={(e) => setName(e.target.value)}/>
                                            </div>
                                        </div>
        
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Type</label>
                                                <input type="text" className="form-control" value={type} required onChange={(e) => setType(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Data</label>
                                                <input type="text" className="form-control" value={data} required onChange={(e) => setData(e.target.value)}/>
                                            </div>
                                        </div>
        
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">File ID</label>
                                                <input type="text" className="form-control" value={fileID} required maxlength={8} onChange={(e) => setFileID(e.target.value)}/>
                                            </div>
                                        </div>
                                        
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                                )  || 



                                addChoose === 'friends' && (
                                    <form className={style.formAdd} onSubmit={handleEditFriends}>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">ID</label>
                                                <input type="text" className="form-control" value={id} disabled onChange={(e) => setId(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Account ID</label>
                                                <input type="text" className="form-control" value={accountID} required onChange={(e) => setAccountID(e.target.value)}/>
                                            </div>
                                        </div>
        
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Friend Account ID</label>
                                                <input type="text" className="form-control" value={friendAccountID} required onChange={(e) => setFriendAccountID(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Fullname</label>
                                                <input type="text" className="form-control" value={fullName} required onChange={(e) => setFullName(e.target.value)}/>
                                            </div>
                                        </div>
                                        
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                                )  || 

                                addChoose === 'image' && (
                                    <form className={style.formAdd} onSubmit={handleAddImage}>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">ID</label>
                                                <input type="text" className="form-control" value={id} disabled onChange={(e) => setId(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Name</label>
                                                <input type="text" className="form-control" value={name} required onChange={(e) => setName(e.target.value)}/>
                                            </div>
                                        </div>
        
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Type</label>
                                                <input type="text" className="form-control" value={type} required onChange={(e) => setType(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Data</label>
                                                <input type="text" className="form-control" value={data} required onChange={(e) => setData(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Image ID</label>
                                                <input type="text" className="form-control" value={imageID} required  maxlength={8} onChange={(e) => setImageID(e.target.value)}/>
                                            </div>
                                        </div>
                                        
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                                )  || 

                                addChoose === 'members' && (
                                    <form className={style.formAdd} onSubmit={handleEditMembers}>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">ID</label>
                                                <input type="text" className="form-control" value={id} disabled onChange={(e) => setID(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Members ID</label>
                                                <input type="text" className="form-control" value={membersID} required onChange={(e) => setMembersID(e.target.value)}/>
                                            </div>
                                        </div>
        
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Account ID</label>
                                                <input type="text" className="form-control" value={accountID} required onChange={(e) => setAccountID(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Firstname</label>
                                                <input type="text" className="form-control" value={firstName} required onChange={(e) => setFirstName(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Middlename</label>
                                                <input type="text" className="form-control" value={middleName} required onChange={(e) => setMiddleName(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Lastname</label>
                                                <input type="text" className="form-control" value={lastname} required onChange={(e) => setLastname(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Member Type</label>
                                                <input type="text" className="form-control" value={memberType} required onChange={(e) => setImageID(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Hidden</label>
                                                <input type="text" className="form-control" value={hiddden} required onChange={(e) => setMemberType(e.target.value)}/>
                                            </div>
                                        </div>
                                        
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                                )  || 

                                addChoose === 'messages' && (
                                    <form className={style.formAdd} onSubmit={handleAddMessages}>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">ID</label>
                                                <input type="text" className="form-control" value={id} disabled onChange={(e) => setId(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Message ID</label>
                                                <input type="text" className="form-control" value={messageID} required  maxlength={8} onChange={(e) => setMessageID(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Room ID</label>
                                                <input type="text" className="form-control" value={roomID} required onChange={(e) => setRoomID(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Message Content</label>
                                                <input type="text" className="form-control" value={messageContent} required onChange={(e) => setMessageContent(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Message Sender</label>
                                                <input type="text" className="form-control" value={messageSender} required onChange={(e) => setMessageSender(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Message Receiver</label>
                                                <input type="text" className="form-control" value={messageReceiver} required onChange={(e) => setMessageReceiver(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Date</label>
                                                <input type="text" className="form-control" value={date} required onChange={(e) => setDate(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Time</label>
                                                <input type="text" className="form-control" value={time} required onChange={(e) => setTime(e.target.value)}/>
                                            </div>
                                        </div>
                                        
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                                )  || 

                                addChoose === 'post' && (
                                    <form className={style.formAdd} onSubmit={handleAddPost}>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">ID</label>
                                                <input type="text" className="form-control" value={id} disabled onChange={(e) => setId(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Post ID</label>
                                                <input type="text" className="form-control"  value={postID} required onChange={(e) => setPostID(e.target.value)}/>
                                            </div>
                                        </div>
        
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Account ID</label>
                                                <input type="text" className="form-control" value={accountID} required onChange={(e) => setAccountID(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Name</label>
                                                <input type="text" className="form-control" value={name} required onChange={(e) => setName(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Time Posted</label>
                                                <input type="text" className="form-control" value={timePosted} required onChange={(e) => setTimePosted(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Date Posted</label>
                                                <input type="text" className="form-control" value={datePosted} required onChange={(e) => setDatePosted(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Post Content</label>
                                                <input type="text" className="form-control" value={postContent} required onChange={(e) => setPostContent(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Reply ID</label>
                                                <input type="text" className="form-control" value={replyID} required  maxlength={8} onChange={(e) => setReplyID(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Image ID</label>
                                                <input type="text" className="form-control" value={imageID} required  maxlength={8}  onChange={(e) => imageID(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">File ID</label>
                                                <input type="text" className="form-control" value={fileID} required={(e) => setFileID(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Heart Count</label>
                                                <input type="text" className="form-control" value={heartCount} required={(e) => setHeartCount(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Like Count</label>
                                                <input type="text" className="form-control" value={likeCount} required={(e) => setLikeCount(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Class Code</label>
                                                <input type="text" className="form-control" value={classCode} required onChange={(e) => setClassCode(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Subject Name</label>
                                                <input type="text" className="form-control" value={subjectName} required onChange={(e) => setSubjectName(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Post Type</label>
                                                <input type="text" className="form-control" value={postType} required onChange={(e) => setPostType(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Quiz ID</label>
                                                <input type="text" className="form-control" value={quizID} required onChange={(e) => setQuizID(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Schedule ID</label>
                                                <input type="text" className="form-control" value={scheduleID} required onChange={(e) => setScheduleID(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Duration</label>
                                                <input type="text" className="form-control" value={scheduleID} required onChange={(e) => setDuration(e.target.value)}/>
                                            </div>
                                        </div>
                                        
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                                ) || 

                                addChoose === 'questions' && (
                                    <form className={style.formAdd} onSubmit={handleAddQuestions}>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">ID</label>
                                                <input type="text" className="form-control" value={id} disabled  maxlength={8} onChange={(e) => setId(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Question ID</label>
                                                <input type="text" className="form-control" value={questionID} required onChange={(e) => setQuestionID(e.target.value)}/>
                                            </div>
                                        </div>
        
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Question Number</label>
                                                <input type="text" className="form-control" value={questionNumber} required onChange={(e) => setQuestionNumber(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Question Content</label>
                                                <input type="text" className="form-control" value={questionContent} required  onChange={(e) => setQuestionContent(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Question Type</label>
                                                <input type="text" className="form-control" value={questionType} required onChange={(e) => setQuestionType(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Required</label>
                                                <input type="text" className="form-control" value={required} required onChange={(e) => setRequired(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Key Sensitive</label>
                                                <input type="text" className="form-control" value={keySensitive} required onChange={(e) => setKeySensitive(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Question Answer Text</label>
                                                <input type="text" className="form-control" value={questionAnswerText} required  onChange={(e) => setQuestionAnswerText(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Number of Answer</label>
                                                <input type="text" className="form-control" value={numberOfAnswer} required onChange={(e) => setNumberOfAnswer(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Choice ID</label>
                                                <input type="text" className="form-control" value={numberOfAnswer} required onChange={(e) => setChoicesID(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Image ID</label>
                                                <input type="text" className="form-control" value={imageID} required onChange={(e) => setImageID(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Fill Layout ID</label>
                                                <input type="text" className="form-control" value={fillLayoutID} required  onChange={(e) => setFillLayoutID(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Subject Name</label>
                                                <input type="text" className="form-control" value={subjectName} required onChange={(e) => setSubjectName(e.target.value)}/>
                                            </div>
                                        </div>
                                        
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                                ) || 

                                addChoose === 'quiz' && (
                                    <form className={style.formAdd} onSubmit={handleAddQuiz}>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Quiz ID</label>
                                                <input type="text" className="form-control" value={quizID} disabled  maxlength={8} onChange={(e) => setQuizID(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Quiz Title</label>
                                                <input type="text" className="form-control" value={quizTitle} required onChange={(e) => setQuizTitle(e.target.value)}/>
                                            </div>
                                        </div>
        
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">	Quiz Instructions</label>
                                                <input type="text" className="form-control" value={quizInstructions} required onChange={(e) => setQuizInstruction(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Question ID</label>
                                                <input type="text" className="form-control" value={questionID} required  maxlength={8} onChange={(e) => questionID(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Subject Name	</label>
                                                <input type="text" className="form-control" value={subjectName} required onChange={(e) => setSubjectName(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Total Points</label>
                                                <input type="text" className="form-control" value={totalPoints} required onChange={(e) => setTotalPoints(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Total Questions</label>
                                                <input type="text" className="form-control" value={totalQuestions} required onChange={(e) => setTotalQuestions(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Creator</label>
                                                <input type="text" className="form-control" value={creator} required  onChange={(e) => setCreator(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Time</label>
                                                <input type="text" className="form-control" value={time} required onChange={(e) => setTime(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Date</label>
                                                <input type="text" className="form-control" value={date} required onChange={(e) => setDate(e.target.value)}/>
                                            </div>
                                        </div>
                                        
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                                ) || 

                                addChoose === 'schedule' && (
                                    <form className={style.formAdd} onSubmit={handleAddSchedule}>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">ID</label>
                                                <input type="text" className="form-control" value={id} disabled onChange={(e) => setID(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Sched ID</label>
                                                <input type="text" className="form-control" value={scheduleID} required  maxlength={8} onChange={(e) => setSchedID(e.target.value)}/>
                                            </div>
                                        </div>
        
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">	Post ID</label>
                                                <input type="text" className="form-control" value={postID} onChange={(e) => setPostID(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">	Schedule Date</label>
                                                <input type="text" className="form-control" value={scheduleDate} required  maxlength={8} onChange={(e) => setScheduleDate(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Schedule Time</label>
                                                <input type="text" className="form-control" value={scheduleTime} required onChange={(e) => setScheduleTime(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Due Date</label>
                                                <input type="text" className="form-control" value={dueDate} required onChange={(e) => setDueDate(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">	Due Time</label>
                                                <input type="text" className="form-control" value={dueTime} required onChange={(e) => setDueTime(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Close Date</label>
                                                <input type="text" className="form-control" value={closeDate} required onChange={(e) => setCloseDate(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className='d-flex gap-2'>

                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Close Time</label>
                                                <input type="text" className="form-control" value={closeTime} required onChange={(e) => setCloseTime(e.target.value)}/>
                                            </div>
                                        </div>
                                        
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                                ) || 

                                addChoose === 'subject' && (
                                    <form className={style.formAdd} onSubmit={handleEditSubject}>
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">ID</label>
                                                <input type="text" className="form-control" value={id} disabled onChange={(e) => setId(e.target.value)}/>
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Subject Name</label>
                                                <input type="text" className="form-control" value={subjectName} required onChange={(e) => setSubjectName(e.target.value)}/>
                                            </div>
                                        </div>
        
                                        <div className='d-flex gap-2'>
                                            <div className="mb-3">
                                                <label for="exampleInputEmail1" className="form-label">Subject Code</label>
                                                <input type="text" className="form-control" value={subjectCode} required onChange={(e) => setSubjectCode(e.target.value)}/>
                                            </div>
                                        </div>
                                        
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                                ) 
                            }

                        </div>
                    </div>
                </div>
            )
        }
        
        <div className={style.sideBar}>
            <div className={style.header}>
                <img src={titleLogo} alt="logo" id={style.titleLogo}/>
            </div>
            <div className={style.tableList}>
                <div className={choose === 'accounts' ? style.cardActived : style.card } onClick={() => handleChoose('accounts')}>
                    <MdSupervisorAccount id={style.icon}/>
                    <p>Accounts</p>
                </div>
                <div className={choose === 'choices' ?  style.cardActived : style.card } onClick={() => handleChoose('choices')}>
                    <MdSupervisorAccount id={style.icon}/>
                    <p>Choices</p>
                </div>
                <div className={choose === 'class' ?  style.cardActived : style.card } onClick={() => handleChoose('class')}>
                    <MdSupervisorAccount id={style.icon}/>
                    <p>Class</p>
                </div>
                <div className={choose === 'files' ?  style.cardActived : style.card } onClick={() => handleChoose('files')}>
                    <MdSupervisorAccount id={style.icon}/>
                    <p>Files</p>
                </div>
                <div className={choose === 'filllayout' ?  style.cardActived : style.card } onClick={() => handleChoose('filllayout')}>
                    <MdSupervisorAccount id={style.icon}/>
                    <p>Fill Layout</p>
                </div>
                <div className={choose === 'friends' ?  style.cardActived : style.card } onClick={() => handleChoose('friends')}>
                    <MdSupervisorAccount id={style.icon}/>
                    <p>Friends</p>
                </div>
                <div className={choose === 'image' ?  style.cardActived : style.card } onClick={() => handleChoose('image')}>
                    <MdSupervisorAccount id={style.icon}/>
                    <p>Image</p>
                </div>
                <div className={choose === 'members' ?  style.cardActived : style.card } onClick={() => handleChoose('members')}>
                    <MdSupervisorAccount id={style.icon}/>
                    <p>Members</p>
                </div>
                <div className={choose === 'messages' ?  style.cardActived : style.card } onClick={() => handleChoose('messages')}>
                    <MdSupervisorAccount id={style.icon}/>
                    <p>Messages</p>
                </div>
                <div className={choose === 'post' ?  style.cardActived : style.card } onClick={() => handleChoose('post')}>
                    <MdSupervisorAccount id={style.icon}/>
                    <p>Post</p>
                </div>
                <div className={choose === 'questions' ?  style.cardActived : style.card } onClick={() => handleChoose('questions')}>
                    <MdSupervisorAccount id={style.icon}/>
                    <p>Questions</p>
                </div>
                <div className={choose === 'quiz' ?  style.cardActived : style.card } onClick={() => handleChoose('quiz')}>
                    <MdSupervisorAccount id={style.icon}/>
                    <p>Quiz</p>
                </div>
                <div className={choose === 'schedule' ?  style.cardActived : style.card } onClick={() => handleChoose('schedule')}>
                    <MdSupervisorAccount id={style.icon}/>
                    <p>Schedule</p>
                </div>
                <div className={choose === 'subject' ?  style.cardActived : style.card } onClick={() => handleChoose('subject')}>
                    <MdSupervisorAccount id={style.icon}/>
                    <p>Subject</p>
                </div>
                
                
            </div>
        </div>
        <div className={style.mainBody}>
            <div className={style.topBody}>
                <div className={style.vertical}>
                    <h2>{fullname}</h2>
                    <p>Admin Account</p>
                </div>
                <img src={generateProfilePic()} alt="profile" id={style.profilePic} onClick={() => setShowProfileCard(!showProfileCard)}/>
            </div>
            {
                showProfileCard && (
                    <div className={style.cardProfile} onClick={handleLogout}>
                      <AiOutlineLogout size={20}/>
                      <p>Logout</p>
                    </div>
                )   
            }
            
            <div className={style.content}>
                {
                    choose === 'accounts' && (
                        <div className={style.contentDiv}>
                            <div className={style.horizontal}>
                                <h2>Accounts</h2>
                                <button id={style.btnAdd} onClick={() => {
                                    setisShowModal(true)
                                    setAddChoose('accounts')
                                }}>Add <FaPlus/></button>
                            </div>
                            <table class="table rounded table-bordered">
                            <thead className='table table-secondary'>
                                <tr>
                                    <th scope="col" className={style.title}><b>Account ID</b></th>
                                    <th scope="col" className={style.title}><b>Account Type</b></th>
                                    <th scope="col" className={style.title}><b>Email</b></th>
                                    <th scope="col" className={style.title}><b>Password</b></th>
                                    <th scope="col" className={style.title}><b>Firstname</b></th>
                                    <th scope="col" className={style.title}><b>Middlename</b></th>
                                    <th scope="col" className={style.title}><b>Lastname</b></th>
                                    <th scope="col" className={style.title}><b>Status</b></th>
                                    <th scope="col" className={style.title}><b>Image ID</b></th>
                                    <th scope="col" colSpan={2} className={style.title}><b>Action</b></th>
                                </tr>
                            </thead>
                            <tbody>
                                {   
                                    accountSet && (
                                        accountSet.map((acct, index) => (
                                            <tr key={index}>
                                                <th scope="row">{acct.acctID}</th>
                                                <td>{acct.acctype}</td>
                                                <td>{acct.email}</td>
                                                <td>{acct.password}</td>
                                                <td>{acct.firstname}</td>
                                                <td>{acct.middlename}</td>
                                                <td>{acct.lastname}</td>
                                                <td>{acct.status}</td>
                                                <td>{acct.imageID}</td>
                                                <td> <button type="button" class="btn btn-primary" onClick={() =>handleEdit(true, 'accounts', acct.acctID)}>Edit</button></td>
                                                <td> <button type="button" class="btn btn-danger" onClick={() => handleDelete(acct.acctID, 'accounts')}>Delete</button></td>
                                            </tr>
                                        ))
                                    )
                                }
                                
                               
                            </tbody>
                        </table>
                        </div>

                    ) ||
                    choose === 'choices' && (
                        <div className={style.contentDiv}>
                             <div className={style.horizontal}>
                                <h2>Choices</h2>
                            </div>
                            <div className={style.contentDiv}>
                                <table class="table rounded table-bordered">
                                <thead className='table table-secondary'>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Choices ID</th>
                                        <th scope="col">Letter</th>
                                        <th scope="col">Content</th>
                                        <th scope="col">Correct</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        choicesSet && (
                                            choicesSet.map((choices) => (
                                                <tr>
                                                    <th scope="row">{choices.id}</th>
                                                    <td>{choices.choicesID}</td>
                                                    <td>{choices.letter}</td>
                                                    <td>{choices.content}</td>
                                                    <td>{choices.correct}</td>
                                                    </tr>
                                            ))
                                        )
                                        
                                    }

                                </tbody>
                            </table>
                            </div>
                         </div>
                       
                    ) ||
                    choose === 'class' && (
                        <div className={style.contentDiv}>
                             <div className={style.horizontal}>
                                <h2>Class</h2>
                                <button id={style.btnAdd} onClick={() => {
                                    setisShowModal(true)
                                    setAddChoose('class')
                                }}>Add <FaPlus/></button>
                            </div>
                            <table class="table rounded table-bordered">
                            <thead className='table table-secondary'>
                                <tr>
                                    <th scope="col">Class ID</th>
                                    <th scope="col">Class Name</th>
                                    <th scope="col">Class Descriptionq</th>
                                    <th scope="col">Class Code</th>
                                    <th scope="col">Members ID</th>
                                    <th scope="col">Image ID</th>
                                    <th scope="col">Hidden</th>
                                    <th scope="col" colSpan={2}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    classesSet && (
                                        classesSet.map((clss) => (
                                            <tr>
                                                <th scope="row">{clss.classID}</th>
                                                <td>{clss.className}</td>
                                                <td>{clss.classDesc}</td>
                                                <td>{clss.classCode}</td>
                                                <td>{clss.membersID}</td>
                                                <td>{clss.imageID}</td>
                                                <td>{clss.hidden}</td>
                                                <td> <button type="button" class="btn btn-primary" onClick={() =>handleEdit(!isShowModalEdit, 'class', clss.classID )}>Edit</button></td>
                                                <td> <button type="button" class="btn btn-danger" onClick={() => handleDelete(clss.classID, 'class')}>Delete</button></td>
                                            </tr>
                                        ))
                                    )
                                    
                                }

                            </tbody>
                        </table>
                        </div>
                    ) ||
                    choose === 'files' && (
                        <div className={style.contentDiv}>
                             <div className={style.horizontal}>
                                <h2>Files</h2>
                            </div>
                            <table class="table rounded table-bordered">
                            <thead className='table table-secondary'>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Data</th>
                                    <th scope="col">File ID</th>
                                </tr>
                            </thead>
                            <tbody>
                               {
                                    filesSet && ( filesSet.map((file) => (
                                        <tr>
                                            <th scope="row">{file.id}</th>
                                            <td>{file.name}</td>
                                            <td>{file.type}</td>
                                            <td>{file.data}</td>
                                            <td>{file.fileID}</td>
                                        </tr>
                                    )))
                                   
                               }
                                
                               
                            </tbody>
                        </table>
                        </div>
                    ) ||
                    choose === 'filllayout' && (
                        <div className={style.contentDiv}>
                             <div className={style.horizontal}>
                                <h2>Fill Layout</h2>
                            </div>
                            <table class="table rounded table-bordered">
                            <thead className='table table-secondary'>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Fill Contentw</th>
                                    <th scope="col">Fill Type</th>
                                    <th scope="col">Fill Position</th>
                                    <th scope="col">Fill Layout ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    fillLayoutSet && (
                                        fillLayoutSet.map((fill) => (
                                            <tr>
                                                <th scope="row">{fill.id}</th>
                                                <td>{fill.fillContent}</td>
                                                <td>{fill.fillType}</td>
                                                <td>{fill.fillPosition}</td>
                                                <td>{fill.fillLayoutID}</td>
                                            </tr>
                                        ))
                                    )
                                    
                                }
                                
                               
                            </tbody>
                        </table>
                        </div>
                    ) ||
                    choose === 'friends' && (
                        <div className={style.contentDiv}>
                             <div className={style.horizontal}>
                                <h2>Friends</h2>
                                <button id={style.btnAdd} onClick={() => {
                                    setisShowModal(true)
                                    setAddChoose('friends')
                                }}>Add <FaPlus/></button>
                            </div>
                            <table class="table rounded table-bordered">
                            <thead className='table table-secondary'>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Account ID</th>
                                    <th scope="col">Friend Account ID</th>
                                    <th scope="col">Fullname</th>
                                    <th scope="col" colSpan={2}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    friendsSet && (
                                        friendsSet.map((friend) => (
                                            <tr>
                                                <th scope="row">{friend.id}</th>
                                                <td>{friend.acctID}</td>
                                                <td>{friend.friendAcctID}</td>
                                                <td>{friend.fullname}</td>
                                                <td> <button type="button" class="btn btn-primary" onClick={() =>handleEdit(!isShowModalEdit, 'friends', friend.id)}>Edit</button></td>
                                                <td> <button type="button" class="btn btn-danger" onClick={() => handleDelete(friend.id, 'friends')}>Delete</button></td>
                                            </tr>
                                        ))
                                    )
                                   
                                }

                               
                            </tbody>
                        </table>
                        </div>
                    ) ||
                    choose === 'image' && (
                        <div className={style.contentDiv}>
                             <div className={style.horizontal}>
                                <h2>Image</h2>
                            </div>
                            <table class="table rounded table-bordered">
                            <thead className='table table-secondary'>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Data</th>
                                    <th scope="col">Image ID</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    imagesSet && (
                                        imagesSet.map((img) => (
                                            <tr>
                                                <th scope="row">{img.id}</th>
                                                <td>{img.name}</td>
                                                <td>{img.type}</td>
                                                <td>{img.data}</td>
                                                <td>{img.imageID}</td>
                                            </tr>
                                        ))
                                    )
                                    
                                }

                               
                            </tbody>
                        </table>
                        </div>
                    ) ||
                    choose === 'members' && (
                        <div className={style.contentDiv}>
                             <div className={style.horizontal}>
                                <h2>Members</h2>
                                <button id={style.btnAdd} onClick={() => {
                                    setisShowModal(true)
                                    setAddChoose('members')
                                }}>Add <FaPlus/></button>
                            </div>
                            <table class="table rounded table-bordered">
                            <thead className='table table-secondary'>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Members ID</th>
                                    <th scope="col">Account ID</th>
                                    <th scope="col">Firstname</th>
                                    <th scope="col">Middlename</th>
                                    <th scope="col">Lastname</th>
                                    <th scope="col">Member Type</th>
                                    <th scope="col">Hidden</th>
                                    <th scope="col" colSpan={2}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    membersSet && (
                                        membersSet.map((member) => (
                                            <tr>
                                                <th scope="row">{member.ID}</th>
                                                <td>{member.membersID}</td>
                                                <td>{member.acctID}</td>
                                                <td>{member.firstName}</td>
                                                <td>{member.midleName}</td>
                                                <td>{member.lastName}</td>
                                                <td>{member.memberType}</td>
                                                <td>{member.hidden}</td>
                                                <td> <button type="button" class="btn btn-primary" onClick={() =>handleEdit(!isShowModalEdit, 'members', member.ID)}>Edit</button></td>
                                                <td> <button type="button" class="btn btn-danger" onClick={() => handleDelete(member.ID, 'members')}>Delete</button></td>
                                            </tr>
                                        ))
                                    )
                                   
                                }

                               
                            </tbody>
                        </table>
                        </div>
                    ) ||
                    choose === 'messages' && (
                        <div className={style.contentDiv}>
                             <div className={style.horizontal}>
                                <h2>Messages</h2>
                            </div>
                            <table class="table rounded table-bordered">
                            <thead className='table table-secondary'>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Message ID</th>
                                    <th scope="col">Room ID</th>
                                    <th scope="col">Message Content</th>
                                    <th scope="col">Message Sender</th>
                                    <th scope="col">Message Receiver</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    messagesSet && (
                                        messagesSet.map((mess) => (
                                            <tr>
                                                <th scope="row">{mess.id}</th>
                                                <td>{mess.messageID}</td>
                                                <td>{mess.roomID}</td>
                                                <td>{mess.messageContent}</td>
                                                <td>{mess.messageSender}</td>
                                                <td>{mess.messageReceiver}</td>
                                                <td>{mess.date}</td>
                                                <td>{mess.time}</td>
                                            </tr>
                                        ))
                                    )
                                    
                                }

                               
                            </tbody>
                        </table>
                        </div>
                    ) ||
                    choose === 'post' && (
                        <div className={style.contentDiv}>
                             <div className={style.horizontal}>
                                <h2>Post</h2>
                                <button id={style.btnAdd} onClick={() => {
                                    setisShowModal(true)
                                    setAddChoose('post')
                                }}>Add <FaPlus/></button>
                            </div>
                            <table class="table rounded table-bordered">
                            <thead className='table table-secondary'>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Post ID</th>
                                    <th scope="col">Account ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Time Posted</th>
                                    <th scope="col">Date Posted</th>
                                    <th scope="col">Post Content</th>
                                    <th scope="col">Reply ID</th>
                                    <th scope="col">Image ID</th>
                                    <th scope="col">File ID</th>
                                    <th scope="col">Heart Count</th>
                                    <th scope="col">Like Count</th>
                                    <th scope="col">Class Code</th>
                                    <th scope="col">Subject Name</th>
                                    <th scope="col">Post Type</th>
                                    <th scope="col">Quiz ID</th>
                                    <th scope="col">Schedule ID</th>
                                    <th scope="col">Duration</th>
                                    <th scope="col" colSpan={2}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    postSet && (
                                        postSet.map((post) => (
                                            <tr>
                                                <th scope="row">{post.id}</th>
                                                <td>{post.postID}</td>
                                                <td>{post.acctID}</td>
                                                <td>{post.name}</td>
                                                <td>{post.timePosted}</td>
                                                <td>{post.datePosted}</td>
                                                <td>{post.postContent}</td>
                                                <td>{post.replyID}</td>
                                                <td>{post.imageID}</td>
                                                <td>{post.fileID}</td>
                                                <td>{post.heartCount}</td>
                                                <td>{post.likeCount}</td>
                                                <td>{post.classCode}</td>
                                                <td>{post.subjectName}</td>
                                                <td>{post.postType}</td>
                                                <td>{post.quizID}</td>
                                                <td>{post.schedID}</td>
                                                <td>{post.duration}</td>
                                                <td> <button type="button" class="btn btn-primary" onClick={() =>handleEdit(!isShowModalEdit, 'post', post.id)}>Edit</button></td>
                                                <td> <button type="button" class="btn btn-danger" onClick={() => handleDelete(post.id, 'post')}>Delete</button></td>
                                            </tr>
                                        ))
                                    )
                                    
                                }

                               
                            </tbody>
                        </table>
                        </div>
                    ) ||
                    choose === 'questions' && (
                        <div className={style.contentDiv}>
                             <div className={style.horizontal}>
                                <h2>Questions</h2>
                            </div>
                            <table class="table rounded table-bordered">
                            <thead className='table table-secondary'>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Question ID</th>
                                    <th scope="col">Question Number</th>
                                    <th scope="col">Question Content</th>
                                    <th scope="col">Question Type</th>
                                    <th scope="col">Points</th>
                                    <th scope="col">Required</th>
                                    <th scope="col">Key Sensitive</th>
                                    <th scope="col">Question Answer Text</th>
                                    <th scope="col">Number Of Answer</th>
                                    <th scope="col">Choices ID</th>
                                    <th scope="col">Image ID</th>
                                    <th scope="col">Fill Layout ID</th>
                                    <th scope="col">Subject Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    questionsSet && (
                                        questionsSet.map((q) => (
                                            <tr>
                                                <th scope="row">{q.id}</th>
                                                <td>{q.questionID}</td>
                                                <td>{q.questionNumber}</td>
                                                <td>{q.questionNumber}</td>
                                                <td>{q.questionType}</td>
                                                <td>{q.points}</td>
                                                <td>{q.required}</td>
                                                <td>{q.keySensitive}</td>
                                                <td>{q.questionAnswerText}</td>
                                                <td>{q.numberOfAns}</td>
                                                <td>{q.choicesID}</td>
                                                <td>{q.imageID}</td>
                                                <td>{q.fillLayoutID}</td>
                                                <td>{q.subjectName} 1</td>
                                            </tr>
                                        ))
                                    )
                                    
                                }
                                
                               
                            </tbody>
                        </table>
                        </div>
                    ) ||
                    choose === 'quiz' && (
                        <div className={style.contentDiv}>
                             <div className={style.horizontal}>
                                <h2>Quiz</h2>
                            </div>
                            <table class="table rounded table-bordered">
                            <thead className='table table-secondary'>
                                <tr>
                                    <th scope="col">Quiz ID</th>
                                    <th scope="col">Quiz Title</th>
                                    <th scope="col">Quiz Instructions</th>
                                    <th scope="col">Question ID</th>
                                    <th scope="col">Subject Name</th>
                                    <th scope="col">Total Points</th>
                                    <th scope="col">Total Questions</th>
                                    <th scope="col">Creator</th>
                                    <th scope="col">Time</th>
                                    <th scope="col">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    quizSet && (
                                        quizSet.map((quiz) => (
                                            <tr>
                                                <th scope="row">{quiz.quizID}</th>
                                                <td>{quiz.quizTitle}</td>
                                                <td>{quiz.quizInstructions}</td>
                                                <td>{quiz.questionID}</td>
                                                <td>{quiz.subjectName}</td>
                                                <td>{quiz.totalPoints}</td>
                                                <td>{quiz.totalQuestions}</td>
                                                <td>{quiz.creator}</td>
                                                <td>{quiz.time}</td>
                                                <td>{quiz.date}</td>
                                            </tr>
                                      ))
                                    )
                                    
                                }
                               
                            </tbody>
                        </table>
                        </div>
                    ) ||
                    choose === 'schedule' && (
                        <div className={style.contentDiv}>
                             <div className={style.horizontal}>
                                <h2>Schedules</h2>
                            </div>
                            <table class="table rounded table-bordered">
                            <thead className='table table-secondary'>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Sched ID</th>
                                    <th scope="col">Post ID</th>
                                    <th scope="col">Schedule Date</th>
                                    <th scope="col">Schedule Time</th>
                                    <th scope="col">Due Date</th>
                                    <th scope="col">Due Time</th>
                                    <th scope="col">Close Date</th>
                                    <th scope="col">Close Time</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                    scheduleSet && (
                                        scheduleSet.map((schedule) => (
                                            <tr>
                                                <th scope="row">{schedule.id}</th>
                                                <td>{schedule.schedID}</td>
                                                <td>{schedule.postID}</td>
                                                <td>{schedule.schedDate}</td>
                                                <td>{schedule.schedTime}</td>
                                                <td>{schedule.dueDate}</td>
                                                <td>{schedule.dueTime}</td>
                                                <td>{schedule.closeDate}</td>
                                                <td>{schedule.closeTime}</td>
                                            </tr>
                                     ))
                                    )
                                   
                                }
                               
                            </tbody>
                        </table>
                        </div>
                    ) ||
                    choose === 'subject' && (
                        <div className={style.contentDiv}>  
                                <div className={style.horizontal}>
                                    <h2>Subjects</h2>
                                    <button id={style.btnAdd} onClick={() => {
                                        setisShowModal(true)
                                        setAddChoose('subject')
                                    }}>Add <FaPlus/></button>
                                </div>
                            <table class="table rounded table-bordered">
                            <thead className='table table-secondary'>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Subject Name</th>
                                    <th scope="col">Subject Code</th>
                                    <th scope="col" colSpan={2}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                    subjectSet && (
                                        subjectSet.map((subject) => (
                                            <tr>
                                                <th scope="row">{subject.id}</th>
                                                <td>{subject.subjectName}</td>
                                                <td>{subject.subjectCode}</td>
                                                <td> <button type="button" class="btn btn-primary" onClick={() =>handleEdit(!isShowModalEdit, 'subject', subject.id)}>Edit</button></td>
                                                <td> <button type="button" class="btn btn-danger" onClick={() => handleDelete(subject.id, 'subjects')}>Delete</button></td>
                                            </tr>
                                    ))
                                    )
                                    
                            }
                               
                            </tbody>
                        </table>
                        </div>
                    )

                } 
                
            </div>
        </div>
    </div>
  )
}

export default AdminPage