import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import style from './HomePage.module.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Quiz } from '../Quiz'
import ClassPage from '../ClassPage/ClassPage'
import ChatPage from '../ChatPage'
import ActivityPage from '../ActivityPage'
import ManageAccout from '../ManageAccout'
import FilePage from '../FilePage'
import QuizTake from '../QuizTake'
import FriendsPage from '../FriendsPage'
import { ToastContainer } from 'react-toastify';
import { NavigationContext } from '../../context/NavigationContext'

const HomePage = () => {

  const { currentRoute } = useContext(NavigationContext)
  
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
            {currentRoute === 'activity' && <ActivityPage/>}
            {currentRoute === 'chat' && <ChatPage/>}
            {currentRoute === 'quizDev' && <Quiz/>} 
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