import React, { useState } from 'react'
import style from './SidebarComponent.module.css'
import { Link } from 'react-router-dom'
import { VscLayoutActivitybarLeft } from "react-icons/vsc";
import { BsFillChatDotsFill } from "react-icons/bs"; 
import { RiTeamFill } from "react-icons/ri";
import { PiNotebookFill } from "react-icons/pi";
import { AiFillFile } from "react-icons/ai";
import { useNavigateStore } from '../stores/useNavigateStore';
import { FaUserFriends } from "react-icons/fa";


const SidebarComponent = () => {
  const { updateRouteChoose, routeChoose } = useNavigateStore()
  const currentAccount = JSON.parse(localStorage.getItem('user'))

  const handleRoutes = (route) => {
    updateRouteChoose(route)
    console.log(route)
  }

  return (
    <div className={style.sidebar}>
      <div className={style.list}>
   
        <div className={ routeChoose === 'class' ? style.activedGroup : style.iconGroup} onClick={() => handleRoutes('class')}>
          <RiTeamFill className={ routeChoose === 'class' ? style.activedIcon : style.icon} size={20}/>
          <p className={ routeChoose === 'class' ? style.activedText : style.text}>Class</p>
        </div>
        
        {
          currentAccount &&
          currentAccount.acctype === 'faculty' && (
            <div className={ routeChoose === 'quizDev' ? style.activedGroup : style.iconGroup} onClick={() => handleRoutes('quizDev')}>
              <PiNotebookFill className={ routeChoose === 'quizDev' ? style.activedIcon : style.icon} size={20}/>
              <p className={ routeChoose === 'quizDev' ? style.activedText : style.text}>Quiz</p>
          </div>
          )
        }
        
        <div className={ routeChoose === 'friends' ? style.activedGroup : style.iconGroup} onClick={() => handleRoutes('friends')}>
          <FaUserFriends className={ routeChoose === 'friends' ? style.activedIcon : style.icon} size={20}/>
          <p className={ routeChoose === 'friends' ? style.activedText : style.text}>Friends</p>
        </div>

        <div className={ routeChoose === 'chat' ? style.activedGroup : style.iconGroup} onClick={() => handleRoutes('chat')}>
          <BsFillChatDotsFill className={ routeChoose === 'chat' ? style.activedIcon : style.icon} size={20}/>
          <p className={ routeChoose === 'chat' ? style.activedText : style.text}>Chat</p>
        </div>
       
        
        
        
      </div>
    </div>
  )
}

export default SidebarComponent
