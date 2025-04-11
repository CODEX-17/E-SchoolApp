import React, { useContext } from 'react'
import style from './Sidebar.module.css'
import { BsFillChatDotsFill } from "react-icons/bs"; 
import { RiTeamFill } from "react-icons/ri";
import { PiNotebookFill } from "react-icons/pi";
import { FaUserFriends } from "react-icons/fa";
import { NavigationContext } from '../../context/NavigationContext';
import { UserDetailContext } from '../../context/UserDetailContext';
import { AccountType, Routes } from '../../types/types';


const SidebarComponent = () => {

  const navigation = useContext(NavigationContext)
  const currentAccount = useContext(UserDetailContext)

  if (!navigation || !currentAccount) {
    return null
  }

  const { currentRoute, setCurrentRoute } = navigation

  const { userDetails } = currentAccount

  const currentAcctType = userDetails?.acctype

  interface tabsListType {
    name: string,
    icon: any,
    route: Routes,
    type: AccountType,
  }

  const tabsList: tabsListType[] = [
    {
      name: 'Class',
      icon: <RiTeamFill size={20} color='#fff'/>,
      route: 'classPage',
      type: 'General'
    },
    {
      name: 'Quiz',
      icon: <PiNotebookFill size={20} color='#fff'/>,
      route: 'quizMenu',
      type: 'Faculty'
    },
    {
      name: 'Friends',
      icon: <FaUserFriends size={20} color='#fff'/>,
      route: 'friends',
      type: 'General'
    },
    {
      name: 'Chat',
      icon: <BsFillChatDotsFill size={20} color='#fff'/>,
      route: 'chat',
      type: 'General'
    },
  ]

  return (
    <div className={style.sidebar}>
      
      <div className={style.list}>

        {
          tabsList.map((item, index) => {

            const isActived = item.route === currentRoute ? true : false

            //Restrict the menu defends on account type.
            if (currentAcctType === 'Faculty' && item.type === 'Student') {
              return null
            }else if (currentAcctType === 'Student' && item.type === 'Faculty') {
              return null
            }

            return(
              <div 
                key={index}
                className={ isActived ? style.activedGroup : style.iconGroup} 
                onClick={() => setCurrentRoute(item.route)}
              >
                {item.icon}
                <p className={ isActived ? style.activedText : style.text}>{item.name}</p>
              </div>
            )
          })
        }
  
      </div>
    </div>
  )
}

export default SidebarComponent
