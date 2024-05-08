import React, { useRef, useState } from 'react'
import style from './QuestionFillintheBlank.module.css'
import { CiCirclePlus } from "react-icons/ci"
import { IoCloseCircle } from "react-icons/io5"

const QuestionFillintheBlank = ({ selectedImage, handleDataFromChild }) => {
 
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
          <div className={style.listView}>
            <p>sample text</p>
            <p style={{ textDecoration:'underline', color:'gray' }}>sample blank</p>
          </div>
        </div>
        <div className='mt-2'>
          <h1>Layout:</h1>
          <div className={style.listCon}>
            <div className={style.listFill}>
              <div className={style.card}>
                <p>My name...</p>
                <div className={style.badge}>Text</div>
                <IoCloseCircle color='gray' cursor={'pointer'}/>
              </div>
              <div className={style.card}>
                <p>My name...</p>
                <div className={style.badge}>Blank</div>
                <IoCloseCircle color='gray' cursor={'pointer'}/>
              </div>
              
            </div>
          </div>
        </div>
        <h1>Text Mode</h1>
        <div className={style.bottomMenu}>
          <h1></h1>
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

export default QuestionFillintheBlank