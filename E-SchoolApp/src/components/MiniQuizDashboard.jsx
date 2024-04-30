import React, { useEffect } from 'react'
import style from './MiniQuizDashboard.module.css'
import axios from 'axios'

const MiniQuizDashboard = ({ questionObj, setsubjectName }) => {

  const questions = questionObj

 

  return (
    <div className={style.container}>
        <div className='d-flex flex-column'>
            <h1>Question Title</h1>
            <input type='text' className={style.inputTitle}/>
        </div>
        
        <div className='d-flex flex-column mt-2 mb-2'>
            <div className='d-flex'>
                <h1>Question Description</h1>
                <p style={{ color: 'white' }}>(optional)</p>
            </div>
            
            <textarea type='text' id={style.textArea}/>
        </div>

        <select onChange={(e) => setsubjectName(e.target.value)}>
            <option>Select Subject</option>
            <option value={'english'}>english</option>
            <option value={'math'}>math</option>
            
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