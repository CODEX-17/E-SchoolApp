import React,{ useContext, useEffect, useRef, useState } from 'react'
import style from './ManageAccout.module.css'
import { BiSolidShow } from 'react-icons/bi'
import axios from 'axios'
import { NotificationContext } from '../context/NotificationContext';


const ManageAccout = () => {

  const [image, setImage] = useState(null)
  const [showPassword, setShowPass] = useState(false)
  const [change, setChange] = useState(true)
  const [isShowErrorMessage, setIsShowErrorMessage] = useState(false)
  const accountCurrent = JSON.parse(localStorage.getItem('user'))
  let fullname = accountCurrent.firstname + ' ' + accountCurrent.middlename.charAt(0) + '. ' + accountCurrent.lastname
  const oldPassword = accountCurrent.password
  const [updatedPassword, setupdatedPassword] = useState(accountCurrent.password)
  const inputRef = useRef(null)

  const { notify } = useContext(NotificationContext)

  const isImageType = (file) => {
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif']
    const extension = file.name.split('.').pop().toLowerCase()
    return allowedExtensions.includes(extension)
  }

  const handleInputChange = (e) => {
    e.preventDefault()
  }


  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && isImageType(file)) {
      setChange(false)
      handleFile(file)
    }else {
      const message = 'Only images are allowed'
      notify(message, false)
    }
  };

  const handleFile = (file) => {
    if (file) {
      setImage({
        file,
        imageID: accountCurrent.imageID,
      })
    
    }
  }


  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
  }

  const handleUpload = () => {
    const acctID = accountCurrent.acctID
    const imageID = accountCurrent.imageID

    if (updatedPassword !== '') {
      const formData = new FormData
      formData.append('password', updatedPassword)
      formData.append('acctID', acctID)
      formData.append('imageID', imageID)
    
      if (image) {
        formData.append('image', image.file)
      }else {
        formData.append('image', 'default')
      }
      
      for (let pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
      }

      if (updatedPassword) {
        console.log(updatedPassword)
        axios.post('http://localhost:5001/accounts/updateAccount', formData)
        .then(res => res.data)
        .then((data) => {

          const image = data.imagePath
          let userData = JSON.parse(localStorage.getItem('user'))
          
          userData.password = updatedPassword
          userData.data = image

          localStorage.setItem('user', JSON.stringify(userData))
          
          notify('Successfully update account.', true)
          
        })
        .catch(err => console.log(err))
      }

      

    }else {
      setChange(true)
    }
    
   
  }

  const handleChangePassword = (e) => {
    e.preventDefault()
    const value = e.target.value
      if (oldPassword === value) {
        inputRef.current.style.color = 'red'
        setIsShowErrorMessage(true)
        setTimeout(() => {
          setIsShowErrorMessage(false)
        }, 3000);
      }else {
        inputRef.current.style.color = '#099AED'
        setupdatedPassword(value)
        setChange(false)
      }
    
    

  }


  return (
    <div className={style.container}>
        <div className={style.content}>
          <ToastContainer/>
            <h1>Personal Information</h1>
            <div className={style.editProfile}>
                <div
                    className={style.circleUpload}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                >
                    { image ? (
                      <img src={URL.createObjectURL(image.file)} alt="Uploaded" id={style.imgUploaded} />
                    ) : ( 
                      <p>Drag & drop an image here.</p>
                    )}
                </div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleInputChange}
                    style={{ display: 'none' }}
                />
                <div className='d-flex flex-column w-50 gap-2'>
                    <div className='d-flex flex-column'>
                        <p className='m-0' id={style.label}>Name:</p>
                        <input className={style.inputBarDis} type="text" value={fullname} disabled/>
                    </div>
                    <div className='d-flex flex-column'>
                        <p className='m-0' id={style.label}>Email:</p>
                        <input className={style.inputBarDis} type="text" value={accountCurrent.email}/>
                    </div>
                    <div className='d-flex flex-column'>
                        <p className='m-0' id={style.label}>Password:</p>
                        <div className='d-flex align-items-center gap-2 position-relative'>
                            <input id={style.inputBar} type={showPassword ? 'text': 'password'} value={updatedPassword} ref={inputRef} onChange={handleChangePassword}/>
                            <BiSolidShow size={20} id={style.showPass} onClick={() => setShowPass(!showPassword)}/>
                        </div>
                    </div>
                    {
                      isShowErrorMessage && <p id={style.errorMessage}>New password cannot be identical to the old one.</p>
                    }
                    
                </div>

            </div>
                <button onClick={handleUpload} id={style.btnSave} disabled={change}>Update</button>
        </div>
    </div>
  )
}

export default ManageAccout

