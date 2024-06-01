import React, { useRef, useState } from 'react'
import style from './QuestionTrueOrFalse.module.css'
import { CiCirclePlus } from "react-icons/ci"

const QuestionTrueOrFalse = ({ selectedImage, questionAnswerText, handleDataFromChild, handleSetQuestionContent, handleSetQuestionAnswerText }) => {
  
  const inputImageRef = useRef(null)
  const [image, setImage] = useState(null)

  const handleClickDragImage = () => {
    inputImageRef.current.click()
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    handleDataFromChild(file)
  }

  return (
    <div className={style.container}>
      <div className={style.left}>
        <div>
          <h1>Question:</h1>
          <input type="text" onChange={(e) =>handleSetQuestionContent(e.target.value)}/>
        </div>
        <div className='mt-5'>
          <h1>Choices Answer:</h1>
          <div className='d-flex gap-2 justify-content-center'>
             <button style={{ 
                backgroundColor: questionAnswerText === 'true' ? '#099AED' : 'white',
                color: questionAnswerText === 'true' ? 'white' : '#099AED' 
                }} onClick={() => handleSetQuestionAnswerText('true')}>True</button>

             <button style={{ 
                backgroundColor: questionAnswerText === 'false' ? '#099AED' : 'white',
                color: questionAnswerText === 'false' ? 'white' : '#099AED' 
                }} onClick={() => handleSetQuestionAnswerText('false')}>False</button>
          </div>
         
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

export default QuestionTrueOrFalse