import React, { useRef, useState } from 'react'
import style from './QuestionFillintheBlank.module.css'
import { CiCirclePlus } from "react-icons/ci"
import { IoCloseCircle } from "react-icons/io5"

const QuestionFillintheBlank = ({ selectedImage, handleSetSelectedImage, handleNotificationFromChild, handleSetFillLayout }) => {
 
  const generateUniqueID = () => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const length = 8
    let result = ''
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length)
        result += charset.charAt(randomIndex)
    }
   
    return result
  }

  const inputImageRef = useRef(null)
  const [image, setImage] = useState(null)
  const fillLayoutID = generateUniqueID()
  const [selectedIndex, setSelectedIndex] = useState(0)

  const [fillLayout, setFillLayout] = useState(
    [
      {
        fillContent: '',
        fillType: 'text',
        fillPosition: 1,
        fillLayoutID,
      },
    ]
  )

  //modal variable
  const [showModal, setShowModal] = useState(false)

  const handleClickDragImage = () => {
    inputImageRef.current.click()
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    handleSetSelectedImage(file)
  }

  const limitTheStringLength = (data) => {
    if (data.length > 15) {
      return data.substring(0, 10) + '...'
    }

    return data
  }

  const handleSettheContent = (e) => {
    const value = e.target.value

    // Create a new array with updated content for the specific choice
    const newFillLayout = fillLayout.map((data, index) => {
      if (index === selectedIndex) {
        return { ...data, fillContent: value }
      }
      return data
    })

    setFillLayout(newFillLayout)

  }

  const handleAddFillLayout = () => {

    const arrayLenght = fillLayout.length + 1

    const newFillLayout = {
      fillContent: '',
      fillType: 'text',
      fillPosition: arrayLenght,
      fillLayoutID: fillLayout[0].fillLayoutID,
    }

    setFillLayout((oldData) => [...oldData, newFillLayout])

    console.log(fillLayout)
  }

  const handleChangeFillType = (data) => {

    // Create a new array with updated correction for the specific choice
    const newFillLayout = fillLayout.map((fill, index) => {
      if (index === selectedIndex) {
        return { ...fill, fillType: data }
      }
      return fill
    })

    setFillLayout(newFillLayout)
  }

  const handleDeleteFillLayout = () => {

    let newFillLayout = fillLayout.filter((data, index) => index !== selectedIndex)

    for (let i = 0; i < newFillLayout.length; i++) {
      newFillLayout[i].fillPosition = i + 1
    }

    setSelectedIndex(0)
    setFillLayout(newFillLayout)

  }

  //Set choices to parent choices variable
  const submitFillLayout = () => {

    let complete = 0
    let numberOfBlanks = 0

    for (let i = 0; i < fillLayout.length; i++) {
      if (fillLayout[i].fillContent !== '') {
        complete += 1
        if (fillLayout[i].fillType === 'blank') {
          numberOfBlanks += 1
        }
      }
    }

    if (complete === fillLayout.length) {

      //The set of fillLayout must be atleast one blank
      if (numberOfBlanks > 0) {
        handleSetFillLayout(fillLayout)
        setShowModal(false)
        const message = `Successfully saved ${complete} FillLayout.`
        handleNotificationFromChild(message, 'success')
      }else {
        const message = 'Choices must have atleast one blank.'
        handleNotificationFromChild(message, 'err')
      }
      
    }else {
      const message = 'Please fill all the layout content.'
      handleNotificationFromChild(message, 'err')
    }

  }

    // Check if all choices have content
    const checkIfAllChoiceAreValid = () => {
 
      let noContent = 0

      if (fillLayout.length === 1) {
        return true
      }
  
      for (let i = 0; i < fillLayout.length; i++) {
        if (fillLayout[i].fillContent === '') {
          noContent += 1
        }
      }
  
      if (noContent === 0) {
        console.log(noContent)
        return false
      }else {
        console.log(noContent)
        return true
      }
      
    }


  return (
    <div className={style.container}>
      {
        showModal && (
          <div className={style.modal}>
            <>
              <div className={style.leftPart}>
                {
                  fillLayout.map((data, index) => (
                    <div className={style.smallCard} style={{ backgroundColor: data.fillContent !== '' ? '#0999ed85' : '#d410105b'}} key={index} onClick={() => setSelectedIndex(index)}>
                      <b>{data.fillType}</b> {data.fillContent === '' ? 'insert...' : limitTheStringLength(data.fillContent)}
                    </div>
                  ))
                }
                
              </div>
              <div className={style.rightPart}>
                <div className={style.headRightPart}>
                  <div className='d-flex gap-2 align-items-center'><h2>Mode:</h2><p>{fillLayout[selectedIndex].fillType}</p></div>
                  <div className='d-flex gap-2 justify-content-end'>
                      {
                        fillLayout.length > 1 && (
                          <button id={style.addMoreChoices} style={{ backgroundColor: '#BF3131'}} onClick={handleDeleteFillLayout}>Delete</button>
                        )
                      } 
                      {
                        fillLayout[selectedIndex].fillType === 'text' ? 
                          <button id={style.addMoreChoices} onClick={() =>handleChangeFillType('blank')} style={{ backgroundColor: '#FFBF00'}}>Change Mode</button>
                          :
                          <button id={style.addMoreChoices} onClick={() =>handleChangeFillType('text')} style={{ backgroundColor: '#337357'}}>Change Mode</button>
                      }
                    
                    <button id={style.addMoreChoices} onClick={handleAddFillLayout}>Add</button>
                  
                    

                  </div>
                
                </div>
                <textarea 
                    id={style.textarea}
                    cols="30" rows="10"
                    placeholder={fillLayout[selectedIndex].fillType === 'text' ? 'Insert content...' : 'Insert answer...'}
                    value={fillLayout[selectedIndex].fillContent}
                    onChange={handleSettheContent}
                  >

                </textarea>
                <div className='d-flex gap-2'>
                  <button id={style.btnSave} style={{ backgroundColor: '#3E3F40' }} onClick={() => setShowModal(false)}>Close</button>
                </div>
                
              </div>
            </>
          </div>
        )
      }
      <div className={style.left}>
        <div>
          <h1>Question:</h1>
          <div className={style.listView}>
            {
              fillLayout.map((data, index) => (
                data.fillType === 'text' ? 
                  <p key={index}>{data.fillContent === '' ? 'insert...' : data.fillContent}</p>
                  : 
                  <p style={{ textDecoration:'underline', color:'gray' }} key={index}>{data.fillContent}</p>
                ))
            }
          
            
          </div>
        </div>
        <div className='mt-2'>
          <h1>Layout:</h1>
          <div className={style.listCon}>
            <div className={style.listFill}>
              {
                fillLayout.map((data, index) => (
                    <div className={style.card} key={index} onClick={() => {setSelectedIndex(index), setShowModal(true)}}>
                      <p>{data.fillContent === '' ? 'insert...' : data.fillContent.substring(0, 10)}</p>
                      <div className={style.badge}>{data.fillType}</div>
                    </div>
                  ))
              }
            </div>
          </div>
        </div>
        <div className='d-flex gap-2'>
          <button id={style.btnEdit} onClick={() => setShowModal(true)}>Edit</button>
          <button id={style.btnEdit} onClick={submitFillLayout} disabled={checkIfAllChoiceAreValid()}>Save</button>
        </div>
        
      </div>
      <div className={style.right}>
        {
          selectedImage ? (
            <div className={style.dragImage} title='add image' onClick={handleClickDragImage}>
              <img id={style.img} src={URL.createObjectURL(selectedImage)} alt="image" />
            </div>
          ) : (
            <div className={style.dragImage} title='add image' onClick={handleClickDragImage}>
              <CiCirclePlus size={30}/>
              Add image here
            </div>

            
          ) 
        }
        
        <input type="file" accept='image/*' ref={inputImageRef} onChange={handleImageUpload} style={{ display: 'none' }}/>
      </div>
    </div>
  )

}

export default QuestionFillintheBlank