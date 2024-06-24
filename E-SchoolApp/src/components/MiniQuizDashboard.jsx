import React, { useEffect } from 'react'
import style from './MiniQuizDashboard.module.css'
import axios from 'axios'

const MiniQuizDashboard = ({ finalQuestionSet, quizTitle, quizDescription, subjectNameList, handleSetSubjectName, handleSetQuestionTitle, handleSetQuestionDescription }) => {

  const questions = finalQuestionSet

  return (
    <div className={style.container}>
        <div className='d-flex flex-column'>
            <h1>Question Title</h1>
            <input type='text' value={quizTitle} className={style.inputTitle} onChange={(e) => handleSetQuestionTitle(e.target.value)}/>
        </div>
        
        <div className='d-flex flex-column mt-2 mb-2' >
            <div className='d-flex'>
                <h1>Question Description</h1>
                <p style={{ color: 'white' }}>(optional)</p>
            </div>
            
            <textarea type='text' value={quizDescription} id={style.textArea} onChange={(e) => handleSetQuestionDescription(e.target.value)}/>
        </div>

        <select onChange={(e) => handleSetSubjectName(e.target.value)}>
            <option>Select Subject</option>
            {
                subjectNameList && 
                subjectNameList.map((data, index) => (
                    <option key={index} value={data.subjectName}>{data.subjectName}</option>
                ))  
            }
        </select>

        <div className={style.cardDash} style={{ marginTop: '20px' }}>
            <h1 style={{ fontSize: '12pt' }}>Total Questions</h1>
            <h1 style={{ fontSize: '20pt' }}>{questions.length}</h1>
        </div>
        <div className='d-flex gap-2'>
            <div className={style.cardDash2}>
                <h1 >Overall Points</h1>
                <h1 style={{ fontSize: '20pt' }}>10</h1>
            </div>
            <div className={style.cardDash2}>
                <h1>Current Question</h1>
                <h1 style={{ fontSize: '20pt' }}>10</h1>
            </div>
        </div>
        <div className='d-flex gap-2'>
            <div className={style.cardDash3}>
                <div className='d-flex flex-column align-items-start'>
                    <p>Total</p>
                    <h1>Enumeration</h1>
                </div>
                
                <h1 style={{ fontSize: '20pt' }}>10</h1>
            </div>
            <div className={style.cardDash3}>
                <div className='d-flex flex-column align-items-start'>
                    <p>Total</p>
                    <h1>Choices Quiz</h1>
                </div>
                
                <h1 style={{ fontSize: '20pt' }}>10</h1>
            </div>
        </div>
        <div className='d-flex gap-2'>
            <div className={style.cardDash3}>
                <div className='d-flex flex-column align-items-start'>
                    <p>Total</p>
                    <h1>Fill in the Blank</h1>
                </div>
                
                <h1 style={{ fontSize: '20pt' }}>10</h1>
            </div>
            <div className={style.cardDash3}>
                <div className='d-flex flex-column align-items-start'>
                    <p>Total</p>
                    <h1>True or False</h1>
                </div>
                
                <h1 style={{ fontSize: '20pt' }}>10</h1>
            </div>
        </div>
    </div>
  )
}

export default MiniQuizDashboard