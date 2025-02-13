import React, { useState } from 'react'
import style from './QuestionGenerator.module.css'
import Enumeration from '../Enumeration/Enumeration'

const QuestionGenerator = () => {
    
  const [questionType, setQuestionType] = useState('Enumeration')

  const menuBtn = [
    {
        name: 'Enumeration',
        funtion: () => setQuestionType('Enumeration'),
    },
    {
        name: 'Multiple Choice',
        funtion: () => setQuestionType('Multiple Choice'),
    },
    {
        name: 'Fill in the blank',
        funtion: () => setQuestionType('Fill in the blank'),
    },
    {
        name: 'True or False',
        funtion: () => setQuestionType('True or False'),
    },
  ]

  const handleTitleRender = (data) => {
    
        switch (data) {

            case 'Enumeration':
            return 'Requires participants to list multiple correct answers for a given question.'

            case 'Multiple Choice':
            return 'Presents a question with several answer options, where only one or more are correct.'

            case 'Fill in the blank':
            return 'Provides statements with missing words that participants must accurately complete.'

            case 'True or False':
            return 'Asks participants to determine whether a given statement is true or false.'
        }
  }

  const renderContent = (data) => {

    switch (data) {

        case 'Enumeration':
        return <Enumeration/>

        case 'Multiple Choice':
        return 'Presents a question with several answer options, where only one or more are correct.'

        case 'Fill in the blank':
        return 'Provides statements with missing words that participants must accurately complete.'

        case 'True or False':
        return 'Asks participants to determine whether a given statement is true or false.'
    }

  }

  return (
    <div className={style.container}>
      <div className='w-100 justify-content-center d-flex flex-wrap align-items-center'>
        {
            menuBtn.map((btn) => (
                <div 
                    className={ 
                        questionType === btn.name ? 
                        style.menuBtnActive : style.menuBtn
                    } 
                    onClick={btn.funtion}
                >
                    {btn.name}
                </div>
            ))
        }
      </div>
      <div className='d-flex flex-column mt-4 w-100 h-100 p-lg-5 p-sm-0'>
        <div className='w-100 d-flex flex-column justify-content-center text-center'>
            <h1 className='m-0'>{questionType}</h1>
            <p>{handleTitleRender(questionType)}</p>
        </div>
        <div className='w-100 overflow-hidden h-100'>
            {renderContent(questionType)}
        </div>
      </div>
    </div>
  )
}

export default QuestionGenerator
