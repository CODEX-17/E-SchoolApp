import React, { useContext, useEffect, useRef, useState } from 'react'
import style from './CreateClass.module.css'
import { useForm } from "react-hook-form"; 
import ImageRender from '../../../../components/ImageRender/ImageRender';
import { IoCloseSharp } from "react-icons/io5";
import { fileTypeChecker } from '../../../../utils/fileUtils';
import { NotificationContext } from '../../../../context/NotificationContext';
import { UserDetailContext } from '../../../../context/UserDetailContext';
import { addClass, getAllClasses } from '../../../../services/classServices';


const CreateClass = ({ setIsShowCreateClass }) => {

  const [image, setImage] = useState(null)
  const [classesList, setClassesList] = useState(null)
  const inputFileRef = useRef(null)

  const { notify } = useContext(NotificationContext)
  const { userDetails } = useContext(UserDetailContext)

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await getAllClasses()

            if (response) {
                setClassesList(response)
            }

        } catch (error) {
            console.log(error)
            notify(error, false)
        }
    }

    fetchData()
  },[])

  const { 
    handleSubmit, 
    reset, 
    register, 
    formState: { errors } 
  } = useForm()

  const handleCheckClass = (data) => {
    if (classesList.some((cls) => cls.classCode == data)) {
        return 'Class code already exist.'
    }
  }

  const handleFile = (e) => {
    const file = e.target.files[0]
  
    if(fileTypeChecker(file, 'image')) {
        setImage(file)
    }else {
        notify('Invalid File type.', false)
    }

  }
  
  const handleCreateClass = async (data) => {

    try {
        const formData = new FormData

        formData.append('className', data?.className)
        formData.append('classDesc', data?.classDesc)
        formData.append('classCode', data?.classCode)
        formData.append('acctID', userDetails?.acctID)

        if (image) formData.append('file', image)

        const response = await addClass(formData)

        if (response) {
            notify(response.message, true)
            setIsShowCreateClass(false)
            reset()
        }

    } catch (error) {
        notify('Failed to add class.', false)
    }

  }   

  return (
    <div>
        <div className={style.container}>
            <form 
                id={style.form}
                onSubmit={handleSubmit(handleCreateClass)}
            >
                <div className={style.card}>

                    <div className='w-100 d-flex justify-content-between mb-2'>
                        <h1>Create Your Class</h1>
                        <IoCloseSharp 
                            size={25} 
                            title='close'
                            cursor={'pointer'}
                            onClick={() => setIsShowCreateClass(false)}
                        />
                    </div>

                    <div className='w-100 h-100 row mb-2'>
                        <div className='col d-flex flex-column'>

                           
                            <p>Teachers have ownership of the class, while students actively engage as members. Within each class, you have the ability to generate quizzes, document student feedback, and share announcements.</p>
                            
                            <div className='d-flex flex-column mb-2'>
                                <label>Class Name:</label>
                                <input 
                                    type="text" 
                                    placeholder='ex.English 1'
                                    {...register('className', {required: 'Class Name is required.'})}
                                />
                                {errors.className && <p id={style.errorMessage}>{errors.className?.message}</p> }
                            </div>

                            <div className='d-flex flex-column mb-2'>
                                <label>Class Code:</label>
                                <input 
                                    type="text" 
                                    placeholder='ex.ENG305'
                                    {...register('classCode', {
                                        required: 'Class Code is required.',
                                        validate: handleCheckClass,
                                    })}
                                />
                                {errors.classCode && <p id={style.errorMessage}>{errors.classCode?.message}</p> }
                            </div>
                        </div>
                        <div className='col d-flex align-items-center justify-content-center p-0'>
                            
                            <div 
                                className={style.imageInputCircle} 
                                onClick={() => inputFileRef.current.click()} 
                            > 
                                {
                                    image ? (
                                        <ImageRender image={image}/>
                                    ) : (
                                        'Drag image here.'
                                    )
                                    
                                }
                                
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleFile} 
                                    ref={inputFileRef}
                                    style={{ display: 'none' }}
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className='d-flex flex-column mb-3'>
                        <label>Description ( optional ):</label>
                        <textarea 
                            type="text"
                            placeholder='Class Description...'
                            {...register('classDesc')}
                        ></textarea>
                    </div>
                    
                    <div className='d-flex w-100 justify-content-end gap-2'>
                        <button type='submit'>Create Class</button>
                    </div>

                </div>
            </form>
        </div>
    </div>
  )
}

export default CreateClass
