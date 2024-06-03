import React, { useRef, useState } from 'react'
import style from './QuestionChoicesQuiz.module.css'
import { CiCirclePlus } from "react-icons/ci";
import { AiOutlineCloseCircle, AiFillCheckCircle } from "react-icons/ai"

const QuestionChoicesQuiz = ({finalQuestionSet, subjectName, handleSetChoices, handleSetImageSetQuestion, handleSetFinalQuestionSet, handleNotificationFromChild}) => {

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
  const [choicesID, setChoicesID] = useState(generateUniqueID()) 
  const [selectedIndex, setSelectedIndex] = useState(0)
  let numberOfAns = 0
  const [points, setPoints] = useState(1)
  const [keySensitive, setKeySensitive] = useState(false)
  const [required, setRequired] = useState(false)
  const [questionContent, setQuestionContent] = useState('')
  const [image, setImage] = useState(null)
  const questionNumber = finalQuestionSet.length + 1


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
  const [modalMode, setModalMode] = useState('editor') // editor | question


  // Check if all choices have content
  const checkIfAllChoiceAreValid = () => {
    console.log(questionContent)
    console.log('choices',choices)

    //check if theirs a question content
    if (questionContent === '') {
      return true
    }

    let noContent = 0
    let correctAnswer = 0

    //Check if the choices have atleast one correct answer and no empty content
    for (let i = 0; i < choices.length; i++) {
      if (choices[i].content === '') {
        noContent += 1
      }

      if (choices[i].correct === true || choices[i].correct === 'true') {
        correctAnswer += 1
      }
    }

    if (noContent === 0) {
      if (correctAnswer === 0) {
        return true
      }

      numberOfAns = correctAnswer
      return false
    }else {
      return true
    }
    
  }


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
  const submitQuestion = () => {

    const question = {
      questionID: choices[0].choicesID,
      questionNumber,
      questionContent: questionContent,
      questionType: 'choices',
      points,
      required,
      keySensitive,
      questionAnswerText: 'none',
      numberOfAns,
      choicesID: choices[0].choicesID,
      imageID: image ? image.imageID : 'none',
      fillLayoutID: 'none',
      subjectName,
    } 

    //submit to parent the final choices
    handleSetChoices(choices)
    //submit to parent the final question
    handleSetFinalQuestionSet(question)

    setQuestionContent('')

    if (image) {
      //submit ro parent the image
      handleSetImageSetQuestion(image)
    }

    setShowModal(false)

    //reset
    const uniqueID = generateUniqueID()
    setChoices([
      {
        choicesID: uniqueID,
        letter: 'A',  
        content: '',
        correct: false,
      },
      {
        choicesID: uniqueID,
        letter: 'B',
        content: '',
        correct: false,
      },
      {
        choicesID: uniqueID,
        letter: 'C',
        content: '',
        correct: false,
      },
      {
        choicesID: uniqueID,
        letter: 'D',
        content: '',
        correct: false,
      },
    ])
    setImage(null)
    setSelectedIndex(0)

    //notify
    const message = `Successfully added question.`
    handleNotificationFromChild(message, 'success')
      
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




  return (
    <div className={style.container}>
      {
        showModal && (
          <div className={style.modal}>
            {
              modalMode === 'editor' ? (
                <>
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
                </>
              ) : (
                <div className={style.questionModal}>
                  <textarea placeholder='Insert question...' value={questionContent} onChange={(e) => setQuestionContent(e.target.value)}></textarea>
                  <button onClick={() => {setShowModal(false), setModalMode('editor')}}>Close</button>
                </div>
              )
            }

          </div>
        )
      }
      <div className='d-flex gap-2'>
        <div className={style.left}>
          <div>
            <h1>Question:</h1>
            <input type="text" value={questionContent} onClick={() => {setShowModal(true), setModalMode('question')}}/>
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
            <button onClick={() => {setShowModal(true), setModalMode('editor')}}>Edit Choices</button>
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

          <button onClick={submitQuestion} disabled={checkIfAllChoiceAreValid()}>Add question</button>
      </div>
    </div>
  )
}

export default QuestionChoicesQuiz