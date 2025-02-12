import React, { useContext, useEffect, useRef, useState } from 'react'
import style from './ImportClass.module.css'
import { IoCloseSharp } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { fileTypeChecker } from '../../../../utils/fileUtils';
import { read, utils } from 'xlsx';
import { NotificationContext } from '../../../../context/NotificationContext';
import { shortenSentence } from '../../../../utils/textUtils';
import { addClass, getAllClasses } from '../../../../services/classServices';
import { UserDetailContext } from '../../../../context/UserDetailContext';


const ImportClass = ({ setIsShowImportClass }) => {


  const inputFileRef = useRef(null)   
  const [excel, setExcel] = useState(null)
  const [excelPreview, setExcelPreview] = useState(null)
  const [classesList, setClassesList] = useState([])

  const { notify } = useContext(NotificationContext)
  const { userDetails } = useContext(UserDetailContext) 
 


  useEffect(() => {
    
    const fetchData = async () => {

        const response = await getAllClasses()

        if (response) {
            console.log('response', response)
            setClassesList(response)
        }
    }

    fetchData()

  },[])

  const handleCheckClass = (data) => {

    if (!data) return false

    if (classesList.some((cls) => cls.classCode.trim().toUpperCase() === data.trim().toUpperCase())) {
        return true
    }
  }

  const handleFileUpload = (e) => {

    const file = e.target.files[0]

    if (fileTypeChecker(file, 'excel')) {
        setExcel(file)
    }else {
        notify('Invalid file type.', false)
    }

  }

  const handleRenderExcel = async () => {

    const ab = await excel.arrayBuffer()
    const wb = read(ab)
    const ws = wb.Sheets[wb.SheetNames[0]] // get the first worksheet
    const result = utils.sheet_to_json(ws) // generate objects

    let finalData = []

    result.forEach(data => {
        if (data?.className && data?.classCode) {
        
            if (handleCheckClass(data.classCode)) {
                const updated = {...data, status: 'duplicate'}
                finalData.push(updated)
            }else {
                const updated = {...data, status: 'success'}
                finalData.push(updated)
            }

            
        }else {
            const updated = {...data, status: 'failed'}
            finalData.push(updated)
        }
    })

    setExcelPreview(finalData)

  }

  const handleSubmit = async () => {

    try {
        
        let finalData = []

        if (!excelPreview) return notify('No data.', false)

        //Insert null to all blank
        if (excelPreview) {
            const cleanDate = excelPreview.map(data => ({
                ...data,
                classDesc: data.classDesc || null,
                acctID: userDetails?.acctID
            }))
            finalData = cleanDate
        }

        const sendQuery = async (data) => {
            try {
                const response = await addClass(data)

                if (response) {
                    console.log(response.message)
                    return true
                }
            } catch (error) {
                console.log(error)
                throw false
            }
        }

        

        //Submit into database
        if (finalData) {

            let successImport = 0

            finalData.forEach(data => {

                if (data.status === 'success') {
                    const formData = new FormData()

                    formData.append('className', data?.className)
                    formData.append('classCode', data?.classCode)
                    formData.append('classDesc', data?.classDesc)
                    formData.append('acctID', data?.acctID)

                    if(sendQuery(formData)) {
                        successImport++
                    }
                    
                }

            })

            setIsShowImportClass(false)
            handleReset()

            if (successImport > 0) {
                notify('Successfully imported classes.', true)
            }else {
                notify('Failed to imported classes.', false)
            }
        }

        
    } catch (error) {
        console.log(error)
        notify('Error in submitting imports.', false)
    }

    

  }

  const handleReset = () => {
    setExcel(null)
    setExcelPreview(null)
  }


  return (
    <div className={style.container}>
      <div className={style.card}>
        <div className='w-100 d-flex justify-content-between mb-2'>
            <div className="d-flex flex-column">
                <h1>Import Your Class</h1>
                <p>Only Excel files are accepted for class imports.</p>
            </div>
           
            <IoCloseSharp 
                size={25} 
                title='close'
                cursor={'pointer'}
                onClick={() => setIsShowImportClass(false)}
            />
        </div>
        <div className='d-flex flex-column w-100 mt-4'>
            {
                !excel ? 
                    <div className={style.importBox} onClick={() => inputFileRef.current.click()}>
                        Import File Here.
                        <input 
                            type="file" 
                            accept=".xlsx, .xls"
                            ref={inputFileRef} 
                            onChange={handleFileUpload}
                            style={{ display: 'none' }}
                        />
                    </div>
                :
                    <div className={style.fileBox}>
                        {excel?.name}
                        <MdDeleteOutline 
                            size={20}
                            title='delete'
                            onClick={() => handleReset()}
                        />
                    </div>
            }
            
            
        </div>
        
        {
           ( excel && !excelPreview ) &&
            <div className='d-flex flex-column w-100 mt-4'>
                <button onClick={handleRenderExcel}>Preview Data</button>
            </div>
        }

        {
            excelPreview && 
            <div className={style.log}>
                <div className='bg-secondary text-white p-2 d-flex align-items-center w-100 justify-content-between'>
                    Data Preview
                    <div className='d-flex gap-2'>
                        <button 
                            style={{ 
                                width: 100, 
                                fontSize: '.7rem', 
                                height: 30, 
                            }}
                            onClick={handleSubmit}
                        >Submit</button>
                        <button 
                            style={{ 
                                width: 100, 
                                fontSize: '.7rem', 
                                height: 30, 
                                backgroundColor: '#B82132' 
                            }}
                            onClick={() => handleReset()}
                        >Cancel</button>
                    </div>
                </div>
                <div className={style.logList}>
                    {
                        excelPreview &&
                        excelPreview.map((data) => (
                            <div className={style.logCard}>
                                <div className='row w-100'>
                                    <div className='col d-flex flex-column'>
                                        <label>Class Name</label>
                                        <p>{shortenSentence(data?.className, 10)}</p>
                                    </div>
                                    <div className='col d-flex flex-column'>
                                        <label>Class Code</label>
                                        <p>{shortenSentence(data?.classCode, 10)}</p>
                                    </div>
                                    <div className='col d-flex flex-column'>
                                        <label>Status</label>
                                        <p className={
                                            (data?.status === 'duplicate' ||  data?.status === 'failed') && 'text-danger' ||
                                            data?.status === 'success' && 'text-success'
                                        }>{data?.status}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    
                </div>
            </div>
        }
        
      </div>
    </div>
  )
}

export default ImportClass
