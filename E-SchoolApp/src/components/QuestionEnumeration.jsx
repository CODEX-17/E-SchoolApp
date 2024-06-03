import React, { useEffect, useRef, useState } from 'react'
import style from './QuestionEnumeration.module.css'
import { CiCirclePlus } from "react-icons/ci";

const QuestionEnumeration = ({ finalQuestionSet, subjectName, handleSetImageSetQuestion, handleSetFinalQuestionSet, handleNotificationFromChild }) => {

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
  const [questionContent, setQuestionContent] = useState('')
  const [questionAnswerText, setQuestionAnswerText] = useState('')
  const [points, setPoints] = useState(1)
  const [keySensitive, setKeySensitive] = useState(false)
  const [required, setRequired] = useState(false)
  const [image, setImage] = useState(null)
  const questionNumber = finalQuestionSet.length + 1
  const questionID = generateUniqueID()
 
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

  const checkIfAllChoiceAreValid = () => {
    if (questionContent && questionAnswerText) {
      return false
    }
    return true
  }

  const submitEnumeration = () => {
    const question = {
      questionID,
      questionNumber,
      questionContent: questionContent,
      questionType: 'enumeration',
      points,
      required,
      keySensitive,
      questionAnswerText,
      numberOfAns: 1,
      choicesID: 'none',
      imageID: image ? image.imageID : 'none',
      fillLayoutID: 'none',
      subjectName,
    } 

    //submit to parent the final question
    handleSetFinalQuestionSet(question)

    if (image) {
      //submit ro parent the image
      handleSetImageSetQuestion(image)
    }

    //reset
    setQuestionContent('')
    setQuestionAnswerText('')

    //notify
    const message = `Successfully added question.`
    handleNotificationFromChild(message, 'success')

  }

  return (
    <div className={style.container}>
      <div className='d-flex gap-2 h-100'>
        <div className={style.left}>
          <div>
            <h1>Question:</h1>
            <input type="text" onChange={(e) => setQuestionContent(e.target.value)}/>
          </div>
          <div className='mt-2'>
            <h1>Answer:</h1>
            <textarea type="text" onChange={(e) => setQuestionAnswerText(e.target.value)}/>
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

          <button onClick={submitEnumeration} disabled={checkIfAllChoiceAreValid()}>Add question</button>
      </div>
    </div>
  )
}

export default QuestionEnumeration