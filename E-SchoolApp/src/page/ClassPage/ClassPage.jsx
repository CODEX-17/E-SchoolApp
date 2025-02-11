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

const handleAddClass = (e) => { 
    e.preventDefault()

    const generatedID = generateUniqueId()
    let imageFile = null

    if (selectedImage) {
        imageFile = selectedImage.file
    }

    const formData = new FormData

    formData.append('className', className)
    formData.append('classDesc', classDesc)
    formData.append('classCode', classCode)
    formData.append('membersID', generatedID)
    formData.append('imageID', generatedID)
    formData.append('hidden', 'false')
    formData.append('acctID', userDetails.acctID)
    formData.append('firstname', userDetails.firstname)
    formData.append('middlename', userDetails.middlename)
    formData.append('lastname', userDetails.lastname)
    formData.append('memberType', 'admin')
    formData.append('image', imageFile)

    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`)
    }

    axios.post('http://localhost:5001/classes/addClass', formData, {
        headers: {
            'Content-Type':'multipart/form-data'
        }
    })
    .then((res) => res.data)
    .then((data) => {
        const message = data.message
        notify(message, 'success')
        setisModalShow(false)
        setshowCreateClass(false)
        setisClassListShow(true)
        setselectedImage(null)
        setupdate(!update)
    })
    .catch((err) => console.log(err))

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

const handleFileImport = (e) => {
    e.preventDefault()

    let fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','text/csv'];
    let selectedFile = e.target.files[0];
    
    if (selectedFile){
        if (selectedFile && fileTypes.includes(selectedFile.type)) {
            //setTypeError(null);
            let reader = new FileReader();
            reader.readAsArrayBuffer(selectedFile);
            reader.onload=(e) => {
                const data = e.target.result
                setExcelFile(data)
                console.log(data)
            }
        }

        else{
            //setTypeError('Please select only excel file types');
            setExcelFile(null);
        }
    }
        else{
            console.log('Please select your file');
        }
}

const handleExcelFileSubmit = (e) => {
    e.preventDefault()

    if (excelFile) {

        const workbook = XLSX.read(excelFile, {type: 'buffer'})
        const worksheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[worksheetName]
        const data = XLSX.utils.sheet_to_json(worksheet)

        if (data) {
            let done = 0
            let fail = 0
            let exist = 0
            let success = false

            for (let i = 0; i < data.length; i++) {

                const newClassName = data[i].className
                const newClassCode = data[i].classCode
                const newClassDesc = data[i].classDesc

                if (newClassName && newClassCode && newClassDesc) {

                   for (let x = 0; x < classesList.length; x++) {

                        const existingClassCode = classesList[x].classCode
                        
                        if (newClassCode === existingClassCode) {
                            exist = exist + 1
                            console.log(newClassCode + 'is exist')
                        }
                                          
                   }

                   if (exist === 0) {
                        const generatedID = generateUniqueId()

                        const formData = new FormData
                        formData.append('className', newClassName)
                        formData.append('classDesc', newClassCode)
                        formData.append('classCode', newClassCode)
                        formData.append('membersID', generatedID)
                        formData.append('imageID', 'default')
                        formData.append('hidden', 'false')
                        formData.append('acctID', userDetails.acctID)
                        formData.append('firstname', userDetails.firstname)
                        formData.append('middlename', userDetails.middlename)
                        formData.append('lastname', userDetails.lastname)
                        formData.append('memberType', 'admin')
                        formData.append('image', null)

                        axios.post('http://localhost:5001/classes/addClass', formData, {
                            headers: {
                                'Content-Type':'multipart/form-data'
                            }
                        })
                        .then((res) => res.data)
                        .then((data) => {
                            done = done + 1
                            success = true
                            const message = data.message
                            console.log(message)
                        })
                        .catch((err) => console.log(err))

                        done = done + 1
                        exist = 0
                   }else {
                        fail = fail + 1
                   }

                }else {
                    fail = fail + 1
                }
            }

            if (fail) {
                if (done) {
                    const message = `${done} Class imported succefully. ${fail} Failed to import`
                    notify(message, 'success')
                }else{
                    const message = `${fail} Failed to import`
                    notify(message, 'err')
                }
                
            }else {
                console.log('done',done)
                const message = `${done} Class imported succefully.`
                notify(message, 'success')
                setisClassListShow(true)
                setselectedImage(null)
                setupdate(!update)
            }

            exist = 0
            done = 0
            fail = 0
        }else {
            const message = 'Invalid format.'
            notify(message, 'err')
        }
    }else {
        const message = `no file uploaded`
        notify(message, 'err')
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
                    {
                        isModalShow && (
                            <div className={style.modalContainer}>
                                <form style={{ marginTop: '0px' }} action="" onSubmit={handleAddClass}>
                                    <div className={style.modalContent}>
                                        <div className={style.horizontalDiv}>
                                            <div className={style.leftCon}>
                                                <h1 id={style.createClassTitle}>Create you Class</h1>
                                                <p id={style.createDiscription}>Teachers have ownership of the class, while students actively engage as members. Within each class, you have the ability to generate quizzes, document student feedback, and share announcements.</p>
                                                <label id={style.labelDescription}>Class Name:</label>
                                                <input type="text" onChange={(e) => setclassName(e.target.value)} required/>
                                                <label id={style.labelDescription}>Class Code:</label>
                                                <input type="text" onChange={handleInputClassCode} required ref={inputRef}/>
                                                {errorMessage && <p id={style.errorMessage}>Class code is already use.</p> }
                                            </div>
                                            <div className={style.rightCon} 
                                                onDrop={handleDrop}
                                                onDragOver={preventDefault}
                                            > 
                                                {
                                                    selectedImage ? (
                                                        <img src={generateClassPicUpload()} alt="profile" id={style.classProfile}/>
                                                    ) : (
                                                        <div className={style.dragPhoto}>Drag image here.</div>
                                                    )
                                                    
                                                }
                                                
                                                <input type="file" id={style.uploadPic}a ccept="image/*" onChange={handleFile} style={{ display: 'none' }}/>
                                            </div>
                                        </div>
                                        <label id={style.labelDescription} style={{ marginTop: '20px' }}>Description ( optional ):</label>
                                        <textarea id={style.desInput} type="text" onChange={(e) => setclassDesc(e.target.value)}></textarea>
                                        <div className={style.horMenu}>
                                            <button id={style.btnCancel} onClick={CreateClass}>Cancel</button>
                                            <button type='submit' disabled={classCode ? false : true}>Next</button>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        )
                    }

                    {
                        showCreateClass && (
                           <AddClass/>
                        )
                    }
                    

                    <div className={style.header}>
                        <h1>Class</h1>
                        
                        {
                            userDetails &&
                            userDetails.acctype === 'faculty' && (
                                <button onClick={handleCreateClass}>{textButton}</button>
                            )   
                        }
                        
                    </div>

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
                                                                        <ImageRender image={data.imageID}/>
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
                                                                                    <ImageRender image={data.imageID}/>
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
            )
        }

    </>
  )
}

export default ClassPage