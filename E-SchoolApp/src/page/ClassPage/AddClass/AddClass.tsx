import React, { useContext, useEffect, useState } from 'react'
import style from './AddClass.module.css'
import logo from '../../../../public/assets/logo.png'
import whiteLogo from '../../../../public/assets/logo-white.png'
import excel from '../../../../public/assets/excel.png'
import { NotificationContext } from '../../../context/NotificationContext'
import CreateClass from './CreateClass/CreateClass'
import ImportClass from './ImportClass/ImportClass'
import { getAllClasses, joinClassByClassCode } from '../../../services/classServices'
import { UserDetailContext } from '../../../context/UserDetailContext'
import { Class } from '../../../types/interfaces'


const AddClass = () => {

  const [isShowCreateClass, setIsShowCreateClass] = useState(false)
  const [isShowImportClass, setIsShowImportClass] = useState(false)
  const [classesList, setClassesList] = useState<Class[]>([])
  const [inputClassCode, setInputClassCode] = useState(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const notificationContext = useContext(NotificationContext)
  const accountContext = useContext(UserDetailContext)

  if (!notificationContext || !accountContext) {
    return null
  }

  const { notify } = notificationContext
  const { userDetails } = accountContext

  

   useEffect(() => {
      
      const fetchData = async () => {
  
          const response = await getAllClasses()
  
          if (response) {
              setClassesList(response)
          }
      }
  
      fetchData()
  
    },[])

    const handleReset = () => {
        setErrorMessage(null)
        setInputClassCode(null)
    }

    const handleCheckClassCode = (data: string) => {

        if (!data) return false

        if (classesList.some((cls) => cls.classCode.trim().toUpperCase() === data.trim().toUpperCase())) {
            return true
        }
    }

    const handleJoinClass = () => {

        if (inputClassCode) {
            
            if (!handleCheckClassCode(inputClassCode)) {

                setErrorMessage('Class Code not exist!')

                setTimeout(() => {
                    setErrorMessage(null)
                }, 3000)
                
            }else {
                
                const query = async () => {
                    try {

                        const data = {
                            classCode: inputClassCode,
                            acctID: userDetails?.acctID
                        }

                        const response = await joinClassByClassCode(data)

                        if (response) {

                            const data = {
                                message: response.message,
                                status: false
                            }

                            notify(data)
                            handleReset()
                        }

                    } catch (error) {
                        const data = {
                            message: error,
                            status: false
                        }
                        notify(data)
                        handleReset()
                    }
                }

                query()

            }

        }else {
            const data = {
                message: 'Please input Class Code!',
                status: false
            }
            notify(data)
        }
    }

  return (
    <div className={style.container}>

        {
            isShowCreateClass &&
            <div 
                className='position-absolute w-100 h-100' 
                style={{ zIndex: 5, height: '100%', }}
            >
                <CreateClass setIsShowCreateClass={setIsShowCreateClass}/>
            </div>
            
        }

        {
            isShowImportClass && 
            <div 
                className='position-absolute w-100 h-100' 
                style={{ zIndex: 5, height: '100%', }}
            >
                <ImportClass setIsShowImportClass={setIsShowImportClass}/>
            </div>
        }

        <div className='d-flex flex-column text-center mb-4'>
            <h1>Join, Import or Create a Class</h1>
            <p>Collaborate, Learn, and Grow – Choose Your Path to the Classroom</p>
        </div>
        
        <div className={style.horizontal}>

            <div className={style.card}>
                <img src={logo} width={144} alt="logo" />
                <h2>Create Class</h2>
                <button onClick={() =>setIsShowCreateClass(true)}>Create</button>
            </div>

            <div className={style.card}>
                <img src={excel} width={200} alt="logo" />
                <h2>Import Excel</h2>
                <button onClick={() => setIsShowImportClass(true)}>Import</button>
            </div>
                
            <div className={style.card}>
                <img src={whiteLogo} width={90} alt="Whitelogo" />
                <div className='d-flex flex-column mb-2'>
                    <label>Join in Class with ClassCode</label>
                    <input 
                        type="text" 
                        onChange={(e) => setInputClassCode(e.target.value)}
                    />
                    {errorMessage && <p className='text-danger' style={{ fontSize: '.8rem' }}>{errorMessage}</p>}
                </div>                
                <button 
                    style={{ width: 180, }}
                    value={inputClassCode}
                    onClick={handleJoinClass}
                >Join</button>
            </div>
            
        </div>
    </div>
  )
}

export default AddClass
