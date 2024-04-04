import React, { useEffect, useRef, useState } from 'react'
import style from './ClassHome.module.css'
import { ToastContainer, toast } from 'react-toastify';
import { Howl, Howler } from "howler";
import notifSound from '../assets/sound/notif.mp3';
import erroSound from '../assets/sound/error.mp3'; 
import sample from '../assets/sample.jpg'
import { GoHeart } from "react-icons/go"
import { GoHeartFill } from "react-icons/go"
import { AiOutlineLike, AiFillFilePpt, AiOutlineDelete } from "react-icons/ai"
import { AiFillLike } from "react-icons/ai"
import { FaFileImage, FaRegImages } from "react-icons/fa6"
import { MdSend, MdOutlineAttachment } from "react-icons/md"
import { FaFilePdf, FaFileWord, FaFileExcel } from "react-icons/fa"
import { FiDownload } from "react-icons/fi"
import FilesClass from '../components/FilesClass'
import { RiSendPlaneFill } from "react-icons/ri"
import { BiExit } from "react-icons/bi"
import { usePostStore } from '../stores/usePostStore';
import { useImageStore } from '../stores/useImageStore';
import { useAccountStore } from '../stores/useAccountsStore'
import ClassMembers from '../components/ClassMembers';
import { useNavigateStore } from '../stores/useNavigateStore';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { IoMdSettings } from "react-icons/io";
import ClassQuizSetup from './ClassQuizSetup';
import ClassAssignment from './ClassAssignment';
import { GiNotebook } from "react-icons/gi";
import { useFilesStore } from '../stores/useFilesStore';
import { SiFiles } from "react-icons/si";
import { ProgressBar } from  'react-loader-spinner';
import { useClassStore } from '../stores/useClassStore';
import { IoCloseCircle } from "react-icons/io5";
import { useQuizStore } from '../stores/useQuizStore';
import LeaderBoard from './LeaderBoard';
import { useScoreStore } from '../stores/useScoreStore';
import { useMemberStore } from '../stores/useMemberStore';
import { useReactionsStore } from '../stores/useReactionsStore';
import { useCommentsStore } from '../stores/useCommentsStore';
import { BiSolidMessageDetail } from "react-icons/bi";

import { IoSend } from "react-icons/io5";



import io from 'socket.io-client'
const socket = io.connect('http://localhost:5001')


const ClassHome = ({ currentSubjectName, currentImageClass, classCodeCurrent, currentMemberID, backToHomePage, classDesc, currentclassID }) => {

console.log(classCodeCurrent)

 const { updateClass, getClass } = useClassStore()
 const [memberID, setmemberID] = useState(currentMemberID)
 const [heartReact, setheartReact] = useState(false)
 const [uniqueId, setuniqueId] = useState('')
 const [likeReact, setlikeReact] = useState(false)
 const [choose, setChoose] = useState('home')
 const [postContent, setPostContent] = useState('')
 const [postSet, setpostSet] =useState([])
 const [name, setName] = useState('Rumar C. Pamparo')
 const [post, setPost] = useState([])
 const [fileID, setfileID] = useState('none')
 const [imageID, setimageID] = useState('none')
 const [replyID, setreplyID] = useState('none')
 const [heartCount, setheart] = useState(0)
 const [likeCount, setlike] = useState(0)
 const [subjectName, setsubjectName] = useState(null)
 const [classCode, setclassCode] =useState(classCodeCurrent)
 const [classDescription, setclassDescription] = useState(classDesc)
 const [imageFile, setimageFile] = useState(null)
 const [docxFileUploaded, setdocxFileUploaded] = useState(null)
 const [file, setFile] = useState()
 const [docxFiles, setdocxFiles] = useState()
 const [userAccount, setUserAccount] = useState(JSON.parse(localStorage.getItem('user')))
 const [imageUser, setImageUser] = useState()
 const [quiz, setquiz] = useState()
 const [members, setMembers] = useState()
 const filesList = JSON.parse(localStorage.getItem('files'))
 const [uploadedImage, setUploadedImage] = useState(null)
 const [classes, setclasses] =useState(JSON.parse(localStorage.getItem('class')) || [])
 const [fileList, setfileList] = useState()
 const [imagesList, setimagesList] = useState()
 const [postList, setpostList] = useState()
 const [scores, setscores] = useState()
 const [reactions, setreactions] = useState()
 const [comments, setcomments] = useState()
 const [accountsList, setaccountsList] = useState()
 const [commentContent, setcommentContent] = useState()
 const [classImage, setclassImage] = useState(null)

 const [currentScore, setcurrentScore] = useState(0)

 const [currentPost, setCurrentPost] = useState()
 const [currentClassPic, setCurrentClassPic] = useState()
 const [postType, setPostType] = useState('')
 const [quizObj, setQuizObj] = useState('')
 const [filteredComments, setFilteredComments] = useState([])
 const [currentPostID, setCurrentPostID] = useState()
 
 const { uploadPost, deletePost, getPost, updateHeart } = usePostStore()
 const { uploadImage, getImages, images } = useImageStore()
 const { getAccountById, currentAccount} = useAccountStore()
 const { updateRouteChoose } = useNavigateStore()
 const { getAccounts } = useAccountStore()
 const { uploadFiles, getFiles } = useFilesStore()
 const { getQuiz } = useQuizStore()
 const { getScore } =useScoreStore()
 const { getMembers } = useMemberStore()
 const { getReactions, addReactions, deleteReactions} = useReactionsStore()
 const { getComments, addComments } = useCommentsStore()
 const navigate = useNavigate()
 

 const [showChangeImageModal, setshowChangeImageModal] = useState(false)
 const [showChangeFileModal, setshowChangeFileModal] = useState(false)
 const [isShowSettings, setisShowSettings] = useState(true)
 const [showLoading, setshowLoading] =useState(true)
 const [showViewFiles, setshowViewFiles] =useState(false)
 const [viewFileName, setviewFileName]= useState(null)
 const [viewScore, setviewScore] = useState(false)
 const [showComments, setshowComments] = useState(false)

 const [currentComments, setcurrentComments] = useState([])



 const notif = new Howl({ src: [notifSound]})
 const errSound = new Howl({ src: [erroSound]})

 let time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})
 let date = new Date().toDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    weekday: 'short' 
 })


 const [currentClass, setCurrentClass] = useState(null)
 const [currentClassCode, setCurrentClassCode] = useState(classCodeCurrent)
 const [classesList, setclassesList] = useState([])
 const [updatedClassCode, setupdatedClassCode] = useState()
 const [updatedClassName, setupdatedClassName] = useState()
 const [updatedClassDesc, setupdatedClassDesc] = useState(classDescription)
 const [currentClassImageID, setcurrentClassImageID] = useState()

 const [isShowErrorMessage, setisShowErrorMessage] = useState(false)
 const inputRef = useRef(null)

 const generateImageByImageID = (imageID) => {
    if (imageID) {
        axios.get('http://localhost:5001/images/getImagesByImageID/' + imageID)
        .then((res) => {
            const image = res.data
            const url = 'http://localhost:5001/'
            const imagePath = url+image[0].data
            setclassImage(imagePath)
        })
        .catch((err) => console.log(err))
    }
 }

 useEffect(() => {
    if (currentClassCode) {
        axios.get('http://localhost:5001/classes/getClasses')
        .then((res) => {
            const value = res.data
            setclassesList(value)

            const filter = value.filter((data) => data.classCode === currentClassCode)
            if (filter) {
                generateImageByImageID(filter[0].imageID)
                setsubjectName(filter[0].className)
                setCurrentClass(filter[0])
                setcurrentClassImageID(filter[0].imageID)
            }
            
        })
        .catch((err) => {
            console.log(err)
        })
    }
 },[])


 

useEffect(()=> {
        socket.on('postNow', (data) => {
            let oldData = [...currentPost]
            oldData.push(data)
            console.log('oldData',oldData)
            setCurrentPost(oldData)
            uploadPost(data)
            refreshData()
            const message = 'Successfully posted.'
            notify(message, 'success')
        })
    
    
        getAccounts()
        getComments()
        getMembers()
        getScore()
        getPost()
        generateUniqueId()
        getImages()
        getClass()
        getFiles()
        getQuiz()
        getReactions()
        refreshData()
    

    
},[])


const refreshData = () => {
    setshowLoading(true)
    getScore()
    getPost()
    getImages()
    getClass()
    getFiles()
    getQuiz()
    getReactions()

    setTimeout(() => {
        setshowLoading(false)
        const classes = JSON.parse(localStorage.getItem('class'))
        const images = JSON.parse(localStorage.getItem('images'))
        const post = JSON.parse(localStorage.getItem('post'))
        const quiz = JSON.parse(localStorage.getItem('quiz'))
        const score = JSON.parse(localStorage.getItem('scores'))
        const members = JSON.parse(localStorage.getItem('members'))
        const reactions = JSON.parse(localStorage.getItem('reactions'))
        const files = JSON.parse(localStorage.getItem('files'))
        const comments = JSON.parse(localStorage.getItem('comments'))
        const accounts = JSON.parse(localStorage.getItem('accounts'))

        setaccountsList(accounts)
        setcomments(comments)
        setfileList(files)
        setMembers(members)
        setscores(score)
        setpostList(post)
        setimagesList(images)
        setclasses(classes)
        setquiz(quiz)
        setreactions(reactions)
        const filter = classes.filter((cls) => cls.classID === currentclassID)
        const imagePic = images.filter((cls) => cls.imageID === filter[0].imageID)
        const filterPost = post.filter((post) => post.classCode === currentClassCode)

        

        setCurrentPost(filterPost)
        const url = 'http://localhost:5001/'
        setCurrentClassPic(url + imagePic[0].data)
        setclassCode(filter[0].classCode)
        setsubjectName(filter[0].className)
        

    }, 3000);
    
}

const navigateClass = (choose, type, obj) => {
    setQuizObj(obj['quiz'])
    setChoose(choose)
    setPostType(type)
}

const handleSendReply = () => {
    if (commentContent) {

        let fileID = 'none'
        let imageID = 'none'
        let postID = currentPostID
        let updated = [...filteredComments]
        
        

        if (docxFileUploaded) {
            fileID = docxFileUploaded.fileID

            let updated = [...fileList]
            updated.push(docxFileUploaded)
            setfileList(updated)
        }

        if (imageFile) {
            imageID = imageFile.imageID

            let updated = [...imagesList]
            updated.push(imageFile)
            setimagesList(updated)
        }
        
        const data = {
            commentID: generateID(),
            postID,
            acctID: userAccount.acctID,
            content: commentContent,
            time,
            date,
            fileID,
            imageID,
        }

        addComments(data)
        updated.push(data)
        setcomments((old) => [...old, data])
        console.log('data',data)
        setFilteredComments(updated)

        const message = 'Message commented.'
        notify(message, 'success')
    }else {
        const message = 'Please input comment message.'
        notify(message, 'err')
    }
    


}

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
   setuniqueId(result)
}

const generateID = () => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const length = 8
    let result = ''
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length)
        result += charset.charAt(randomIndex)
    }
    return result
 }


 const generateQuizname = (quizID) => {
    if (quiz) {
        const filter = quiz.filter((q) => q.quizID === quizID)
        if (filter.length > 0) {
            return filter[0].quizTitle
        }
        return ''
    }
 }

const handleDeletePost = (id) => {
    const filter = currentPost.filter((posts) => posts.id !== id)
    setCurrentPost(filter)
    deletePost(id)
    refreshData()
}

const handleGetImage = (e) => {
    e.preventDefault()
    const file = e.target.files
    setFile(file)
}

const handleGetFiles = (e) => {
    e.preventDefault()
    const file = e.target.files
    setdocxFiles(file)
}

const handleUploadImage = () => {
    generateUniqueId()
    if (uniqueId) {
        const image = {
            file: file[0],
            imageID: uniqueId,
        }
        setimageFile(image)
        uploadImage(image)
        setshowChangeImageModal(false)
    }
}

const handleUploadFiles = () => {
    generateUniqueId()
    if (uniqueId) {
        const file = {
            file: docxFiles[0],
            fileID: uniqueId,
        }
        setdocxFileUploaded(file)
        uploadFiles(file)
        setshowChangeFileModal(false)
    }
}

const deleteShow = (acctID) => {
    const adminAcctID = members
        .filter((mm) => mm.memberID === currentMemberID && mm.memberType === 'admin')
        .map((mm) => mm.acctID)

    if (acctID === userAccount.acctID || adminAcctID === userAccount.acctID) {
        return true
    }
    return false
}


const handlePost = () => {
    
    if (postContent) {
        let updated = [...currentPost]
        let updatedImages = 
        generateUniqueId()
        const image = imageFile ? (imageFile.imageID) : ('none')
        const files = docxFileUploaded ? (docxFileUploaded.fileID) : ('none')

        console.log('files:',files)
        console.log('image:',image)

        let updatedPost = {

            postID: uniqueId,
            acctID: userAccount.acctID,
            name: generateFullname(),
            timePosted: time,
            datePosted: date,
            postContent,
            replyID: uniqueId,
            imageID: image,
            fileID: files,
            heartCount,
            likeCount,
            classCode: currentClassCode,
            subjectName,
            postType: 'normal',
            quizID: 'none',
            schedID: 'none',
            duration: 'none',
            random: 'none',

        }

        getFiles()
        setPost(updatedPost)
        uploadPost(updatedPost)
        updated.push(updatedPost)
        setCurrentPost(updated)
        localStorage.setItem('currentPost', JSON.stringify(updatedPost))

        reset()
        setimageFile(null)
        const message = 'Successfully posted.'
        notify(message, 'success')
    }else {
        const message = 'Please insert Content'
        notify(message, 'err')
    }

    refreshData()
    
}

const handleCalculateReact = (postID, type) => {
    if (reactions) {
        const filter = reactions.filter((r) => r.postID === postID && r.reactType === type)
        if (filter) {
            return filter.length
        }else {
            return 0
        }
    }else {
        return 0
    }
}

const handleIfalreadyClicked = (postID, type) => {
    const filter = reactions.filter((r) => r.postID === postID && r.reactType === type && r.acctID === userAccount.acctID)
    if (filter.length > 0) {
        return true
    }
    return false
}

const clickedHeart = (postID) => {
    const data = {
        reactID: generateID(),
        postID,
        acctID: userAccount.acctID,
        reactType: 'heart',
    }

    addReactions(data)
    setreactions((oldData) => [...oldData, data])
}

const unClickReact = (postID, type) => {
    const filter = reactions.filter((rec) => rec.postID === postID && rec.acctID === userAccount.acctID && rec.reactType === type)
    deleteReactions(filter[0].reactID)
    const updated = reactions.filter((rec) => rec.reactID !== filter[0].reactID)
    setreactions(updated)
}

const clickedLike = (postID) => {
    const data = {
        reactID: generateID(),
        postID,
        acctID: userAccount.acctID,
        reactType: 'like',
    }

    addReactions(data)
    setreactions((oldData) => [...oldData, data])
}

const generateFullname = () => {
    if (userAccount) {
        const fullname = userAccount.firstname + ' ' + userAccount.middlename.charAt(0) + '. ' + userAccount.lastname
        return fullname
    }else {
        console.log('accountUser none')
    }
    
}

const generateFullnameByAcctID = (acctID) => {
    const filter = accountsList.filter((act) => act.acctID === acctID)
    if (filter) {
        return filter[0].firstname + ' ' + filter[0].middlename.charAt(0).toUpperCase() + ' '+filter[0].lastname
    }
    return ''
}


const handlePostAssignment = (id, content, quizID, duration, postType, random) => {
    generateUniqueId()
    let updated = [...currentPost]

    let updatedPost = {

        postID: id ? id : uniqueId,
        acctID: userAccount.acctID,
        name: generateFullname(),
        timePosted: time,
        datePosted: date,
        postContent: content,
        replyID: uniqueId,
        imageID: 'none',
        fileID: 'none',
        heartCount,
        likeCount,
        classCode: currentClassCode,
        subjectName,
        postType: 'assignment',
        quizID,
        schedID: postType === 'post' ? ('none'):(id ? id : uniqueId),
        duration,
        random,

    }

    uploadPost(updatedPost)
    updated.push(updatedPost)
    setCurrentPost(updated)
}

const reset = () => {
    setPostContent('')
    setimageFile(null)
}

const handleEditedClassCode = (e) => {
    e.preventDefault()
    const value = e.target.value
    if (classesList) {
        const classCodeList = classesList.map((data) => data.classCode)
        let isExist = false

        for (let i = 0; i < classCodeList.length; i++) {

            if (value === classCodeList[i]) {
                isExist = true
                break
            }
        }

        if (isExist) {
            setisShowErrorMessage(true)
            inputRef.current.style.color = 'red'
        }else {
            setisShowErrorMessage(false)
            inputRef.current.style.color = '#3E3F40'
            setupdatedClassCode(value)
        }
        
}
    }
    


const handleDrop = (e) => {
    e.preventDefault()
    const value = e.dataTransfer.files[0]
    setUploadedImage(value)
}

const handleDragEnter = (e) => {
    e.preventDefault()
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
  }

const preventDefault = (e) => {
    e.preventDefault()
}


const generatePic = (imageID) => {
    getImages()
    const id = imageID
    const url = 'http://localhost:5001/'
    const allImages = JSON.parse(localStorage.getItem('images'))
    const filter = allImages.filter((img) => img.imageID === id).map((img) => img.data)
    if (url+filter[0]) {
        return url+filter[0]
    }
    return sample
}
 
const imageUserPost = (id) => {
    const accounts = JSON.parse(localStorage.getItem('accounts'))
    const imagesList = JSON.parse(localStorage.getItem('images'))
    const accountImageID = accounts.filter((account) => account.acctID === id).map((account) => account.imageID)
    const filterImage = imagesList.filter((img) => img.imageID === accountImageID[0]).map((img) => img.data)
    const url = 'http://localhost:5001/'
    return url+filterImage[0]
}

const generateFile = (fileID) => {
    
}

const handleExit = () => {
    backToHomePage('classPage')
}

const handleTakeQuiz = (quizID, postID) => {
    const obj = {
        quizID,
        postID,
    }

    localStorage.setItem('quizTakeID', JSON.stringify(obj))
    updateRouteChoose('quizTake')
} 

const generateFileName = (fileID) => {
    const files = [...filesList]
    if (fileID) {
        const result = files.filter((file) => file.fileID === fileID).map((file) => file.name)
        const final = result[0]?.match(/[a-zA-Z0-9]/g).length > 20 ? result[0]?.substring(0, 20) + '...' : result[0]
        return final
    }

}

const handleDownload = (fileID) => {
    const files = JSON.parse(localStorage.getItem('files'))
    const filter = files.filter((file) => file.fileID === fileID).map((file) => file.data)
    const url = 'http://localhost:5001/'+filter[0]
    window.location.href = url
}

const handleUploadImageChange = (e) => {
    e.preventDefault()
    const file = e.target.files[0]
    setUploadedImage(file)
}

const handleSaveSetting = () => {

    if (updatedClassName && updatedClassCode && updatedClassDesc) {
        const formData = new FormData

        formData.append('className', updatedClassName)
        formData.append('classCode', updatedClassCode)
        formData.append('classDesc', updatedClassDesc)
        formData.append('imageID', currentClassImageID)
        formData.append('oldClassCode', currentClassCode)

        if (uploadedImage) {
            formData.append('image', uploadedImage)
        }

        axios.post('http://localhost:5001/classes/updateClass', formData)
        .then((res) => res.data)
        .then((data) => {
            setsubjectName(updatedClassName)
            setCurrentClassCode(updatedClassCode)
            const message = data.message
            notify(message, 'success')
        })
        .catch((err) => console.log(err))

        return
    }else {
        const message = 'Please fill in all fields'
        notify(message, 'err')
        return
    }

}

const handleViewFile = (fileID) => {
    const filter = fileList.filter((files) => files.fileID === fileID)
    const filePath = 'http://localhost:5001/' + filter[0].data
    console.log(filter[0].data)
    setviewFileName(filePath)
    setshowViewFiles(true)
}

const checkIfPDFfile = (fileID) => {
    const filter = fileList.filter((files) => files.fileID === fileID)

    if (filter.length > 0) {
        if (filter[0].type === 'application/pdf') {
            return true
        }
    }
    
    return false
}

const ifAlreadyTaken = (quizID) => {
    const filter = scores.filter((scr) => scr.quizID === quizID).map((scr) => scr.acctID)
    if (userAccount.acctID === filter[0]) {
        return true
    }
    return false
}

const handleViewScore = (quizID) => {
    setviewScore(true)
    const filter = scores.filter((scr) => scr.quizID === quizID && scr.acctID === userAccount.acctID).map((scr) => scr.score)
    setcurrentScore(filter[0])
}

const handleChooseHome = () => {
    refreshData()
    setChoose('home')
}

const handleShowComments = (post) => {
    const { replyID, postID } = post
    setCurrentPostID(postID)

    if (comments) {
        const filter = comments.filter((coms) => coms.postID === replyID)
        setFilteredComments(filter)
    }
    setcurrentComments(post)
    setshowComments(true)
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
                    <p>Loading...</p>
                </div>
            )
        }

        {
            showComments && currentComments && (
                <div className={style.commentCard} style={{ height: filteredComments.length > 0 ? '100%' : 'auto' }}>
                    <div className={style.comTop}>
                        <div className='d-flex gap-2 align-items-center'>
                            <img src={imageUserPost(currentComments.acctID)} alt="picture" id={style.comDP}/>
                            <h2>{currentComments.name}</h2>
                            <p style={{ fontSize: '10pt', margin: '0px'}}>({currentComments.datePosted} at {currentComments.timePosted})</p>
                        </div>
                        <IoCloseCircle size={30} color='#F45050' cursor={'pointer'} onClick={() => setshowComments(false)}/>
                    </div>
                    <div className={style.comContent} style={{ height: filteredComments.length > 0 ? '90%' : 'auto' }}>
                        <div className={style.textPost}>{currentComments.postContent}</div>
                        {
                            currentComments.imageID !== 'none' &&
                            <img src={generatePic(currentComments.imageID)} alt="img" id={style.imagePost}/>
                        }
                        
                        {
                            currentComments.fileID !== 'none' && (
                                <div id={style.cardCommentFiles}>
                                    <SiFiles size={30} color='#F45050'/>
                                    <p>{generateFileName(currentComments.fileID)}</p>
                                </div>
                            )
                        }

                        {
                            currentComments.quizID !== 'none' && (
                                <div id={style.cardCommentFiles}>
                                    <GiNotebook size={30} color='#4F6F52'/>
                                    <p>{generateQuizname(currentComments.quizID)}</p>
                                </div>
                            )
                        }

                        {
                            filteredComments.length > 0 && 
                                <>
                                    <h1>Comments:</h1> {
                                        filteredComments.map((coms) => (
                                            <div className={style.comsLayout}>
                                                <img src={imageUserPost(coms.acctID)} alt="picture" id={style.bubbleDP}/>
                                                <div className={style.bubble}>
                                                    <div className={style.comsHeadPart}>
                                                        <h2>{generateFullnameByAcctID(coms.acctID)}</h2>
                                                        <br />
                                                        <p style={{ fontSize: '8pt'}}>({coms.date} at {coms.time})</p>
                                                    </div>
                                                    <p style={{ fontSize: '12pt'}}>{coms.content}</p>
                                                    {
                                                        coms.imageID !== 'none' &&
                                                        <img src={generatePic(coms.imageID)} alt="image" width={200} style={{ borderRadius: '10px'}}/>
                                                    }
                                                    {
                                                         coms.fileID !== 'none' &&
                                                         <div id={style.comsFiles}>
                                                            <SiFiles size={30} color='#F45050'/>
                                                            <p>{generateFileName(coms.fileID)}</p>
                                                            <FiDownload size={20} cursor={'pointer'} color='#3E3F40' onClick={() =>handleDownload(coms.fileID)}/>
                                                        </div>
                                                    }
                                                        
                                                </div>
                                            </div>
                                        ))
                                    }
                                </>
                        }
                        

                    </div>
                    <div className={style.commentFooter}>
                        <textarea onChange={(e) => setcommentContent(e.target.value)} placeholder='Insert comment...'></textarea>
                        <div className='d-flex flex-column'>
                            <MdOutlineAttachment size={20} cursor={'pointer'} onClick={() => setshowChangeFileModal(true)}/>
                            <FaRegImages size={18} cursor={'pointer'} onClick={() => setshowChangeImageModal(true)}/>
                        </div>
                        <button size={29} id={style.sendBtnComs} onClick={handleSendReply}>Reply</button>
                    </div>
                </div>
            )
        }

        {
            viewScore && (
                <div className={style.exitTrapNotif}>
                    <BiExit size={20} id={style.exitScore} title='exit' cursor={'pointer'} onClick={() =>setviewScore(false)}/>
                    <p>YOUR SCORE:</p>
                    <h2 style={{ color: '#099AED' }}>{currentScore}</h2>
                </div>
            )
        }

        {
                showChangeImageModal && (
                    <div className={style.changeImageContainer}>
                        <div className={style.headerImagePic}>
                            <div className='d-flex gap-2 align-items-center'>
                                <p>Upload Image</p>
                            </div>
                             
                            <BiExit size={20} title='closed' cursor={'pointer'} onClick={() => setshowChangeImageModal(false)}/>
                        </div>
                        <img src={file? URL.createObjectURL(file[0]) : sample } alt="image" id={style.imgChangePic}/>
                        <input type="file" accept='image/*' id={style.imgUpload} onChange={handleGetImage}/>
                        <button className={style.btnChangeImage} onClick={handleUploadImage}>Upload</button>
                    </div>
                )
        }

        {
                showChangeFileModal && (
                    <div className={style.changeFileContainer}>
                        <div className={style.headerImagePic}>
                            <div className='d-flex gap-2 align-items-center'>
                                <p>Upload File</p>
                            </div>
                             
                            <BiExit size={20} title='closed' cursor={'pointer'} onClick={() => setshowChangeFileModal(false)}/>
                        </div>
                        <input type="file" accept='.doc, .docx, .ppt, .pptx, .pdf, .txt, .rtf, .odt, .odp, .ods, .xls, .xlsx, .csv' id={style.imgUpload} onChange={handleGetFiles}/>
                        <button className={style.btnChangeImage} onClick={handleUploadFiles}>Upload</button>
                    </div>
                )
        }

        {
                showViewFiles && viewFileName && (
                    <div className={style.prevFileCon}>
                        <IoCloseCircle size={30} color='#BB2525' cursor={'pointer'} onClick={() => setshowViewFiles(false)}/>
                        <iframe src={'http://localhost:5001/file_1705777205783.pdf'} width="100%" height="100%" ></iframe>
                    </div>
                )
        }

        <div className={style.leftContent}>
            {
                isShowSettings ? (
                    <>
                        <IoMdSettings size={25} title='setting class' id={style.settings} onClick={() => setisShowSettings(false)}/>
                        <img src={classImage} alt="pic" id={style.imgClass} />
                        <h2>{currentClass?.className}</h2>
                        <p>{currentClassCode}</p>
                        <button className={choose === 'home' ? style.btnNavActive : style.btnNav} onClick={handleChooseHome}>Home</button>
                        {
                            userAccount?.acctype === 'faculty' && (
                                <>
                                    <button className={choose === 'quizSetup' ? style.btnNavActive : style.btnNav} onClick={() => setChoose('quizSetup')}>Create Quiz</button>
                                    <button className={choose === 'leaderboard' ? style.btnNavActive : style.btnNav} onClick={() => setChoose('leaderboard')}>Leaderboard</button>
                                    <button className={choose === 'assignment' ? style.btnNavActive : style.btnNav} onClick={() => setChoose('assignment')}>Assignment</button>
                                </>
                            )
                        }
                        <button className={choose === 'members' ? style.btnNavActive : style.btnNav} onClick={() => setChoose('members')}>Class Members</button>
                        <button className={choose === 'exit' ? style.btnNavActive : style.btnNav} onClick={() => handleExit()}>Exit</button>                   
                    </>
                ) : (
                    <div className={style.settingDiv}>
                        <div
                            className={style.circleUpload}
                            onDrop={handleDrop}
                            onDragOver={preventDefault}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                        >
                            { uploadedImage ? (
                                <img src={URL.createObjectURL(uploadedImage)} alt="Uploaded" className={style.imgUploaded} />
                            ) : ( 
                                'Drag & drop an image here.'
                            )}
                        </div>
                        <input 
                            type="file"
                            accept="image/*"
                            onChange={handleUploadImageChange}
                            style={{ display: 'none' }}

                        />
                        <div className='d-flex flex-column w-100'>
                            <p id={style.titleSetting}>Class Name</p>
                            <input type="text" value={updatedClassName} placeholder={subjectName} onChange={(e) => setupdatedClassName(e.target.value)}/>
                            <p id={style.titleSetting}>Class Code</p>
                            <input type="text" ref={inputRef} value={updatedClassCode} placeholder={currentClassCode} onChange={handleEditedClassCode}/>
                            {isShowErrorMessage && <p className={style.errorMessage}>Class code already exist.</p>}
                            
                            <p id={style.titleSetting}>Description</p>
                            <textarea type="text" value={updatedClassDesc} placeholder='input class description...' onChange={(e) => setupdatedClassDesc(e.target.value)}/>
                            <div className='d-flex gap-2'>
                                <button onClick={handleSaveSetting}>Save</button>
                                <button onClick={() => setisShowSettings(true)} style={{ backgroundColor: '#3E3F40' }}>Back</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
        <div className={style.rightContent}>
            
            {
                choose === 'home' && (
                    <>
                        <div className={style.card}>
                            <div className='d-flex flex-column gap-2'>
                                <div className='d-flex align-items-center gap-1'>
                                    <img src={imageUserPost(userAccount.imageID)} alt="profile" id={style.imgDp}/>
                                    <h2 id={style.name}>{generateFullname()}</h2>
                                    <div className={style.menuUpper}>
                                        <MdOutlineAttachment className={style.upperIcons}  onClick={() => setshowChangeFileModal(true)}/>
                                        <FaRegImages className={style.upperIcons} onClick={() => setshowChangeImageModal(true)}/>
                                        <button id={style.btnPost} onClick={handlePost}>Post <RiSendPlaneFill/></button>
                                    </div>
                                </div>
                                <div className='d-flex gap-2 '>
                                    {
                                        imageFile ? (<img src={URL.createObjectURL(imageFile.file)} alt="image" id={style.imgPostPreview}/>) : ''
                                    }
                                    {
                                        docxFileUploaded && (<SiFiles size={30} color='#F45050'/>)
                                    }
                                    
                                    <textarea className={style.textarea} value={postContent} placeholder="What's on your mind?" onChange={(e) => setPostContent(e.target.value)}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className={style.listPostContainer}>
                        {
                            currentPost ? (
                                currentPost.slice().reverse().map((post, index) => (
                                    <div className={style.card} key={index}>
                                        <div className={style.top}>
                                            <img src={imageUserPost(post.acctID)} alt="profile" id={style.imgDp}/>
                                            <h2>{post.name}</h2>
                                            <p>{post.timePosted +' ('+post.datePosted+')'}</p>
                                                {
                                                    deleteShow(post.acctID) && <AiOutlineDelete id={style.deleteBtn} title='delete' onClick={() => handleDeletePost(post.id)}/>
                                                }
                                        </div>
                                        <div className={style.body}>
                                            <p>{post.postContent}</p>
                                            {
                                                post.imageID !== 'none' && (<img src={generatePic(post.imageID)} alt="photo" id={style.imgSend}/>)
                                            }
                                            {
                                                post.fileID !== 'none'  && (
                                                    <>
                                                        <div id={style.filePdf}>
                                                            <SiFiles size={30} color='#F45050'/>
                                                            <p>{generateFileName(post.fileID)}</p>
                                                            {
                                                                checkIfPDFfile(post.fileID) && <div id={style.viewFile} onClick={() =>handleViewFile(post.fileID)}>View</div>
                                                            }
                                                            
                                                            <FiDownload size={20} cursor={'pointer'} color='#3E3F40' onClick={() =>handleDownload(post.fileID)}/>
                                                        </div>
                                                        
                                                    </>
                                                )
                                            }
                                            {
                                                post.quizID !== 'none'  && (
                                                        <div id={style.quizBox}>
                                                            <div className='d-flex gap-2'>
                                                                <GiNotebook size={20} color='#186F65'/>
                                                                <p>{quiz.filter((q) => q.quizID === post.quizID).map((q)=> q.quizTitle)}</p>
                                                            </div>
                                                            {
                                                        
                                                                userAccount?.acctype === 'student' && (
                                                                    !ifAlreadyTaken(post.quizID) ? (
                                                                        <button className={style.btnView} onClick={() => handleTakeQuiz(post.quizID, post.postID)}>Take</button>
                                                                    ):(
                                                                        <button className={style.btnView} style={{ backgroundColor: '#4F6F52' }} onClick={() =>handleViewScore(post.quizID)}>Score</button>
                                                                    )
                                                                )
                                                            }
                                                            
                                                        </div>
                                                )
                                            }

                                        </div>
                                        
                                        
                                        <div className={style.footer}>
                                            { 
                                                handleIfalreadyClicked(post.postID, 'heart') ?
                                                        <GoHeartFill 
                                                            onClick={() => unClickReact(post.postID, 'heart')}
                                                            cursor={'pointer'}
                                                            size={20}
                                                            color='#F45050'
                                                        />
                                                     : 
                                                        <GoHeart 
                                                            cursor={'pointer'}
                                                            size={20}
                                                            color='#3E3F40'
                                                            onClick={() =>clickedHeart(post.postID)}
                                                        />
                                                         
                                            }
                                            <p>{handleCalculateReact(post.postID, 'heart')}</p>
                        
                                            {
                                                handleIfalreadyClicked(post.postID, 'like') ? 
                                                    <AiFillLike
                                                        onClick={() => unClickReact(post.postID, 'like')}
                                                        cursor={'pointer'}
                                                        size={20}
                                                        color='#3081D0'
                                                    /> :
                                                    <AiOutlineLike
                                                        onClick={() => clickedLike(post.postID)}
                                                        cursor={'pointer'}
                                                        size={20}
                                                        color='#3E3F40'
                                                    />
                                            }
                                            <p>{handleCalculateReact(post.postID, 'like')}</p>
                                            
                                            <BiSolidMessageDetail 
                                                cursor={'pointer'}
                                                size={20}
                                                color='#508D69'
                                                onClick={() =>handleShowComments(post)}
                                            />
                                                
                                            
                                            
                                        </div>
                                        
                                    </div>
                                    
                                ))
                           
                             ) : ('no post')
                        }
                        </div>
                    </>
                )
            } 
            { choose === 'files' && <FilesClass/> }
            { choose === 'leaderboard' && <LeaderBoard/> }
            { choose === 'quizSetup' && <ClassQuizSetup subjectName={subjectName} navigateClass={navigateClass} postType={postType} classCode={classCode} refreshData={refreshData}/> }
            { choose === 'assignment' && <ClassAssignment postType={postType} quizObj={quizObj} handlePostAssignment={handlePostAssignment}/> }
            { choose === 'members' && <ClassMembers memberID={memberID}/> }

        </div>
    </div>
  )             
}

export default ClassHome