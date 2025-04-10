import React, { useContext, useEffect, useState } from 'react'
import style from './Navbar.module.css';
import logo from '../../../public/assets/logo-white.png'
import titleLogo from '../../../public/assets/title.png'
import { useNavigate } from 'react-router-dom';
import { IoNotifications } from "react-icons/io5";
import { BsFilePost } from "react-icons/bs";
import { GiNotebook } from "react-icons/gi";
import { AiOutlineDelete } from "react-icons/ai"
import axios from 'axios';
import io from 'socket.io-client'
import ImageRender from '../ImageRender/ImageRender';
import { UserDetailContext } from '../../context/UserDetailContext';
import generateFullname from '../../utils/generateFullname';
import { deleteAllNotification, deleteNotification, getNotificationsByAcctID } from '../../services/notificationServices';
import { NavigationContext } from '../../context/NavigationContext';

const socket = io('http://localhost:5001')

const Navbar = () => {


  interface Notification {
    notificationID: string;
    acctID: string;
    title: string;
    data: string;
    content: string;
    date: string;
    time: string;
    type: string;
  }

  const navigate = useNavigate()

  const [isShowProfile, setisShowProfile] = useState(false)
  const [userImage, setUserImage] = useState(null)
  const [isShowManageAcct, setIsShowManageAcct] = useState(false)
  const [isShowNotification, setIsShowNotification] = useState(false)
  const [notificationList, setNotificationList] = useState<Notification[] | null>([])
  const [isShowRedDots, setIsShowRedDots] = useState(false)

  const userContext = useContext(UserDetailContext);
  const navigationContext = useContext(NavigationContext);

  if (!navigationContext || !navigationContext.setCurrentRoute) {
    throw new Error("NavigationContext is not properly initialized.");
  }

  if (!userContext || !userContext.userDetails) {
    return navigate('/')
  }

  const { userDetails } = userContext
  const { setCurrentRoute } = navigationContext;

  if (!userDetails) {
    return navigate('/')
  }

  const acctID = userDetails.acctID

  useEffect(() => {

    

    //Join room as acctID will becomes roomID for notifications
    socket.emit('joinRoom', acctID)

    //Listen to add notification sockets
    socket.on('receivedNotification', (data: any) => {
      setIsShowRedDots(true)
      setNotificationList((oldData) => [...(oldData || []), data])
    })
    
    const getData = async () => {
      try {
        
        const result = await getNotificationsByAcctID(acctID)

        if (result) {
          setNotificationList(result)
        }

      } catch (error) {
        console.log(error)
      }
    }

    getData()
    
  },[])

  // Removed duplicate declaration of userDetails

  const generateImages = (data: string) => {
    if (data) {
        const url = 'http://localhost:5001/'
      return url + data
    }
  }

  const handleLogout = () => { 
    setCurrentRoute('class')
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

  const handleManageAccount = (route: string) => {
    setCurrentRoute(route)
    setIsShowManageAcct(!isShowManageAcct)
  }

  const handleDeleteAllNotification = async (notificationID: string) => {

    try {
      
      const result = await deleteAllNotification(notificationID)

      if (result) {
        console.log(result)

        //delete all notifications value in variable
        setNotificationList([])
      }

      
    } catch (error) {
      console.log(error)
    }

  }

  const handleDeleteNotification = async (notificationID: string) => {

    const data = {
      acctID: userDetails.acctID,
      notificationID: notificationID,
    }

    try {
      
      const result = await deleteNotification(data)

      if (result) {
        console.log(result)

        //delete specific notifications value in variable
        setNotificationList((oldData) => {
          const newData = (oldData || []).filter((data) => data.notificationID !== notificationID)
          return newData
        })
      }

      
    } catch (error) {
      console.log(error)
    }


    

  }

  return (
    <div className={style.navbar}>

        <div className='d-flex gap-2 p-2 align-items-center'>
          <img src={logo} alt="logo" width={40}/>
          <img src={titleLogo} className={style.titleLogo} alt="titleLogo" width={150} />
        </div>
        <div className='d-flex gap-2 p-2 align-items-center'>
          <div className='position-relative'>
            { isShowRedDots && <div id={style.circle}>.</div> }
            <IoNotifications id={style.notif} onClick={() => {setIsShowNotification(!isShowNotification), setIsShowRedDots(false)}}/>
          </div>
          <div id={style.profile} onClick={handleProfile}>
            <ImageRender image={userDetails?.fileID}/>
          </div>
          
        </div>

          {
            isShowProfile && (
              <div id={style.dropDown}>
                <div className={style.horizontal}>
                    <span className={style.profileIcon}>
                      <ImageRender image={userDetails?.fileID}/>
                    </span>
                    <div className={style.vertical}>
                      <p>Name:</p>
                      <h1>{generateFullname()}</h1>
                      <p>Email:</p>
                      <h2>{userDetails?.email}</h2>
                    </div>
                </div>
                <div className='d-flex w-100 gap-2 align-items-center justify-content-center mt-2'>
                    <button className={style.btnManageAcct} onClick={() => handleManageAccount('manageAccount')}>Manage Account</button>
                    <button className={style.btnLogout} onClick={handleLogout}>Sign out</button>
                </div>
                  
              </div>
            )
          }

          {
            isShowNotification && (
              <div id={style.notifContainer}>
                <div className={style.head}>
                  <h2 id={style.title}>Notification</h2>
                  <p onClick={() => handleDeleteAllNotification(acctID)}>Clear All</p>
                </div>
                
                <div className={style.listNotif}>
                  {
                    notificationList ? (
                      notificationList.map((data, index) => (
                        <>
                          {data.type === 'quiz' && (
                            <div className={style.card} key={index}>
                              <GiNotebook size={25} color='#508D4E'/>
                              <div className={style.contentText}>
                                <h2>Quiz posted</h2>
                                <p><i>{data.date} at {data.time}</i></p>
                              </div>
                              <AiOutlineDelete size={20} color='#3E3F40' id={style.delete} title='delete notification' onClick={() => handleDeleteNotification(data.notificationID)}/>
                            </div>
                          )}

                          {data.type === 'post' && (
                            <div className={style.card} key={index}>
                              <BsFilePost size={25} color='#EB5B00'/>
                              <div className={style.contentText}>
                                <h2>{data.title}</h2>
                                <p style={{ fontSize: '9pt' }}>posted</p>
                                <p><i>{data.date} at {data.time}</i></p>
                              </div>
                              <AiOutlineDelete size={20} color='#3E3F40' id={style.delete} title='delete notification' onClick={() => handleDeleteNotification(data.notificationID)}/>
                            </div>
                          )}

                          {data.type === 'profile' && (
                            <div className={style.card} key={index}>
                              <img src={generateImages(data.data)} alt="profile pic"/>
                              <div className={style.contentText}>
                                <h2>{data.title}</h2>
                                <p style={{ fontSize: '9pt' }}>{data.content}</p>
                                <p><i>{data.date} at {data.time}</i></p>
                              </div>
                              <AiOutlineDelete size={20} color='#3E3F40' id={style.delete} title='delete notification' onClick={() => handleDeleteNotification(data.notificationID)}/>
                            </div>
                          )}
                        </>
                      ))
                    ) : (
                      <p>No notification.</p>
                    )
                  }

                </div>
              </div>
            )
          }
          
        
    </div>
  )
}

export default Navbar





  	