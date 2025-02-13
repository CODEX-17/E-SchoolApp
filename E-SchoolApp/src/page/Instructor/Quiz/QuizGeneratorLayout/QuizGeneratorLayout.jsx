import React, { useState } from 'react'
import style from './QuizGeneratorLayout.module.css'
import Sidebar from './Sidebar/Sidebar'
import QuizInformation from './Information/QuizInformation'
import QuestionGenerator from './Generator/QuestionGenerator'


const QuizGeneratorLayout = () => {

  const [display, setDisplay] = useState('information')

  const renderDisplay = () => {

    switch (display) {
      case 'information' :
        return <QuizInformation/>
        
      case 'preview' :
        return 'preview'
      
      case 'generator' :
        return <QuestionGenerator/>
        
      case 'setup' :
        return 'setup'
        
    }

  }

  return (
    <div className={style.container}>
      <div className={style.sidebar}>
        <Sidebar 
          display={display} 
          setDisplay={setDisplay}
        />
      </div>
      <div className={style.content}>
        <div className={style.navbar}>
          <h1>{display && display.toUpperCase()}</h1>
        </div>
        
        <div className='w-100 h-100 overflow-hidden'>
          {renderDisplay()}
        </div>
      </div>
    </div>
  )
}

export default QuizGeneratorLayout
