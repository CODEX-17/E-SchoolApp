import React, { useContext } from 'react'
import style from './QuizMenu.module.css'
import { PiBankFill } from "react-icons/pi";
import { IoIosCreate } from "react-icons/io";
import { NavigationContext } from '../../../../context/NavigationContext';

const QuizMenu = () => {

  const { setCurrentRoute } = useContext(NavigationContext)

  return (
    <div className={style.container}>
      <div className='text-center mb-4'>
        <h1>Choose Your Quiz Mode: Bank or Generator</h1>
        <p>Store and manage questions or generate quizzes instantly!</p>
      </div>
      <div className='d-flex gap-5 flex-wrap align-items-center justify-content-center'>
        <div className={style.card} onClick={() => setCurrentRoute('quizGeneratorLayout')}>
            <PiBankFill size={80} color='#0c9cec'/>
            <h1>Quiz Bank</h1>
            <p>A Quiz Bank is a collection of reusable quiz questions for assessments.</p>
        </div>
        <div className={style.card} onClick={() => setCurrentRoute('quizGeneratorLayout')}>
            <IoIosCreate size={80} color='#0c9cec'/>
            <h1>Quiz Generator</h1>
            <p>A Quiz Generator creates quizzes automatically from a set of questions.</p>
        </div>
      </div>
    </div>
  )
}

export default QuizMenu
