import React, { useEffect, useState } from 'react'
import style from './ClassPage.module.css'
import logo from '../assets/logo.png'
import sample from '../assets/sample.jpg'
import whiteLogo from '../assets/logo-white.png'
import { useClassStore } from '../stores/useClassStore'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { VscTriangleUp, VscTriangleDown } from "react-icons/vsc"
import { useNavigateStore } from '../stores/useNavigateStore'
import { useMemberStore } from '../stores/useMemberStore'
import axios from 'axios'
import ClassHome from './ClassHome'
import excel from '../assets/excel.png'
import { BiExit } from "react-icons/bi";
import { Howl, Howler } from "howler";
import notifSound from '../assets/sound/notif.mp3';
import erroSound from '../assets/sound/error.mp3';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useImageStore } from '../stores/useImageStore'
import * as XLSX from 'xlsx'
import { ProgressBar } from  'react-loader-spinner';


const ClassPage = () => {

const { addClass, getClass, classes, hideClass } = useClassStore()
const { uploadImage, getImages } = useImageStore()
const { getMembers } = useMemberStore()
const [isClassListShow, setisClassListShow] = useState(true)
const [isModalShow, setisModalShow] = useState(false)
const [showExcellInputCard, selectExcellInputCard] = useState(false)
const [textButton, settextButton] = useState('Create Class')
const [className, setclassName] = useState()
const [classCode, setclassCode] = useState()
const [acctID, setacctID] = useState()
const [classDesc, setclassDesc] = useState()
const [showCreateClass, setshowCreateClass] = useState(false)
const [classesObj, setclassesObj] = useState([])
const [currentImageClass, setcurrentImageClass] = useState('')

const [dropHideList, setdropHideList] = useState(false)
const { updateRouteChoose } = useNavigateStore()
const { addMembers } = useMemberStore()
const [showPreview, setshowPreview] = useState('classPage')
const [currentSubjectName, setcurrentSubjectName] = useState()
const [currentClassCode, setcurrentClassCode] = useState()
const [currentclassID, setcurrentclassID] =useState()
const [currentMemberID, setcurrentMemberID] = useState()
const [uniqueId, setuniqueId] = useState('')
const [selectedImage, setselectedImage] = useState()
const [typeError, setTypeError] = useState(null)
const [excelData, setExcelData] = useState(null)
const [excelFile, setExcelFile] = useState(null)

const [allClasses, setallClasses] = useState(JSON.parse(localStorage.getItem('class')))
const [allMembers, setmembersList] = useState(JSON.parse(localStorage.getItem('members')))
const [userAccount, setuserAccount] = useState(JSON.parse(localStorage.getItem('user')))
const [userClasses, setuserClasses] = useState(null)


const notif = new Howl({ src: [notifSound]})
const errSound = new Howl({ src: [erroSound]})

useEffect(() => {
    getClass()
    getMembers()

    getCurrentClass()

    if(classesObj < 0) {
        isClassListShow(false)
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

const getCurrentClass = () => {
    getClass()
    getMembers()
    getImages()

    setshowPreview('loading')
    
    setTimeout(() => {
        setshowPreview('classPage')
        const classes = JSON.parse(localStorage.getItem('class'))
        const members = JSON.parse(localStorage.getItem('members'))
        const images = JSON.parse(localStorage.getItem('images'))

        if (classes && members) {
            const filter = members.filter((member) => member.acctID === userAccount.acctID)

            let classesList = []

            for (let i = 0; i < filter.length; i++) {
                const result = classes.filter((cls) => cls.membersID === filter[i].membersID)
                classesList.push(result[0])
            }
            setuserClasses(classesList)
        }
    }, 5000);
    
  }

const handleHideClass = (classCode, membersID, state) => {
    let updated = userClasses.filter((cls) => cls.classCode === classCode)
    let restData = userClasses.filter((cls) => cls.classCode !== classCode)
    updated[0].hidden = state
    restData.push(updated)
    setuserClasses(restData)
    hideClass(classCode, state)
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

const handleSubmit = (e) => { 
    e.preventDefault()
    const { uniqueID, file } = selectedImage
    let imageID = 'none'
    let membersID = generateUniqueId()
    
    if (uniqueID) {
        imageID = uniqueID
        membersID = uniqueID
    }

    const acctID = userAccount.acctID
    const firstName = userAccount.firstname
    const midleName = userAccount.middlename
    const lastName = userAccount.lastname
    const memberType = 'admin'

    addClass(className, classDesc, classCode, imageID, membersID)
    addMembers(membersID, acctID, firstName, midleName, lastName, memberType)

    if (selectedImage) {
        const imageFile = {
            file,
            imageID: uniqueID,
        }
        uploadImage(imageFile)
    }

    const message = 'Class created succefully.'
    notify(message, 'success')

    setisModalShow(false)
    setshowCreateClass(false)
    setisClassListShow(true)
    setselectedImage(null)

    getCurrentClass()
}

const handleOpenClass = (subjectName, classCode, membersID, imageID, classID, classDesc) => {
    setcurrentMemberID(membersID)
    setcurrentClassCode(classCode)
    setcurrentSubjectName(subjectName)
    setclassDesc(classDesc)
    setshowPreview('classHome')
    setcurrentclassID(classID)
    const image = generatePic(imageID)
    setcurrentImageClass(image)
}

const backToHomePage = (choose) => {
    setshowPreview(choose)
}

const generatePic = (id) => {
    if (id === 'none') {
        return logo
    }else {
        const allimages = JSON.parse(localStorage.getItem('images'))
        const filter = allimages.filter((images) => images.imageID === id).map((img) => img.data)
        const url = 'http://localhost:5000/'
        return url+filter[0]
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

const generateClassPicUpload = () => {

    console.log(selectedImage)
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
            setTypeError(null);
            let reader = new FileReader();
            reader.readAsArrayBuffer(selectedFile);
            reader.onload=(e) => {
                setExcelFile(e.target.result);
            }
        }

        else{
            setTypeError('Please select only excel file types');
            setExcelFile(null);
        }
    }
        else{
            console.log('Please select your file');
        }
}

const handleFileSubmit = (e) => {
    e.preventDefault();
    let idList = []
    if (excelFile!==null) {
        const workbook = XLSX.read(excelFile, {type: 'buffer'});
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        setExcelData(data.slice(0,10));
    }

    if (excelData) {
        const { className, classDesc, classCode } = excelData[0]
        console.log('result:', className, classDesc, classCode)
        const imageID = 'none'

        if (className && classDesc && classCode) {
            let done = 0
            let fail = 0
            let exist = 0
            let success = false

            for (let i = 0; i < excelData.length; i++) {
                const { className, classDesc, classCode} = excelData[i]
                if (className && classDesc && classCode) {
                    const isExist = allClasses.filter((cls) => cls.classCode === classCode)

                    if (isExist.length > 0) {
                        exist = exist + 1
                        fail = fail + 1
                        continue
                    }else {
                        const generatedID = generateUniqueId()
                        idList.push(generatedID)
                        const membersID = generatedID

                        addClass(className, classDesc, classCode, imageID, membersID)
                        done = done + 1
                        success = true
                    }
                    
                }else {
                    fail = fail + 1
                    continue
                }
            }

            console.log(done)
            console.log(fail)

            if (success) {
                const acctID = userAccount.acctID
                const firstName = userAccount.firstname
                const midleName = userAccount.middlename
                const lastName = userAccount.lastname
                const memberType = 'admin'
                console.log('idList:',idList)
                for (let i = 0; i < idList.length; i++) {
                    const membersID = idList[i]
                    addMembers(membersID, acctID, firstName, midleName, lastName, memberType)
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
                const message = `${done} Class imported succefully.`
                notify(message, 'success')
            }

            
            
            exist = 0
            done = 0
            fail = 0
        }else {
            const message = 'Invalid format.'
            notify(message, 'err')
        }
    }

}



  return (
    <>
        {
            showPreview === 'classHome' && (
                <ClassHome 
                   currentSubjectName={currentSubjectName}
                   currentClassCode={currentClassCode}
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
                                <form action="" onSubmit={handleSubmit}>
                                    <div className={style.modalContent}>

                                        <div className={style.horizontalDiv}>
                                            <div className={style.leftCon}>
                                                <h1>Create you Class</h1>
                                                <p>Teachers have ownership of the class, while students actively engage as members. Within each class, you have the ability to generate quizzes, document student feedback, and share announcements.</p>
                                                <label>Class Name:</label>
                                                <input type="text" onChange={(e) => setclassName(e.target.value)} required/>
                                                <label>Class code:</label>
                                                <input type="text" onChange={(e) => setclassCode(e.target.value)} required/>
                                            </div>
                                            <div className={style.rightCon}>
                                                <img src={generateClassPicUpload()} alt="profile" id={style.classProfile}/>
                                                <input type="file" id={style.uploadPic}a ccept="image/*" onChange={handleFile}/>
                                            </div>
                                        </div>
                                        
                                        <label>Description(optional):</label>
                                        <textarea id={style.desInput} type="text" onChange={(e) => setclassDesc(e.target.value)}></textarea>
                                        <div className={style.horMenu}>
                                            <button id={style.btnCancel} onClick={CreateClass}>Cancel</button>
                                            <button type='submit'>Next</button>
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
                                                <button onClick={handleFileSubmit} style={{ backgroundColor: '#099AED'}}>Upload</button>
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
                                                    userClasses? (
                                                        userClasses.filter((cls) => cls.hidden === 'false').map((cls, index) => (   
                                                            <div className={style.classCard} key={index}>
                                                                <AiFillEyeInvisible size={20} className={style.btnVisible} title='Hide class' onClick={() => handleHideClass(cls.classCode, cls.membersID, 'true')}/>
                                                                <div className={style.mainPoint} onClick={() => handleOpenClass(cls.className, cls.classCode, cls.membersID, cls.imageID, cls.classID, cls.classDesc)}>
                                                                    <img src={generatePic(cls.imageID)} alt='class photo' id={style.imageContainer}/>
                                                                    <h1>{cls.className}</h1>
                                                                    <p>{cls.classDesc}</p>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                        
                                                            <div className={style.reminder}>
                                                                <h2>ADD YOUR CLASS.</h2>
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
                                                            userClasses? (
                                                                userClasses.filter((cls) => cls.hidden === 'true').map((cls, index) => (
                                                                    <div className={style.classCard} key={index}>
                                                                        <AiFillEye size={20} className={style.btnVisible} title='Unhide class' onClick={() => handleHideClass(cls.classCode, cls.membersID, 'false')}/>
                                                                        <img src={generatePic(cls.imageID)} alt='class photo' id={style.imageContainer}/>
                                                                        <h1>{cls.className}</h1>
                                                                        <p>{cls.classDesc}</p>
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <div className={style.reminder}>
                                                                    <h2>ADD YOUR CLASS.</h2>
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