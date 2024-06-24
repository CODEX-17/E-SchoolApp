import React, { useState } from 'react'
import style from './ContentChoicesEdit.module.css'

const ContentChoicesEdit = ({currentChoices, edittingLetter, handleEditedChoices, disableButton, notify}) => {

    const [updatedSelectedChoices, setUpdatedSelectedChoices] = useState(currentChoices)
    const [currentLetter, setCurrentLetter] = useState(currentChoices[edittingLetter])
    const selectedIndex = edittingLetter


    const handleSaveUpdatedChoices = () => {


      let updatedData = updatedSelectedChoices

      updatedData[selectedIndex].content = currentLetter.content
      updatedData[selectedIndex].letter = currentLetter.letter
      updatedData[selectedIndex].correct = currentLetter.correct
  
      setUpdatedSelectedChoices(updatedData)
     
      let correct = 0
      let noContent = 0

      //Check if the choices have atleast one correct answer and no empty content
      for (let i = 0; i < updatedData.length; i++) {
          if (updatedData[i].correct === true) {
              correct += 1
          }

          if (!updatedData[i].content) {
            noContent += 1
          }
      }

      console.log(correct, noContent)
      console.log('updated', updatedData)
      console.log('selectedLetter', updatedData[selectedIndex].letter)
      console.log('currentLetter', currentLetter)

      if (correct === 0) {
        const message = 'You must have atleast one correct choice.'
        notify(message, 'err')
      }else {
        if (noContent !== 0) {
          const message = 'Please fill the empty letter.'
          notify(message, 'err')
        }else{
           handleEditedChoices(updatedData)
           disableButton(true) 
        }
      }
          
    }

    const handleCutTheWords = (data) => {
      if (data) {
         if (data.match(/[a-zA-Z0-9]/g).length > 10) {
            return data.substring(0, 10)+'...'
          }
      }
      return data
    }

  return (
    <div className={style.rightContainer}>
        <h2>Choices Editor</h2>
        <div className={style.horizontalContainer}>
            <div className={style.prevEditor}>
                <p>Preview</p>
                <div className={style.choicesCardActive}>{currentLetter.letter+'.' + handleCutTheWords(currentLetter.content)}</div>
            </div>
        </div>
        <div className={style.botCon}>
            <p>Content</p>
            <textarea value={currentLetter.content} onChange={(e) => setCurrentLetter({...currentLetter, content: e.target.value})}></textarea>
            <div className='w-100 d-flex justify-content-start align-items-center gap-2 mt-1'>
                <p>Correct</p>
                <input type="checkbox" checked={currentLetter.correct} onChange={(e) => setCurrentLetter({...currentLetter, correct: e.target.checked})}/>
               <button id={style.btnSaveChoiceEditor} onClick={handleSaveUpdatedChoices}>Save</button>
            </div>
            
        </div>
    </div>
  )
}

export default ContentChoicesEdit