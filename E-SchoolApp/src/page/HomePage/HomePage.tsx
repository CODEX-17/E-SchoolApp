import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import style from './HomePage.module.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import ClassPage from '../ClassPage/ClassPage'
import ChatPage from '../ChatPage'
import ActivityPage from '../ActivityPage'
import ManageAccout from '../ManageAccout'
import FilePage from '../FilePage'
import QuizTake from '../QuizTake'
import FriendsPage from '../FriendsPage'
import { ToastContainer } from 'react-toastify';
import { NavigationContext } from '../../context/NavigationContext'
import QuizMenu from '../Instructor/Quiz/QuizMenu/QuizMenu'
import QuizGeneratorLayout from '../Instructor/Quiz/QuizGeneratorLayout/QuizGeneratorLayout'
import ClassHome from '../ClassPage/ClassHome/ClassHome'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {

  const { currentRoute } = useContext(NavigationContext)

  const navigate = useNavigate()
  
  useEffect(() =>  {
    if (!localStorage.getItem('user')) {
      navigate('/')
    }
  },[])

  return (
    
      <div className={style.container}>
        <ToastContainer/>
        <div className={style.navigation}>
          <Navbar/>
        </div>
        <div className={style.content}>
          <div className={style.sidebar}>
            <Sidebar/>
          </div>
          <div className={style.renderArea}>
            {currentRoute === 'class' && <ClassPage/>}
            {currentRoute === 'classHome' && <ClassHome/>}
            {currentRoute === 'activity' && <ActivityPage/>}
            {currentRoute === 'chat' && <ChatPage/>}
            {currentRoute === 'quizMenu' && <QuizMenu/>}
            {currentRoute === 'quizGeneratorLayout' && <QuizGeneratorLayout/>} 
            {currentRoute === 'quizTake' && <QuizTake/>}
            {currentRoute === 'manageAccount' && <ManageAccout/>}
            {currentRoute === 'file' && <FilePage/>}
            {currentRoute === 'friends' && <FriendsPage/>}
          </div>
        </div>
      </div>
    
  )
}

export default HomePage