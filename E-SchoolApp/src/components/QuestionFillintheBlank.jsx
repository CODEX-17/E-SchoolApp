import React, { useRef, useState } from 'react'
import style from './QuestionFillintheBlank.module.css'
import { CiCirclePlus } from "react-icons/ci"
import { IoCloseCircle } from "react-icons/io5"

const QuestionFillintheBlank = ({ finalQuestionSet, subjectName, handleSetFillLayout, handleSetImageSetQuestion, handleSetFinalQuestionSet, handleNotificationFromChild }) => {
 
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
  const [fillLayoutID, setFillLayoutID] = useState(generateUniqueID())
  const [selectedIndex, setSelectedIndex] = useState(0)
  let numberOfAns = 0
  const [points, setPoints] = useState(1)
  const [keySensitive, setKeySensitive] = useState(false)
  const [required, setRequired] = useState(false)
  const [questionContent, setQuestionContent] = useState('')
  const [image, setImage] = useState(null)
  const questionNumber = finalQuestionSet.length + 1

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
    const file = e.target.files[0]
    setImage({
      imageID: generateUniqueID(),
      file: file
    })
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

    const question = {
      questionID: fillLayout[0].fillLayoutID,
      questionNumber,
      questionContent: questionContent,
      questionType: 'fill',
      points,
      required,
      keySensitive,
      questionAnswerText: 'none',
      numberOfAns,
      choicesID: 'none',
      imageID: image ? image.imageID : 'none',
      fillLayoutID: fillLayout[0].fillLayoutID,
      subjectName,
    }

    console.log('finalQuest:', question)

    //submit to parent the final fillLayout
    handleSetFillLayout(fillLayout)
    //submit to parent the final question
    handleSetFinalQuestionSet(question)
    
    if (image) {
      //submit ro parent the image
      handleSetImageSetQuestion(image)
    }

    //reset
    const uniqueID = generateUniqueID()
    setFillLayout([
      {
        fillContent: '',
        fillType: 'text',
        fillPosition: 1,
        fillLayoutID: uniqueID,
      },
    ])
    setImage(null)
    setSelectedIndex(0)

    //notify
    const message = `Successfully added question.`
    handleNotificationFromChild(message, 'success')

  }

    // Check if all choices have content
    const checkIfAllChoiceAreValid = () => {
 
      let noContent = 0
      let numberOfBlanks = 0

      if (fillLayout.length === 1) {
        return true
      }
      
      //Check layout if theres empty content and must be atleast one blank type
      for (let i = 0; i < fillLayout.length; i++) {
        if (fillLayout[i].fillContent === '') {
          noContent += 1
        }

        if (fillLayout[i].fillType === 'blank') {
          numberOfBlanks += 1
        }
      }
  
      if (noContent === 0) {
        if (numberOfBlanks === 0) {
          return true
        }

        numberOfAns = numberOfBlanks
        return false
      }else {
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
      <div className='d-flex w-100 gap-2'>
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
          <button id={style.btnEdit} onClick={() => setShowModal(true)}>Edit Layout</button>
        </div>
        
        </div>
        <div className={style.right}>
          {
            image ? (
              <div className={style.dragImage} title='add image' onClick={handleClickDragImage}>
                <img id={style.img} src={URL.createObjectURL(image.file)} alt="image" />
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

      <div className={style.bottomMenuQues}>
          <div className='d-flex gap-4 align-items-center'>
            <div className='d-flex gap-2 align-items-center'>
                <p>Points</p>
                <input type='number' min={1} value={points} id={style.inputPoints} onChange={(e) => setPoints(e.target.value)}/>
            </div>
            <div className="d-flex gap-2 align-items-center">
                <input type='checkbox' style={{ cursor: 'pointer' }} id={style.checkBox} checked={keySensitive} onChange={(e) => setKeySensitive(e.target.checked)}/>
                <p>Key sensitive</p>
            </div>
                   
            <div className="d-flex gap-2 align-items-center">
                <input type='checkbox' style={{ cursor: 'pointer' }} id={style.checkBox} checked={required} onChange={(e) => setRequired(e.target.checked)}/>
                <p>Required</p>
            </div>
          </div>

          <button onClick={submitFillLayout} disabled={checkIfAllChoiceAreValid()}>Add question</button>
      </div>

    </div>
  )

}

export default QuestionFillintheBlank