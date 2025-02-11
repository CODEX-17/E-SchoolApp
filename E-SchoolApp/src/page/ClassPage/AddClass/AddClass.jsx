import React, { useContext, useState } from 'react'
import style from './AddClass.module.css'
import logo from '../../../../public/assets/logo.png'
import whiteLogo from '../../../../public/assets/logo-white.png'
import excel from '../../../../public/assets/excel.png'
import { NotificationContext } from '../../../context/NotificationContext'

const AddClass = () => {

  const [showExcellInputCard, setshowExcellInputCard] = useState(false)

  const { notify } = useContext(NotificationContext)
  
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

  const handleCreateClass = () => {

  }

  return (
    <div className={style.container}>
        <div className='d-flex flex-column text-center mb-4'>
            <h1>Join, Import or Create a Class</h1>
            <p>Collaborate, Learn, and Grow – Choose Your Path to the Classroom</p>
        </div>
        
        <div className={style.horizontal}>

            <div className={style.card}>
                <img src={logo} width={144} alt="logo" />
                <h2>Create Class</h2>
                <button onClick={handleCreateClass}>Create</button>
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
                <img src={whiteLogo} width={90} alt="Whitelogo" />
                <div className='d-flex flex-column mb-2'>
                    <label>Join in Class with ClassCode</label>
                    <input type="text" />
                </div>
                
                <button style={{ width: 180, }}>Join</button>
            </div>
            
        </div>
    </div>
  )
}

export default AddClass
