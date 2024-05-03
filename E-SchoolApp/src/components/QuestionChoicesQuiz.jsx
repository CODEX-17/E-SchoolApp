import React, { useRef, useState } from 'react'
import style from './QuestionChoicesQuiz.module.css'
import { CiCirclePlus } from "react-icons/ci";

const QuestionChoicesQuiz = ({selectedImage, handleDataFromChild}) => {

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
          <input type="text" />
        </div>
        <div className='mt-2'>
          <h1>Choices:</h1>
          <div className={style.listChoices}>
            <div className={style.card}>
              <h1>A</h1><input type='text'/>
            </div>
            <div className={style.card}>
              <h1>B</h1><input type='text'/>
            </div>
            <div className={style.card}>
              <h1>C</h1><input type='text'/>
            </div>
            <div className={style.card}>
              <h1>D</h1><input type='text'/>
            </div>
          </div>
        </div>
        <h1>Add more choices</h1>
        <div className={style.bottomMenu}>
          <h1>F</h1>
          <input id={style.inputContent} type="text" placeholder='Insert content...'/>
          <button>Add choices +</button>
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