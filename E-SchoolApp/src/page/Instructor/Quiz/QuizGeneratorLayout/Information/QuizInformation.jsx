import React from 'react'
import style from './QuizInformation.module.css'

const QuizInformation = () => {
  return (
    <div className={style.container}>
        <div className="d-flex flex-column w-100 h-100 overflow-auto p-lg-4 ">
            <div className='d-flex w-100 flex-column mb-4'>
                <p>The user is required to input a quiz title, description, and general instructions to provide essential details about the quiz. The title serves as the quiz's name, the description offers a brief overview of its purpose or content, and the general instructions guide participants on how to complete the quiz, including rules, time limits, and any special requirements.</p>
            </div>
            <div className='d-flex w-100 flex-column mb-lg-4 mb-md-4 mb-sm-2'>
                <label>Quiz Title</label>
                <input type="text" placeholder='Ex. Algorithm'/>
                <p id={style.errorMessage}>Error message</p>
            </div>
            <div className='d-flex w-100 flex-column mb-lg-4 mb-md-4 mb-sm-2'>
                <label>Quiz Description</label>
                <textarea placeholder='Ex. Algorithm'></textarea>
                <p id={style.errorMessage}>Error message</p>
            </div>
            <div className='d-flex w-100 flex-column mb-lg-4 mb-md-4 mb-sm-2'>
                <label>General Instruction</label>
                <textarea placeholder='Ex. Algorithm'></textarea>
                <p id={style.errorMessage}>Error message</p>
            </div>
        </div>
    </div>
  )
}

export default QuizInformation
