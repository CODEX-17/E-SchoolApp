import React, { useContext, useEffect, useState } from 'react'
import NavbarComponent from '../components/NavbarComponent'
import style from './HomePage.module.css'
import SidebarComponent from '../components/SidebarComponent'
import { useNavigateStore } from '../stores/useNavigateStore'
import { useNavigate } from 'react-router-dom';
import { Quiz } from './Quiz'
import ClassPage from './ClassPage'
import ChatPage from './ChatPage'
import ActivityPage from './ActivityPage'
import ManageAccout from './ManageAccout'
import FilePage from './FilePage'
import QuizTake from './QuizTake'
import FriendsPage from './FriendsPage'
import { ToastContainer } from 'react-toastify';
import { NavigationContext } from '../context/NavigationContext'

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
        <div className={style.nav}>
          <NavbarComponent/>
        </div>
        <div className={style.horizontal}>
          <div className={style.left}>
              <SidebarComponent/>
          </div>
          <div className={style.right}>
            {currentRoute === 'activity' && <ActivityPage/>}
            {currentRoute === 'chat' && <ChatPage/>}
            {currentRoute === 'quizDev' && <Quiz/>}
            {currentRoute === 'class' && <ClassPage/>}
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