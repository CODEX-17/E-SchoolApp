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
import { IoDocumentText } from "react-icons/io5";
import { FaFolderOpen } from "react-icons/fa";
import generateImageByImageID from '../utils/generateImageByImageID'

import { FaPlus } from "react-icons/fa";
import generateFullname from '../utils/generateFullname';
import postContentHook from '../utils/postContentHook'


import { IoSend } from "react-icons/io5";



import io from 'socket.io-client'
const socket = io.connect('http://localhost:5001')


const ClassHome = ({ currentSubjectName, currentImageClass, classCodeCurrent, currentMemberID, backToHomePage, classDesc, currentclassID }) => {

 const { updateClass, getClass } = useClassStore()

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
 const [file, setFile] = useState(null)
 const [docxFiles, setdocxFiles] = useState(null)
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
 const [commentContent, setcommentContent] = useState(null)
 const [classImage, setclassImage] = useState(null)

 const [currentScore, setcurrentScore] = useState(0)

 const [currentPost, setCurrentPost] = useState(null)
 const [postType, setPostType] = useState('')
 const [quizObj, setQuizObj] = useState('')
 const [filteredComments, setFilteredComments] = useState([])
 
 
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
 

 const [showPostModal, setshowPostModal] = useState(false)
 const [showChangeFileModal, setshowChangeFileModal] = useState(false)
 const [isShowSettings, setisShowSettings] = useState(true)
 const [showLoading, setshowLoading] =useState(true)
 const [showViewFiles, setshowViewFiles] =useState(false)
 const [viewFileName, setviewFileName]= useState(null)
 const [viewScore, setviewScore] = useState(false)
 const [showComments, setshowComments] = useState(false)
 const inputImageFileRef = useRef(null)
 const inputFilesRef = useRef(null)
 const inputImageFileRefComment = useRef(null)
 const inputFilesRefComment = useRef(null)


 const notif = new Howl({ src: [notifSound]})
 const errSound = new Howl({ src: [erroSound]})

 let time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})
 let date = new Date().toDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    weekday: 'short' 
 })

 //Props variables
 const [currentClass, setCurrentClass] = useState(null)
 const [currentClassCode, setCurrentClassCode] = useState(classCodeCurrent)
 const [memberID, setmemberID] = useState(currentMemberID)
 
 const [updatedClassCode, setupdatedClassCode] = useState()
 const [updatedClassName, setupdatedClassName] = useState()
 const [updatedClassDesc, setupdatedClassDesc] = useState(classDescription)
 const [currentClassImageID, setcurrentClassImageID] = useState()


 const [isShowErrorMessage, setisShowErrorMessage] = useState(false)
 const [showViewImage, setshowViewImage] = useState(false)

 //Selecting variables
 const [selectedPostID, setSelectedPostID] = useState(null)
 const [selectedPost, setSelectedPost] = useState(null)
 const [selectedComments, setSelectedComments] = useState(null)

 //Variables for storing datas from fetching API
 const [classesList, setclassesList] = useState([])
 const [imageList, setimageList] = useState(null)
 const [filesLists, setfilesLists] = useState(null)
 const [commentsList, setcommentsList] = useState(null)
 const [acctImagesList, setacctImagesList] = useState(null)
 const [reactionsList, setreactionsList] = useState(null)

 //UseRef variables
 const inputRef = useRef(null)

 const generateClassImageByImageID = (imageID) => {
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
                generateClassImageByImageID(filter[0].imageID)
                setsubjectName(filter[0].className)
                setCurrentClass(filter[0])
                setcurrentClassImageID(filter[0].imageID)
            }
            
        })
        .catch((err) => {
            console.log(err)
        })


        //GET POST BY CLASSCODE
        axios.get('http://localhost:5001/post/getPostByClassCode/' + currentClassCode)
        .then((res) => {
            const value = res.data
            console.log('currentPost: ',value)
            setCurrentPost(value)
        })
        .catch((err) => {
            console.log(err)
        })

        //GET REACTIONS BY POST ID
        axios.get('http://localhost:5001/reacts/getReactsByPostID/' + currentClassCode)
        .then((res) => {
            const value = res.data
            setreactionsList(value)
        })
        .catch((err) => {
            console.log(err)
        })

        //GET ALL ACCOUNT IMAGES
        axios.get('http://localhost:5001/images/getAccountImages')
        .then((res) => setacctImagesList(res.data))
        .catch((err) => console.log(err))

        //GET ALL QUIZ
        axios.get('http://localhost:5001/quiz/getQuiz')
        .then((res) => setquiz(res.data))
        .catch((err) => console.log(err))

        //GET ALL SCORE
        axios.get('http://localhost:5001/scores/getScores')
        .then((res) => setscores(res.data))
        .catch((err) => console.log(err))

        //GET COMMENTS BY CLASSCODE
        getCommentsByClassCode()

        //GET FILES BY CLASSCODE
        getFilesByClassCode()

        //GET IMAGES BY CLASSCODE
        getImagesByClassCode()
        
    }

 },[])

 

 const getCommentsByClassCode = () => (

    //GET COMMENTS BY CLASSCODE
    axios.get('http://localhost:5001/comments/getCommentsByClassCode/' + currentClassCode)
    .then((res) => {
        const value = res.data
        console.log('comments', value)
        setcommentsList(value)
        setshowLoading(false)
    })
    .catch((err) => {
        console.log(err)
    })
 )

 const getImagesByClassCode = () => (

    //GET IMAGES BY CLASSCODE
    axios.get('http://localhost:5001/images/getImagesByClassCode/' + currentClassCode)
    .then((res) => {
        const value = res.data
        console.log('images', value)
        setimageList(value)
        setshowLoading(false)
    })
    .catch((err) => {
        console.log(err)
    })
 )

 const getFilesByClassCode = () => (

    //GET FILES BY CLASSCODE
    axios.get('http://localhost:5001/files/getFilesByClassCode/' + currentClassCode)
    .then((res) => {
        const value = res.data
        console.log('files', value)
        setfilesLists(value)
    })
    .catch((err) => {
        console.log(err)
    })
 )

// socket.on('postNow', (data) => {
        //     let oldData = [...currentPost]
        //     oldData.push(data)
        //     console.log('oldData',oldData)
        //     setCurrentPost(oldData)
        //     uploadPost(data)
        //     const message = 'Successfully posted.'
        //     notify(message, 'success')
        // })
        
useEffect(()=> {

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
    
},[])

const handleUploadImageClick = () => {
    inputImageFileRef.current.click()
}

const handleUploadFilesClick = () => {
    inputFilesRef.current.click()
}

const closePostModal = () => {
    setPostContent('')
    setdocxFiles(null)
    setFile(null)
    setshowPostModal(false)
}

const deleteImageInPostModal = (currentIndex) => {
    const oldImages = file
    const filter = oldImages.filter((data, index) => index !== currentIndex)
    setFile(filter)
}

const deleteFilesInPostModal = (currentIndex) => {
    const oldFiles = docxFiles
    const filter = oldFiles.filter((data, index) => index !== currentIndex)
    setdocxFiles(filter)
}

const navigateClass = (choose, type, obj) => {
    setQuizObj(obj['quiz'])
    setChoose(choose)
    setPostType(type)
}

const submitReply = () => {
    if (commentContent || file || docxFiles) {

        console.log(commentContent,file,docxFiles)

        let fileID = 'none'
        let imageID = 'none'
        let content = ''

        const id = generateID()

        if (docxFiles) {
            fileID = id
        }

        if (file) {
            imageID = id
        }

        if (commentContent) {
            content = commentContent
        }

        let data = {
            content,
            replyID: selectedPost.postID,
            postID: selectedPost.postID,
            acctID: userAccount.acctID,
            fullname: generateFullname(),
            classCode: currentClassCode,
            time,
            date,
            file: docxFiles,
            image: file,
        }

        // if image is not null it return unique id
        if (data.image) {
            data.imageID = id
        }else {
            data.imageID = 'none'
        }

        // if file is not null it return unique id
        if (data.file) {
            data.fileID = id
        }else {
            data.fileID = 'none'
        }

        console.log('data', data)

        axios.post('http://localhost:5001/comments/addComment', data)
        .then((res) => {

            const result = res.data
            const message = result.message

            //API for adding image of post
            if (data.image) {
                
                const images = data.image
                const formData = new FormData
                formData.append('imageID', data.imageID)
                formData.append('dateUploaded', data.datePosted)
                formData.append('timeUploaded', data.timePosted)
                formData.append('acctID', data.acctID)
                formData.append('classCode', data.classCode)

                for (let i = 0; i < images.length; i++) {
                    formData.append('image', images[i])
                }
                
                axios.post('http://localhost:5001/images/addImage', formData )
                .then((res) => {
                    const data = res.data
                    setshowLoading(true)
                    getImagesByClassCode()
                    console.log(data.message)
                })
                .catch((err) => {
                    console.log(err)
                })

            }

            //If fileID is not equal to none
            if (data.file) {

                const files = data.file
                const formData = new FormData
                formData.append('fileID', data.fileID)
                formData.append('dateUploaded', date)
                formData.append('timeUploaded', time)
                formData.append('acctID', data.acctID)
                formData.append('classCode', data.classCode)
                
                for (let i = 0; i < files.length; i++) {
                    formData.append('file', files[i])
                }

                axios.post('http://localhost:5001/files/addFiles', formData)
                .then((res) => {
                    const data = res.data
                    getFilesByClassCode()
                    console.log(data.message)
                })
                .catch((err) => {
                        console.log(err)
                    })
            }

            const { file: fileData, image: imageData, ...newData } = data
            setSelectedComments((oldData) => [...oldData, newData])

            getCommentsByClassCode()
            notify(message, 'success')

        })
        .catch((err) => console.log(err))

        setFile(null)
        setdocxFiles(null)
        setcommentContent('')

        
        
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

 
// Delete post by postID
const handleDeletePost = (postID, imageID, fileID) => {

    if (postID && currentPost) {
        
        //API delete post in table post
        axios.delete('http://localhost:5001/post/deletePostByPostID/' + postID)
        .then((res) => {
            const result = res.data
            const message = result.message
            console.log(message)

            //check if the imageID is not equal to none
            if (imageID !== 'none') {

                //Get the image name by imageID
                const imageName = imageList.filter((image) => image.imageID === imageID).map((image) => image.data)
                
                const imageDetails = {
                    name: imageName,
                    imageID,
                }
                
                //Delete image from database
                axios.delete('http://localhost:5001/images/deleteImage', { data: imageDetails })
                .then((res) => {
                    const result = res.data
                    const message = result.message
                    console.log(message)
                }).catch((err) => console.log(err))

            }
            
            //If fileID is not equal to none
            if (fileID !== 'none') {

                //Get the file name by fileID
                const fileName = filesLists.filter((files) => files.fileID === fileID).map((files) => files.data)
                
                const fileDetails = {
                    name: fileName,
                    fileID,
                }
                
                //Delete image from database
                axios.delete('http://localhost:5001/files/deleteFiles', { data: fileDetails })
                .then((res) => {
                    const result = res.data
                    const message = result.message
                    console.log(message)
                }).catch((err) => console.log(err))
            }


        })
        .catch((err) => console.log(err))


        const filter = currentPost.filter((data) => data.postID !== postID)
        setCurrentPost(filter)
    }
}

const handleGetImage = (e) => {
    e.preventDefault()
    const file = e.target.files
    const fileList = Array.from(file)
    console.log(fileList)
    setFile(fileList)
}

const handleGetFiles = (e) => {
    e.preventDefault()
    const file = e.target.files
    const fileList = Array.from(file)
    console.log(fileList)
    setdocxFiles(fileList)
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


// Delete post icon show if the user are poster
const deleteShow = (acctID) => {
    if (acctID === userAccount.acctID) {
        return true
    }

    return false
}


// Submit new post
const handlePost = () => {

        // insert current post in variable
        let updated = [...currentPost]
        
        let updatedPost = {
            postID: uniqueId,
            acctID: userAccount.acctID,
            name: generateFullname(),
            timePosted: time,
            datePosted: date,
            postContent,
            replyID: uniqueId,
            image: file,
            file: docxFiles,
            heartCount,
            likeCount,
            classCode: currentClassCode,
            subjectName,
            postType: 'normal',
            quizID: 'none',
            schedID: 'none',
            duration: 0,
            random: 'none',
        }

        // if image is not null it return unique id
        if (updatedPost.image) {
            updatedPost.imageID = uniqueId
        }else {
            updatedPost.imageID = 'none'
        }

        // if file is not null it return unique id
        if (updatedPost.file) {
            updatedPost.fileID = uniqueId
        }else {
            updatedPost.fileID = 'none'
        }

        // add post in variable
        updated.push(updatedPost)
        setCurrentPost(updated)

        console.log(updatedPost)

        // API for adding post
        axios.post('http://localhost:5001/post/addPost', updatedPost )
        .then((res) => {
            const data = res.data
            console.log(data.message)

            //API for adding image of post
            if (updatedPost.image) {
                
                const images = updatedPost.image
                const formData = new FormData
                formData.append('imageID', updatedPost.imageID)
                formData.append('dateUploaded', updatedPost.datePosted)
                formData.append('timeUploaded', updatedPost.timePosted)
                formData.append('acctID', updatedPost.acctID)
                formData.append('classCode', updatedPost.classCode)

                for (let i = 0; i < images.length; i++) {
                    formData.append('image', images[i])
                }
                
                axios.post('http://localhost:5001/images/addImage', formData )
                .then((res) => {
                    const data = res.data
                    setshowLoading(true)
                    getImagesByClassCode()
                    console.log(data.message)
                })
                .catch((err) => {
                    console.log(err)
                })

            }

            //API for adding docs of post
            if (updatedPost.file) {
                
                const files = updatedPost.file
                const formData = new FormData
                formData.append('fileID', updatedPost.fileID)
                formData.append('dateUploaded', updatedPost.datePosted)
                formData.append('timeUploaded', updatedPost.timePosted)
                formData.append('acctID', updatedPost.acctID)
                formData.append('classCode', updatedPost.classCode)
                
                for (let i = 0; i < files.length; i++) {
                    formData.append('file', files[i])
                }

                axios.post('http://localhost:5001/files/addFiles', formData)
                .then((res) => {
                    const data = res.data
                    getFilesByClassCode()
                    console.log(data.message)
                })
                .catch((err) => {
                     console.log(err)
                 })

            }

            // reset variables
            setPostContent('')
            setFile(null)
            setdocxFiles(null)
            setshowPostModal(false)

            // notification for success
            const message = 'posted successfully'
            notify(message, 'success')
            
        })
        .catch((err) => console.log(err))

}

const handleCalculateReact = (postID, type) => {
    if (reactionsList) {
        const filter = reactionsList.filter((data) => data.postID === postID && data.reactType === type)
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
    if (reactionsList) {
        const filter = reactionsList.filter((data) => data.postID === postID && data.reactType === type && data.acctID === userAccount.acctID)
        if (filter.length > 0) {
            return true
        }else {
            return false
        }
    }
    
    
}

const clickReact = (postID, type) => {

    const data = {
        reactID: generateID(),
        postID,
        classCode: currentClassCode,
        acctID: userAccount.acctID,
        reactType: type,
    }

    axios.post("http://localhost:5001/reacts/addReactions", data)
    .then(res => {
        const value = res.data
        console.log(value.message)
        setreactionsList((oldData) => [...oldData, data])
    })
    .catch(err => console.log(err))

}

const unClickReact = (postID, type) => {
    
    const filter = reactionsList.filter((data) => data.postID === postID && data.acctID === userAccount.acctID && data.reactType === type)
    const reactID = filter[0].reactID
    axios.delete("http://localhost:5001/reacts/deleteReactionsByreactID/" + reactID)
    .then(res => {
        const data = res.data
        console.log(data.message)
        const updated = reactionsList.filter((data) => data.reactID !== reactID)
        setreactionsList(updated)
    })
    .catch(err => console.log(err))
    
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
    if (imageID) {
        const url = 'http://localhost:5001/'
        const filter = imageList.filter((data) => data.imageID === imageID).map((img) => url + img.data)
        return filter[0]
    }
    
}
 
const imageUserPost = (acctID) => {
    if (acctID && acctImagesList) {
        const filter = acctImagesList.filter((data) => data.imageID === acctID).map((img) => img.data)
        const url = 'http://localhost:5001/'
        return url+filter[0]
    }
}

const shortenFileName = (fileName) => {
    if (fileName.length > 25) {
        return fileName.substring(0, 25) + '...'
    }

    return fileName
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
    if (fileID && filesList) {
        const result = filesList.filter((file) => file.fileID === fileID).map((file) => file.name)
        const final = result[0]?.match(/[a-zA-Z0-9]/g).length > 20 ? result[0]?.substring(0, 20) + '...' : result[0]
        return final
    }
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

const handleDownload = (fileName) => {
    if (fileName) {
        const filePath = 'http://localhost:5001/' + fileName
        window.location.href = filePath
    }
   
}

const handleViewFile = (fileName) => {
    if (fileName) {
        const filePath = 'http://localhost:5001/' + fileName
        setviewFileName(filePath)
        setshowViewFiles(true)
    }
}

const handleViewImage = (fileName) => {
    if (fileName) {
        setviewFileName(fileName)
        setshowViewImage(true)
    }
}

const checkIfPDFfile = (fileName) => {
    if (fileName) {
        const filter = filesLists.filter((files) => files.data === fileName).map((files) => files.type)
        
        if (filter) {
            if (filter[0] === 'application/pdf') {
                return true
            }
        }
        
        return false
    }
}

const getFilesUrlsByFileID = (fileID) => {
    if (fileID && filesLists) {
        const filter = filesLists.filter((data) => data.fileID === fileID)
        return filter
    }   
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
    setChoose('home')
}


//Handle function when click the comment icon
const handleShowComments = (postID) => {

    if (postID && commentsList) {
        setSelectedPostID(postID)

        //Filter the selected post by postID
        const filterPost = currentPost.filter((data) => data.postID === postID)
        console.log(filterPost)
        setSelectedPost(filterPost[0])

        //Filter the comments by postID
        const filter = commentsList.filter((data) => data.postID === postID)
        
        if (filter) {
            setSelectedComments(filter)
        }

        setshowComments(true)
    }
}


const getImageUrlsByImageID = (imageID) => {
    if (imageID && imageList) {
        const url = 'http://localhost:5001/'       
        const filter = imageList.filter((data) => data.imageID === imageID).map((data) => url + data.data)
        return filter
    }
    
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
            showComments && selectedPost && (
                <div className={style.commentSection}>
                    <div className={style.commentCard}>
                        <div className={style.comTop}>
                            <div className='d-flex gap-2 align-items-center'>
                                <img src={imageUserPost(selectedPost.acctID)} alt="picture" id={style.comDP}/>
                                <h2>{selectedPost.name}</h2>
                                <p style={{ fontSize: '7pt', margin: '0px'}}>({selectedPost.datePosted} at {selectedPost.timePosted})</p>
                            </div>
                            <IoCloseCircle size={30} color='#F45050' cursor={'pointer'} onClick={() => setshowComments(false)}/>
                        </div>
                        <h1 id={style.textPost}>{selectedPost.postContent}</h1>
                        <div className={style.comContent} >
                            {
                                selectedPost.imageID !== 'none' && (
                                    <div className={style.imageViewSlider}>
                                        {
                                            getImageUrlsByImageID(selectedPost.imageID).map((data) => (
                                                <div className={style.imgContainer} onClick={() => handleViewImage(data)}>
                                                    <img src={data} alt="photo" id={style.imgSend}/>
                                                </div>  
                                            ))  
                                        }
                                    </div>
                                )
                                
                                
                            }
                        
                            {
                                selectedPost.fileID !== 'none' && (
                                    getFilesUrlsByFileID(selectedPost.fileID) &&
                                    getFilesUrlsByFileID(selectedPost.fileID).map((data, index) => (
                                        <div id={style.filePdf}>
                                            <SiFiles size={30} color='#F45050'/>
                                            <p>{shortenFileName(data.name)}</p>
                                            {
                                                checkIfPDFfile(data.data) && <div id={style.viewFile} onClick={() =>handleViewFile(data.data)}>View</div>
                                            }
                                            
                                            <FiDownload size={20} cursor={'pointer'} color='#3E3F40' onClick={() =>handleDownload(data.data)}/>
                                        </div>
                                    ))
                                )
                            }    

                            {
                                selectedPost.quizID !== 'none' && (
                                    <div id={style.cardCommentFiles}>
                                        <GiNotebook size={30} color='#4F6F52'/>
                                        <p>{generateQuizname(selectedPost.quizID)}</p>
                                    </div>
                                )
                            }
                            <hr/>

                            {
                                showComments && selectedComments && 
                                    <>
                                        <h1>Comments:</h1> {
                                            selectedComments.map((coms) => (
                                                <div className={style.comsLayout}>
                                                    <img src={imageUserPost(coms.acctID)} alt="picture" id={style.bubbleDP}/>
                                                    <div className={style.bubble}>
                                                        <div className={style.comsHeadPart}>
                                                            <h2>{coms.fullname}</h2>
                                                            <br />
                                                            <p style={{ fontSize: '8pt'}}>({coms.date} at {coms.time})</p>
                                                        </div>
                                                        <p style={{ fontSize: '12pt'}}>{coms.content}</p>
                                                        {
                                                            coms.imageID !== 'none' &&
                                                            <img src={generatePic(coms.imageID)} alt="image" id={style.imgInCom}/>
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
                            {
                                showComments && file && (
                                    <img src={URL.createObjectURL(file[0])} alt='thumbnail' id={style.smallThumbnail}/>
                                )
                            } 
                            {
                                showComments && docxFiles && (
                                    <FaFolderOpen size={25} color='#099AED' title='file'/>
                                )
                            }

                            <textarea onChange={(e) => setcommentContent(e.target.value)} placeholder='Insert comment...'></textarea>
                            
                            <div className='d-flex flex-column'>
                                <MdOutlineAttachment size={20} cursor={'pointer'} onClick={() => inputFilesRefComment.current.click()}/>
                                <FaRegImages size={18} cursor={'pointer'} onClick={() => inputImageFileRefComment.current.click()}/>
                            </div>

                            <input 
                                type='file'
                                accept='image/*'
                                style={{ display:'none'}}
                                ref={inputImageFileRefComment}
                                onChange={handleGetImage}
                            />

                            <input 
                                type='file'
                                accept=".doc, .docx, .pdf, .txt, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                ref={inputFilesRefComment}
                                style={{ display:'none'}}
                                onChange={handleGetFiles}    
                            />
                            <button size={29} id={style.sendBtnComs} onClick={submitReply}>Reply</button>
                        </div>
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
                showPostModal && (
                    <div className={style.postModalBackgroundDIV}>
                        <div className={style.postModalContainer}>
                            <div className={style.headerPostModal}>
                                <div className='d-flex gap-2 align-items-center'>
                                    <img src={imageUserPost(userAccount.acctID)} alt='profile picture' id={style.imgDp}/>
                                    <p id={style.nameInPostModal}>{generateFullname()}</p>
                                </div>
                                <BiExit size={20} title='closed' cursor={'pointer'} onClick={closePostModal}/>
                            </div>
                            <div className={style.bodyPostModal}>
                            {
                                file && 
                                <div className={style.fileListPost}>
                                    {
                                        file.map((data, index) => (
                                        <div className={style.imageDivPreview} key={index}>
                                            <IoCloseCircle id={style.deleteImagePreview} size={25} onClick={() => deleteImageInPostModal(index)}/>
                                            <img src={URL.createObjectURL(data)}></img>
                                        </div>
                                        ))
                                    }
                                </div>
                            }

                            {
                                docxFiles && 
                                <div className={style.fileListPost}>
                                    {
                                        docxFiles.map((data, index) => (
                                        <div className={style.fileDivPreview} key={index}>
                                            <IoCloseCircle id={style.deleteImagePreview} size={25} onClick={() => deleteFilesInPostModal(index)}/>
                                            <IoDocumentText size={25} color='white'/>
                                            <p>{data.name}</p>
                                        </div>
                                        ))
                                    }
                                </div>
                            }
                                
                                <textarea placeholder='Share your thoughts here...' onChange={(e) => setPostContent(e.target.value)}></textarea>
                                <div className='d-flex w-100 mt-2 mb-5 gap-2'>
                                    <div id={style.addImageUploadLayout} onClick={handleUploadImageClick}>
                                        <input 
                                            type="file"
                                            ref={inputImageFileRef}
                                            accept='image/*'
                                            onChange={handleGetImage}
                                            style={{ display:'none'}}
                                            multiple
                                        />
                                        <FaRegImages color='#099AED' size={23} />
                                        <h2>Add Image</h2>
                                    </div>
                                    <div id={style.addImageUploadLayout} onClick={handleUploadFilesClick}>
                                        <input 
                                            type="file"
                                            ref={inputFilesRef}
                                            accept=".doc, .docx, .pdf, .txt, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                            onChange={handleGetFiles}
                                            style={{ display:'none'}}
                                            multiple
                                        />
                                        <MdOutlineAttachment color='#099AED' size={23} />
                                        <h2>Add File</h2>
                                    </div>
                                </div>
                                
                                <button className={style.btnPostModal} onClick={handlePost}>Upload</button>
                            </div>
                        </div>
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
                        <iframe src={viewFileName} width="100%" height="100%" ></iframe>
                    </div>
                )
        }

        {
                showViewImage && viewFileName && (
                    <div className={style.prevFileCon}>
                        <IoCloseCircle size={30} color='#BB2525' cursor={'pointer'} onClick={() => setshowViewImage(false)}/>
                        <img src={viewFileName} width="100%" height="80%" alt='picture'/>
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
                                    <button className={choose === 'files' ? style.btnNavActive : style.btnNav} onClick={() => setChoose('files')}>Files</button>
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
                                <div className='d-flex align-items-center gap-2'>
                                    <img src={imageUserPost(userAccount.acctID)} alt="profile" id={style.imgDp}/>
                                    <div className={style.postBotton} onClick={() => setshowPostModal(true)}>Share your thoughts here...</div>
                                    <FaRegImages size={20} onClick={() => setshowPostModal(true)}/>
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
                                                    deleteShow(post.acctID) && <AiOutlineDelete id={style.deleteBtn} title='delete' onClick={() => handleDeletePost(post.postID, post.imageID, post.fileID)}/>
                                                }
                                        </div>
                                        <div className={style.body}>
                                            <p>{post.postContent}</p>
                                            <div className={style.imgListInPost}>
                                                {
                                                    post.imageID !== 'none' && (
                                                        getImageUrlsByImageID(post.imageID) &&
                                                        getImageUrlsByImageID(post.imageID).map((data, index) => (
                                                            <div className={style.imgContainer} onClick={() => handleViewImage(data)}>
                                                                <img key={index} src={data} alt="photo" id={style.imgSend}/>
                                                            </div>
                                                        ))
                                                    )
                                                }
                                            </div>
                                            
                                            {
                                                post.fileID !== 'none'  && (
                                                    getFilesUrlsByFileID(post.fileID) &&
                                                    getFilesUrlsByFileID(post.fileID).map((data, index) => (
                                                        <div id={style.filePdf}>
                                                            <SiFiles size={30} color='#F45050'/>
                                                            <p>{shortenFileName(data.name)}</p>
                                                            {
                                                                checkIfPDFfile(data.data) && <div id={style.viewFile} onClick={() =>handleViewFile(data.data)}>View</div>
                                                            }
                                                            
                                                            <FiDownload size={20} cursor={'pointer'} color='#3E3F40' onClick={() =>handleDownload(data.data)}/>
                                                        </div>
                                                    ))
                                                )
                                            }

                                            {
                                                post.quizID !== 'none'  && (
                                                        <div id={style.quizBox}>
                                                            <div className='d-flex gap-2'>
                                                                <GiNotebook size={20} color='#186F65'/>
                                                                <p>{quiz?.filter((q) => q.quizID === post.quizID).map((q)=> q.quizTitle)}</p>
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
                                                            onClick={() => clickReact(post.postID, 'heart')}
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
                                                        onClick={() => clickReact(post.postID, 'like')}
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
                                                onClick={() =>handleShowComments(post.postID)}
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
            { choose === 'files' && <FilesClass classCode={classCode}/> }
            { choose === 'leaderboard' && <LeaderBoard/> }
            { choose === 'quizSetup' && <ClassQuizSetup subjectName={subjectName} navigateClass={navigateClass} postType={postType} classCode={classCode}/> }
            { choose === 'assignment' && <ClassAssignment postType={postType} quizObj={quizObj} handlePostAssignment={handlePostAssignment}/> }
            { choose === 'members' && <ClassMembers memberID={memberID} currentClassCode={currentClassCode}/>}

        </div>
    </div>
  )             
}

export default ClassHome