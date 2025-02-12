import React, { useContext } from 'react'
import style from './Sidebar.module.css'
import { BsFillChatDotsFill } from "react-icons/bs"; 
import { RiTeamFill } from "react-icons/ri";
import { PiNotebookFill } from "react-icons/pi";
import { FaUserFriends } from "react-icons/fa";
import { NavigationContext } from '../../context/NavigationContext';


const SidebarComponent = () => {
  const { setCurrentRoute, currentRoute } = useContext(NavigationContext)
  const currentAccount = JSON.parse(localStorage.getItem('user'))

  return (
    <div className={style.sidebar}>
      <div className={style.list}>
   
        <div className={ currentRoute === 'class' ? style.activedGroup : style.iconGroup} onClick={() => setCurrentRoute('class')}>
          <RiTeamFill className={ currentRoute === 'class' ? style.activedIcon : style.icon} size={20}/>
          <p className={ currentRoute === 'class' ? style.activedText : style.text}>Class</p>
        </div>
        
        {
          currentAccount &&
          currentAccount.acctype === 'faculty' && (
            <div className={ currentRoute === 'quizMenu' ? style.activedGroup : style.iconGroup} onClick={() => setCurrentRoute('quizMenu')}>
              <PiNotebookFill className={ currentRoute === 'quizMenu' ? style.activedIcon : style.icon} size={20}/>
              <p className={ currentRoute === 'quizMenu' ? style.activedText : style.text}>Quiz</p>
          </div>
          )
        }
        
        <div className={ currentRoute === 'friends' ? style.activedGroup : style.iconGroup} onClick={() => setCurrentRoute('friends')}>
          <FaUserFriends className={ currentRoute === 'friends' ? style.activedIcon : style.icon} size={20}/>
          <p className={ currentRoute === 'friends' ? style.activedText : style.text}>Friends</p>
        </div>

        <div className={ currentRoute === 'chat' ? style.activedGroup : style.iconGroup} onClick={() => setCurrentRoute('chat')}>
          <BsFillChatDotsFill className={ currentRoute === 'chat' ? style.activedIcon : style.icon} size={20}/>
          <p className={ currentRoute === 'chat' ? style.activedText : style.text}>Chat</p>
        </div>
       
        
        
        
      </div>
    </div>
  )
}

export default SidebarComponent
