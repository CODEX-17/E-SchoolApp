import React, { useEffect, useState } from 'react'
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

const HomePage = () => {
  const { routeChoose } = useNavigateStore()
  const navigate = useNavigate()
  
  useEffect(() =>  {
    if (!localStorage.getItem('user')) {
      navigate('/')
    }
  },[])

  return (
    
      <div className={style.container}>
        <div className={style.nav}>
          <NavbarComponent/>
        </div>
        <div className={style.horizontal}>
          <div className={style.left}>
              <SidebarComponent/>
          </div>
          <div className={style.right}>
            {routeChoose === 'activity' && <ActivityPage/>}
            {routeChoose === 'chat' && <ChatPage/>}
            {routeChoose === 'quizDev' && <Quiz/>}
            {routeChoose === 'class' && <ClassPage/>}
            {routeChoose === 'quizTake' && <QuizTake/>}
            {routeChoose === 'manageAccount' && <ManageAccout/>}
            {routeChoose === 'file' && <FilePage/>}
            {routeChoose === 'friends' && <FriendsPage/>}
            
          </div>
        </div>

      </div>
    
  )
}

export default HomePage