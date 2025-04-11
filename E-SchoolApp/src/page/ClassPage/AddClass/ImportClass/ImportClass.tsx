import React, { useContext, useEffect, useRef, useState } from 'react'
import style from './ImportClass.module.css'
import { IoCloseSharp } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { fileTypeChecker } from '../../../../utils/fileUtils';
import { read, utils } from 'xlsx';
import { NotificationContext } from '../../../../context/NotificationContext';
import { shortenSentence } from '../../../../utils/textUtils';
import { addClass, ClassInfo, getAllClasses } from '../../../../services/classServices';
import { UserDetailContext } from '../../../../context/UserDetailContext';
import { Class } from '../../../../types/interfaces';


interface ImportClassProps {
  setIsShowImportClass: (value: boolean) => void;
}

interface ExcelData {
    className?: string;
    classCode?: string;
    [key: string]: any;
}

const ImportClass: React.FC<ImportClassProps> = ({ setIsShowImportClass }) => {

  const inputFileRef = useRef<any>(null)   
  const [excel, setExcel] = useState<File | null>(null)
  const [excelPreview, setExcelPreview] = useState<ExcelData[] | null>(null)
  const [classesList, setClassesList] = useState<Class[]>([])


  const notifContext = useContext(NotificationContext)
  const accountContext = useContext(UserDetailContext)

  if (!notifContext || !accountContext) {
    return null
  }

  const { notify } = notifContext
  const { userDetails } = accountContext

  const acctID = userDetails?.acctID

  if (!acctID) {
    return null
  }
 
  useEffect(() => {
    
    const fetchData = async () => {

        const response = await getAllClasses()

        if (response) {
            setClassesList(response)
        }
    }

    fetchData()

  },[])

  const handleCheckClass = (data: string) => {

    if (!data) return false

    if (classesList.some((cls) => cls.classCode.trim().toUpperCase() === data.trim().toUpperCase())) {
        return true
    }
  }

  const handleFileUpload = (e: any) => {

    const file = e.target.files[0]

    if (fileTypeChecker(file, 'excel')) {
        setExcel(file)
    }else {
        const data = {
            message: 'Invalid file type.',
            status: false
        }
        notify(data)
    }

  }

  const handleRenderExcel = async () => {

    if (!excel) {
        const data = {
            message: 'No file selected.',
            status: false
        }
        notify(data)
        return
    }

    const ab = await excel.arrayBuffer();
    const wb = read(ab)
    const ws = wb.Sheets[wb.SheetNames[0]] // get the first worksheet
    const result = utils.sheet_to_json(ws) // generate objects

    let finalData: ExcelData[] = [];

    (result as ExcelData[]).forEach(data => {
        if (data?.className && data?.classCode) {
        
            if (handleCheckClass(data.classCode)) {
                const updated = {...data, status: 'duplicate'};
                finalData.push(updated);
            } else {
                const updated = {...data, status: 'success'};
                finalData.push(updated);
            }

        } else {
            const updated = {...data, status: 'failed'};
            finalData.push(updated);
        }
    });

    setExcelPreview(finalData)

  }

  const handleSubmit = async () => {

    try {
        
        let finalData: ExcelData = []

        if (!excelPreview) {
            const data = {
                message: 'No Data.',
                status: false
            }
            notify(data)
            return 
        }

        //Insert null to all blank
        if (excelPreview) {
            const cleanDate = excelPreview.map(data => ({
                ...data,
                classDesc: data.classDesc || null,
                acctID: userDetails?.acctID
            }))
            finalData = cleanDate
        }

        const sendQuery = async (data: ClassInfo) => {
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

            interface ItemType { 
                status: string; 
                className: string; 
                classCode: string; 
                classDesc: string | null; 
            }

            let successImport = 0

            finalData.forEach(async (items: ItemType) => {

                if (items.status === 'success') {

                    const datas = {
                        className: items?.className,
                        classCode: items?.classCode,
                        classDesc: items?.classDesc,
                        acctID,
                    }
                    
                    if(await sendQuery(datas)) {
                        successImport++
                    }
                    
                }

            })

            setIsShowImportClass(false)
            handleReset()

            if (successImport > 0) {

                const data = {
                    message: 'Successfully imported classes.',
                    status: true
                }

                notify(data)
            }else {
                const data = {
                    message: 'Failed to imported classes.',
                    status: false
                }

                notify(data)
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
                                        <p>{shortenSentence(data?.className ?? '', 10)}</p>
                                    </div>
                                    <div className='col d-flex flex-column'>
                                        <label>Class Code</label>
                                        <p>{shortenSentence(data?.classCode ?? '', 10)}</p>
                                    </div>
                                    <div className='col d-flex flex-column'>
                                        <label>Status</label>
                                        <p className={
                                            (data?.status === 'duplicate' || data?.status === 'failed') ? 'text-danger' :
                                            data?.status === 'success' ? 'text-success' : undefined
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
