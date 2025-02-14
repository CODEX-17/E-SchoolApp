import React from 'react'
import style from './Enumeration.module.css'

const Enumeration = () => {  
    
  return (
    <div className={style.container}>
      <div className='d-flex w-100 flex-column mt-lg-5'>
        <label>Question</label>
        <textarea type='text' placeholder='ex.What is that?'></textarea>
        <p id={style.errorMessage}>Error message</p>
      </div>
      <div className='d-flex w-100 flex-column mt-lg-4'>
        <label>Answer</label>
        <textarea type='text' placeholder='ex.What is that?'></textarea>
        <p id={style.errorMessage}>Error message</p>
      </div>
      <div className='d-flex w-100 justify-content-around align-items-center'>
        <div className='d-flex  gap-1 align-items-center'>
            <input type='checkbox'/>
            <label className='fs-ls-6'>Required</label>
        </div>
        <div className='d-flex  gap-1 align-items-center'>
            <input type='checkbox'/>
            <label className='fs-lg-6'>Key Sensitive</label>
        </div>
      </div>      
      <div className='d-flex w-100 mt-4 justify-content-center'>
        <button>Add Question</button>
      </div>
    </div>
  )
}

export default Enumeration
