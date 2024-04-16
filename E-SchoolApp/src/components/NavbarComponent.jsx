import React, { useEffect, useState } from 'react'
import style from './NavBarComponent.module.css';
import logo from '../assets/logo-white.png'
import titleLogo from '../assets/title.png'
import { useNavigate, Link } from 'react-router-dom';
import { useNavigateStore } from '../stores/useNavigateStore';
import { IoNotifications } from "react-icons/io5";
import generateImageByImageID from '../utils/generateImageByImageID';
import generateFullname from '../utils/generateFullname';
import axios from 'axios';

const NavbarComponent = () => {
  const navigate = useNavigate()

  const { updateRouteChoose } = useNavigateStore()
  const [isShowProfile, setisShowProfile] = useState(false)
  const [userImage, setUserImage] = useState(null)
  const user = JSON.parse(localStorage.getItem('user'))
  const [isShowManageAcct, setIsShowManageAcct] = useState(false)

  useEffect(() => {
    
    if (user) {
      const acctID = user.acctID

      axios.get('http://localhost:5001/images/getImagesByImageID/' + acctID)
      .then((res) => {
          const result = res.data
          const url = 'http://localhost:5001/'
          setUserImage(url + result[0].data)
      })
      .catch((err) => console.log(err)) 
    }
    
    
  },[])

  const handleLogout = () => { 
    updateRouteChoose('class')
    localStorage.clear()
    navigate('/')
  }

  const handleProfile = () => {
    if (isShowProfile) {
      setisShowProfile(false)
    }else {
      setisShowProfile(true)
    }
    
  }

  const handleManageAccount = (route) => {
    updateRouteChoose(route)
    setIsShowManageAcct(!isShowManageAcct)
  }

  return (
    <div className={style.navbar}>
        <div className={style.left}>
          <img src={logo} alt="logo" width={40}/>
          <img src={titleLogo} className={style.titleLogo} alt="titleLogo" width={150} />
        </div>
        <div className={style.right}>
          <div className={style.menuTop}>
            <IoNotifications id={style.notif}/>
            <img src={userImage}  alt="profile" id={style.profile} onClick={handleProfile}/>
          </div>
          {
            isShowProfile && (
              <div id={style.dropDown}>
                <div className={style.horizontal}>
                    <span className={style.profileIcon}>
                      <img src={userImage} id={style.profilePic} alt=""/>
                    </span>
                    <div className={style.vertical}>
                      <p>Name:</p>
                      <h1>{generateFullname()}</h1>
                      <p>Email:</p>
                      <h2>{user?.email}</h2>
                    </div>
                </div>
                <div className='d-flex w-100 gap-2 align-items-center justify-content-center mt-2'>
                    <button className={style.btnManageAcct} onClick={() => handleManageAccount('manageAccount')}>Manage Account</button>
                    <button className={style.btnLogout} onClick={handleLogout}>Sign out</button>
                </div>
                  
              </div>
            )
          }
          
        </div>
        
    </div>
  )
}

export default NavbarComponent





  	