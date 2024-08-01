import React, { useEffect, useRef, useState } from 'react'
import style from './ClassPage.module.css'
import logo from '../assets/logo.png'
import sample from '../assets/sample.jpg'
import whiteLogo from '../assets/logo-white.png'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { VscTriangleUp, VscTriangleDown } from "react-icons/vsc"
import axios from 'axios'
import ClassHome from './ClassHome'
import excel from '../assets/excel.png'
import { BiExit } from "react-icons/bi";
import { Howl } from "howler";
import notifSound from '../assets/sound/notif.mp3';
import erroSound from '../assets/sound/error.mp3';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as XLSX from 'xlsx'
import { ProgressBar } from  'react-loader-spinner';
import io from 'socket.io-client'
const socket = io.connect('http://localhost:5001')


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

const [userAccount, setuserAccount] = useState(JSON.parse(localStorage.getItem('user')))

const [classesList, setClassesList] = useState([])

const notif = new Howl({ src: [notifSound]})
const errSound = new Howl({ src: [erroSound]})

useEffect(() => {

    const acctID = userAccount.acctID

    //Socket for account Online
    socket.emit('addOnlineList', acctID)

    axios.get('http://localhost:5001/classes/getClassesByAccount/' + acctID)
    .then((res) => {
        setshowPreview('classPage')
        const result = res.data
        console.log("result:", result)

        if (result) {

            let classCodeList = [acctID]

            classCodeList = result.map((data) => data.classCode)

            for (let i = 0; i < classCodeList.length; i++) {
                //Join room as acctID will becomes roomID for notifications
                socket.emit('joinRoom', classCodeList[i])
            }
            
        }

        const newValue = result.reduce((cls, current) => {

            if (!cls.some(item => item.id === current.id)) {
                cls.push(current);
            }

            console.log(cls)
            return cls;
        }, [])
        
        setClassesList(newValue)
    })
    .catch((err) => console.error(err))

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

const handleHideClass = (id) => {
    
    setClassesList((prevClassList) => {
       return prevClassList.map((classes) => {
            if (classes.id === id) {
                return {...classes, hidden: 'true'}
            }
            return classes
       })
    })

    axios.put('http://localhost:5001/classes/hideClass/' + id)
    .then((res) => res.data)
    .then((data) => console.log(data.message))
    .catch((err) => console.error(err))
}

const handleUnHideClass = (id) => {

    setClassesList((prevClassList) => {
       return prevClassList.map((classes) => {
            if (classes.id === id) {
                return {...classes, hidden: 'false'}
            }
            return classes
       })
    })

    axios.put('http://localhost:5001/classes/unhideClass/' + id)
    .then((res) => res.data)
    .then((data) => console.log(data.message))
    .catch((err) => console.error(err))
}

const dropDownHiddenClass = () => {
    setdropHideList(!dropHideList)
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
    formData.append('acctID', userAccount.acctID)
    formData.append('firstname', userAccount.firstname)
    formData.append('middlename', userAccount.middlename)
    formData.append('lastname', userAccount.lastname)
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

const handleOpenClass = (className, classCode, membersID, imageID, id, classDesc) => {
    setcurrentMemberID(membersID)
    setcurrentClassCode(classCode)
    setcurrentClassName(className)
    setclassDesc(classDesc)
    setshowPreview('classHome')
    setcurrentclassID(id)
    const image = generatePic(imageID)
    setcurrentImageClass(image)
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
                        formData.append('acctID', userAccount.acctID)
                        formData.append('firstname', userAccount.firstname)
                        formData.append('middlename', userAccount.middlename)
                        formData.append('lastname', userAccount.lastname)
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
                    <ToastContainer/>
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
                            <div className={style.content}>
                                <h1 id={style.mainTitle}>Join or Create a Class</h1>
                                <div className={style.horizontal}>
                                    <div className={style.card}>
                                        <img src={logo} width={144} alt="logo" />
                                        <h2>Create Class</h2>
                                        <button onClick={CreateClass}>Create</button>
                                    </div>
                                    {
                                        !showExcellInputCard ? (
                                            <div className={style.card}>
                                                <img src={excel} width={200} alt="logo" />
                                                <h2>Import Excel</h2>
                                                <button onClick={() => selectExcellInputCard(true)}>Import</button>
                                            </div>
                                        ) : (
                                            <div className={style.card} style={{ backgroundColor: '#D0E7D2'}}>
                                                <BiExit size={20} id={style.iconExit} onClick={() => selectExcellInputCard(false)}/>
                                                <input type="file" id={style.importExcelFile} accept='.xlsx' onChange={handleFileImport}/>
                                                <button onClick={handleExcelFileSubmit} style={{ backgroundColor: '#099AED'}}>Upload</button>
                                            </div>
                                        )
                                    }
                                    
                                    <div className={style.card}>
                                        <img src={whiteLogo} width={144} alt="Whitelogo" />
                                        <h2 id={style.joinText}>Join in Class with ClassCode</h2>
                                        <input type="text" />
                                        <button>Create</button>
                                    </div>
                                    
                                </div>
                            </div>
                        )
                    }
                    

                    <div className={style.header}>
                        <h1>Class</h1>
                        
                        {
                            userAccount &&
                            userAccount.acctype === 'faculty' && (
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
                                                        classesList.filter((data) => data.hidden === 'false' || data.hidden === false).map((data, index) => (   
                                                            <div className={style.classCard} key={index}>
                                                                <AiFillEyeInvisible size={20} className={style.btnVisible} title='Hide class' onClick={() => handleHideClass(data.id)}/>
                                                                <div className={style.mainPoint} onClick={() => handleOpenClass(data.className, data.classCode, data.membersID, data.imageID, data.id, data.classDesc)}>
                                                                    {
                                                                        data.name !== 'default' ? (
                                                                            <img src={generatePic(data.data)} alt='class photo' id={style.imageContainer}/>
                                                                        ):(
                                                                           <div id={style.defaultClassPic}>{data.className.substring(0, 1).toUpperCase()}</div> 
                                                                        )
                                                                    }
                                                                    <h1>{data.className}</h1>
                                                                    <p>{data.classDesc}</p>
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
                                                    <VscTriangleUp size={15} title='Show hidden class' cursor={'pointer'} onClick={dropDownHiddenClass}/>
                                    
                                                ) : (
                                                    <VscTriangleDown size={15} title='Show hidden class' cursor={'pointer'} onClick={dropDownHiddenClass}/>
                                    
                                                )
                                            }
                                            </h2>
                                            {
                                                dropHideList && (
                                                    <div className={style.horizontalList}>
                                                        {
                                                            classesList.length > 0 ? (
                                                                console.log(classesList),
                                                                classesList.filter((data) => data.hidden === 'true' || data.hidden === true).map((data, index) => (
                                                                    <div className={style.classCard} key={index}>
                                                                        <AiFillEye size={20} className={style.btnVisible} title='Unhide class' onClick={() => handleUnHideClass(data.id)}/>
                                                                        {
                                                                            data.name !== 'default' ? (
                                                                                <img src={generatePic(data.data)} alt='class photo' id={style.imageContainer}/>
                                                                            ):(
                                                                                <div id={style.defaultClassPic}>{data.className.substring(0, 1).toUpperCase()}</div> 
                                                                            )
                                                                        }
                                                                        <h1>{data.className}</h1>
                                                                        <p>{data.classDesc}</p>
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