import React, { useEffect, useRef, useState } from 'react'
import style from './QuestionEnumeration.module.css'
import { CiCirclePlus } from "react-icons/ci";

const QuestionEnumeration = ({ selectedImage, handleDataFromChild }) => {

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
          <h1>Answer:</h1>
          <textarea type="text" />
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

export default QuestionEnumeration