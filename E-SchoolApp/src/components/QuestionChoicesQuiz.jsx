import React, { useRef, useState } from 'react'
import style from './QuestionChoicesQuiz.module.css'
import { CiCirclePlus } from "react-icons/ci";
import { AiOutlineCloseCircle, AiFillCheckCircle } from "react-icons/ai"

const QuestionChoicesQuiz = ({selectedImage, handleSetSelectedImage, handleSetChoices, handleNotificationFromChild, handleSetQuestionContent, questionContent}) => {

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
  const choicesID = generateUniqueID()
  const [selectedIndex, setSelectedIndex] = useState(0)

  //by default theirs a default choices [A,B,C,D]
  const [choices, setChoices] = useState([
    {
      choicesID,
      letter: 'A',  
      content: '',
      correct: false,
    },
    {
      choicesID,
      letter: 'B',
      content: '',
      correct: false,
    },
    {
      choicesID,
      letter: 'C',
      content: '',
      correct: false,
    },
    {
      choicesID,
      letter: 'D',
      content: '',
      correct: false,
    },
  ])

  const [showModal, setShowModal] = useState(false)

  const handleClickDragImage = () => {
    inputImageRef.current.click()
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    handleSetSelectedImage(file)
  }

  const handleSettheContent = (e) => {
    const value = e.target.value

    // Create a new array with updated content for the specific choice
    const newChoices = choices.map((choice, index) => {
      if (index === selectedIndex) {
        return { ...choice, content: value }
      }
      return choice
    })

    setChoices(newChoices)

  }

  const limitTheStringLength = (data) => {
    if (data.length > 15) {
      return data.substring(0, 15) + '...'
    }

    return data
  }

  const handleAddChoices = () => {

    const arrayLenght = choices.length + 1

    //Create a new letter by on ASCII code 
    const letter = String.fromCharCode(65 + arrayLenght)

    const newChoice = {
      choicesID,
      letter: letter,
      content: '',
      correct: false,
    };

    setChoices((oldData) => [...oldData, newChoice])
  }

  const handleDeleteChoices = () => {

    let newChoices = choices.filter((data, index) => index !== selectedIndex)

    for (let i = 0; i < newChoices.length; i++) {
      newChoices[i].letter = String.fromCharCode(65 + i)
    }

    setSelectedIndex(0)
    setChoices(newChoices)

  }

  //Set choices to parent choices variable
  const submitChoices = () => {

    let complete = 0
    let numberOfCorrectChoices = 0

    for (let i = 0; i < choices.length; i++) {
      if (choices[i].content !== '') {
        complete += 1
        if (choices[i].correct) {
          numberOfCorrectChoices += 1
        }
      }
    }

    if (complete === choices.length) {

      //The set of choices must be atleast one correct answer
      if (numberOfCorrectChoices > 0) {
        handleSetChoices(choices)
        setShowModal(false)
        const message = `Successfully saved ${complete} choices.`
        handleNotificationFromChild(message, 'success')
      }else {
        const message = 'Choices must have atleast one correct answer.'
        handleNotificationFromChild(message, 'err')
      }
      
    }else {
      const message = 'Please fill all the choices content.'
      handleNotificationFromChild(message, 'err')
    }

  }

  const handleMakeCorrectionChange = (data) => {

    // Create a new array with updated correction for the specific choice
    const newChoices = choices.map((choice, index) => {
      if (index === selectedIndex) {
        return { ...choice, correct: data }
      }
      return choice
    })

    setChoices(newChoices)
  }

  // Check if all choices have content
  const checkIfAllChoiceAreValid = () => {
    console.log(questionContent)

    //check if theirs a question content
    if (questionContent === '' || questionContent === null) {
      return true
    }

    let noContent = 0

    for (let i = 0; i < choices.length; i++) {
      if (choices[i].content === '') {
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
            <div className={style.leftPart}>
              {
                choices.map((data, index) => (
                  <div className={style.smallCard} style={{ backgroundColor: data.content !== '' ? '#0999ed85' : '#d410105b'}} key={index} onClick={() => setSelectedIndex(index)}>
                    <b>{data.letter}</b> {data.content === '' ? 'insert answer...' : limitTheStringLength(data.content)}
                    {data.correct ? <AiFillCheckCircle color='green'/> : <AiOutlineCloseCircle/>}
                  </div>
                ))
              }
              
            </div>
            <div className={style.rightPart}>
              <div className={style.headRightPart}>
                <div className='d-flex gap-2'><h2>Letter:</h2><p>{choices[selectedIndex].letter}</p></div>
                <div className='d-flex gap-2 justify-content-end'>
                    {
                      choices[selectedIndex].correct ? 
                        <button id={style.addMoreChoices} onClick={() =>handleMakeCorrectionChange(false)} style={{ backgroundColor: '#D24545'}}>Make it Wrong</button>
                        :
                        <button id={style.addMoreChoices} onClick={() =>handleMakeCorrectionChange(true)} style={{ backgroundColor: '#337357'}}>Make it Correct</button>
                    }
                   
                   <button id={style.addMoreChoices} onClick={handleAddChoices}>Add Choices +</button>
                   {
                    choices.length > 4 && 
                     <button id={style.addMoreChoices} style={{ backgroundColor: '#BF3131'}} onClick={handleDeleteChoices}>Delete</button>
                   }
                  
                </div>
               
              </div>
              <textarea 
                  id={style.textarea}
                  cols="30" rows="10"
                  placeholder='Insert answer...'
                  value={choices[selectedIndex].content}
                  onChange={handleSettheContent}
                >

              </textarea>
              <div className='d-flex gap-2'>
                <button id={style.btnSave} style={{ backgroundColor: '#3E3F40' }} onClick={() => setShowModal(false)}>Close</button>
              </div>
              
            </div>
              
          </div>
        )
      }
      <div className={style.left}>
        <div>
          <h1>Question:</h1>
          <input type="text" onChange={(e) =>handleSetQuestionContent(e.target.value)}/>
        </div>
        <div className='mt-2'>
          <h1>Choices:</h1>
          <div className={style.listChoices}>
            {
              choices.map((data, index) => (
                 <div className={style.card} key={index} onClick={() => {setSelectedIndex(index), setShowModal(true)}}>
                    <b>{data.letter}</b><p>{limitTheStringLength(data.content)}</p>
                    {data.correct ? <AiFillCheckCircle color='green'/> : <AiOutlineCloseCircle/>}
                 </div>
              ))
            }
          </div>
        </div>
        <h1>Add more choices</h1>
        <div className={style.bottomMenu}>
          <button onClick={() => setShowModal(true)}>Edit Choices</button>
          <button id={style.btnSave} onClick={submitChoices} disabled={checkIfAllChoiceAreValid()}>Save</button>
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

export default QuestionChoicesQuiz