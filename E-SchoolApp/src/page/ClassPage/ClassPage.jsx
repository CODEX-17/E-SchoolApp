import React, { useContext, useEffect, useRef, useState } from 'react'
import style from './ClassPage.module.css'
import { AiFillEyeInvisible } from "react-icons/ai"
import { VscTriangleUp, VscTriangleDown } from "react-icons/vsc"
import axios from 'axios'
import ClassHome from '../ClassHome'
import 'react-toastify/dist/ReactToastify.css';
import * as XLSX from 'xlsx'
import { ProgressBar } from  'react-loader-spinner';
import io from 'socket.io-client'
const socket = io.connect('http://localhost:5001')
import { NotificationContext } from '../../context/NotificationContext'
import { UserDetailContext } from '../../context/UserDetailContext'
import { getClassesByAccount, updateClassVisibility } from '../../services/classServices'
import ImageRender from '../../components/ImageRender/ImageRender'
import AddClass from './AddClass/AddClass'
import { ClassContext } from '../../context/ClassContext'


const ClassPage = () => {

const [isClassListShow, setisClassListShow] = useState(true)
const [isModalShow, setisModalShow] = useState(false)
const [showExcellInputCard, selectExcellInputCard] = useState(false)
const [textButton, settextButton] = useState('Create Class')
const [className, setclassName] = useState()
const [classCode, setclassCode] = useState(null)
const [classDesc, setclassDesc] = useState('none')
const [showCreateClass, setshowCreateClass] = useState(false)
const [classesObj, setclassesObj] = useState([])
const [currentImageClass, setcurrentImageClass] = useState('')
const [errorMessage, setErrorMessage] = useState(false)

const [dropHideList, setdropHideList] = useState(false)
const [showPreview, setshowPreview] = useState('loading')
const [currentClassName, setcurrentClassName] = useState()
const [currentClassCode, setcurrentClassCode] = useState()
const [currentclassID, setcurrentclassID] =useState()
const [currentMemberID, setcurrentMemberID] = useState()
const [selectedImage, setselectedImage] = useState(null)
const [excelFile, setExcelFile] = useState(null)
const [update, setupdate] = useState(false)
const inputRef = useRef(null)

const { userDetails } = useContext(UserDetailContext)
const [classesList, setClassesList] = useState([])

const { notify } = useContext(NotificationContext)
const { setCurrentClass } = useContext(ClassContext)

useEffect(() => {

    const acctID = userDetails.acctID

    //Socket for account Online
    socket.emit('addOnlineList', acctID)

    try {
        
        const fetchData = async () => {

            const response = await getClassesByAccount(acctID)

            if (response) {
                setshowPreview('classPage')
                console.log(response)
                //Join room as acctID will becomes roomID for notifications
                response.forEach(classes => socket.emit('joinRoom', classes.classCode))

                setClassesList(response)
                
            }

        }

        fetchData()
        
    } catch (error) {
        console.log(error)
    }

},[])

const duplicateClassCodeCheck = (classCode) => {
    const classCodeList = classesList.map((data) => data.classCode)

    for (let i = 0; i < classCodeList.length; i++) {
        if (classCode === classCodeList[i]) {
            return true
        }
    }
    
    return false
}

const handleInputClassCode = (e) => {
    e.preventDefault()
    const classCode = e.target.value
    
    if (duplicateClassCodeCheck(classCode)) {
        inputRef.current.style.outline = '1px solid red'
        inputRef.current.style.color = 'red'
        setclassCode(null)
        setErrorMessage(true)
    }else {
        inputRef.current.style.outline = 'none'
        inputRef.current.style.color = '#3E3F40'
        setErrorMessage(false)
        setclassCode(classCode)
    }
}


const handleClassVisibility = async (id, status) => {
    
    try {

        const response = await updateClassVisibility(id, status)

        if (response) {
            setClassesList((data) => {
                return data.map((classes) => {
                    if (classes.id === id) {
                        return {...classes, hidden: status}
                    }
                    return classes
                })
            })
        }
        
    } catch (error) {
        console.log(error)
    }

    
    
}

const handleCreateClass = () => {
    setisClassListShow(false)

    if (textButton === 'Create Class') {
        console.log(classesObj)
        settextButton('Back')
        setshowCreateClass(true)
    }else {
        settextButton('Create Class')
        setshowCreateClass(false)
        setisClassListShow(true)
    }
}

const CreateClass = () => {
    setisModalShow(!isModalShow)    
}



const backToHomePage = (choose) => {
    setshowPreview(choose)
}

const generatePic = (filename) => {

    if (filename) {
        return 'http://localhost:5001/' + filename
    }else {
        return '/banner.jpg'
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

const handleFile = (e) => {
    e.preventDefault()
    const file = e.target.files[0]

    if (file) {
        setselectedImage({
            file,
            uniqueID: generateUniqueId()
        })
        const message = 'Image uploaded.'
        notify(message, 'success')
    }else {
        const message = 'Image failed to upload.'
        notify(message, 'err')
    }
    
    
}

const handleDrop = (e) => {
    e.preventDefault()
    const value = e.dataTransfer.files[0]
    setselectedImage({
        file: value,
        uniqueID: generateUniqueId()
    })
 }

const preventDefault = (e) => {
    e.preventDefault()
}

const generateClassPicUpload = () => {
    if (selectedImage) {
        const { file } = selectedImage
        return URL.createObjectURL(file)
    }else {
        return sample
    }

}



  return (
    <>
        {
            showPreview === 'classHome' && (
                <ClassHome 
                   currentClassName={currentClassName}
                   classCodeCurrent={currentClassCode}
                   currentMemberID={currentMemberID}
                   backToHomePage={backToHomePage}
                   currentImageClass={currentImageClass}
                   classDesc={classDesc}
                   currentclassID={currentclassID}
                />
            )
        }

        {
            showPreview === 'loading' && (
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
                    <p>Getting the classes...</p>
                </div>
            )
        }

        {
            showPreview === 'classPage' && (
                <div className={style.container}>
                
                    <div className={style.header}>
                        <h1>Class</h1>
                        
                        {
                            userDetails &&
                            userDetails.acctype === 'faculty' && (
                                <button onClick={handleCreateClass}>{textButton}</button>
                            )   
                        }
                        
                    </div>

                    <div className={style.content}>
                        {
                            showCreateClass && (
                                <AddClass/>
                            )
                        }
                
                        {
                            isClassListShow && (
                                <div className={style.listContainer}>
                                    <div className={style.classVisible}>
                                        <h2 id={style.classListLabel}>Class List</h2>
                                        <div className={style.horizontalList}>
                                                {
                                                    classesList.length > 0 ? (
                                                        classesList
                                                        .filter((data) => !data.hidden)
                                                        .map((data, index) => (   
                                                            <div 
                                                                className={style.classCard} 
                                                                key={index}
                                                            >
                                                                <div style={{ width: '100%', height: '20%', }}>
                                                                    <AiFillEyeInvisible 
                                                                        size={20} 
                                                                        className={style.btnVisible} 
                                                                        title='Hide class' 
                                                                        onClick={() => handleClassVisibility(data.id, true)}
                                                                    />
                                                                </div>
                                                                <div 
                                                                    className='w-100 h-100 d-flex flex-column align-items-center justify-content-center'
                                                                    onClick={() => setCurrentClass(data)}
                                                                >
                                                                    <div id='roundedImage'  style={{ width: 50, height: 50, overflow: 'hidden',}}>
                                                                        <ImageRender image={data.fileID}/>
                                                                    </div>
                                                                    <div className='mt-2 text-center'>
                                                                        <h1>{data.className}</h1>
                                                                        <p>{data.classDesc}</p>
                                                                    </div>
                                                                </div>
                                                                
                                                            
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className={style.reminder}>
                                                            <h2>NO ADDED CLASSES.</h2>
                                                        </div>
                                                    )
                                                }
                                        </div>
                                    </div>

                                    <div className={style.classHidden}>
                                            <h2 id={style.classListLabel}>Hidden Class &nbsp;
                                                {
                                                    dropHideList ? (
                                                        <VscTriangleUp 
                                                            size={15} 
                                                            title='Show hidden class' 
                                                            cursor={'pointer'} 
                                                            onClick={() => setdropHideList(!dropHideList)}
                                                        />
                                                    ) : (
                                                        <VscTriangleDown 
                                                            size={15} 
                                                            title='Show hidden class' 
                                                            cursor={'pointer'} 
                                                            onClick={() => setdropHideList(!dropHideList)}
                                                        />
                                                    )
                                                }
                                            </h2>

                                            {
                                                dropHideList && (
                                                    <div className={style.horizontalList}>
                                                        {
                                                            classesList.length > 0 ? (
                                                                classesList
                                                                    .filter((data) => data.hidden)
                                                                    .map((data, index) => (   
                                                                        <div 
                                                                            className={style.classCard} 
                                                                            key={index}
                                                                        >
                                                                            <div style={{ width: '100%', height: '20%', }}>
                                                                                <AiFillEyeInvisible 
                                                                                    size={20} 
                                                                                    className={style.btnVisible} 
                                                                                    title='Hide class' 
                                                                                    onClick={() => handleClassVisibility(data.id, false)}
                                                                                />
                                                                            </div>
                                                                            <div 
                                                                                className='w-100 h-100 d-flex flex-column align-items-center justify-content-center'
                                                                                onClick={() => setCurrentClass(data)}
                                                                            >
                                                                                <div id='roundedImage'  style={{ width: 50, height: 50, overflow: 'hidden',}}>
                                                                                    <ImageRender image={data.fileID}/>
                                                                                </div>
                                                                                <div className='mt-2 text-center'>
                                                                                    <h1>{data.className}</h1>
                                                                                    <p>{data.classDesc}</p>
                                                                                </div>
                                                                            </div>
                                                                            
                                                                        
                                                                        </div>
                                                                    ))
                                                            ) : (
                                                                <div className={style.reminder}>
                                                                    <h2>NO HIDDEN CLASS.</h2>
                                                                </div>
                                                            )
                                                        
                                                        }
                                                    </div>
                                                )
                                            }
                                            
                                    </div>
                                    
                                </div>
                            )  
                        
                        }
                    </div>
                </div>
            )
        }

    </>
  )
}

export default ClassPage