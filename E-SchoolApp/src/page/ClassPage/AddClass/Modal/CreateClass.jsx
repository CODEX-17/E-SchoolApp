import React, { useState } from 'react'
import style from './CreateClass.module.css'

const CreateClass = () => {

  const [image, setImage] = useState(null)

  const handleAddClass = () => { 

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
  
  const handleSubmit = (data) => {
    console.log(data)
  }   

  return (
    <div>
        <div className={style.modalContainer}>
            <form style={{ marginTop: '0px' }} onSubmit={handleAddClass}>
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
    </div>
  )
}

export default CreateClass
