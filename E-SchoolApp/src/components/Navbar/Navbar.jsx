import React, { useEffect, useState } from 'react'
import style from './Navbar.module.css';
import logo from '../../../public/assets/logo-white.png'
import titleLogo from '../../../public/assets/title.png'
import { useNavigate } from 'react-router-dom';
import { useNavigateStore } from '../../stores/useNavigateStore';
import { IoNotifications } from "react-icons/io5";
import generateFullname from '../../utils/generateFullname';
import { BsFilePost } from "react-icons/bs";
import { GiNotebook } from "react-icons/gi";
import { AiOutlineDelete } from "react-icons/ai"
import axios from 'axios';
import io from 'socket.io-client'
const socket = io.connect('http://localhost:5001')

const Navbar = () => {
  const navigate = useNavigate()

  const { updateRouteChoose } = useNavigateStore()
  const [isShowProfile, setisShowProfile] = useState(false)
  const [userImage, setUserImage] = useState(null)
  const user = JSON.parse(localStorage.getItem('user'))
  const [isShowManageAcct, setIsShowManageAcct] = useState(false)
  const [isShowNotification, setIsShowNotification] = useState(false)
  const [notificationList, setNotificationList] = useState([])
  const [isShowRedDots, setIsShowRedDots] = useState(false)

  useEffect(() => {

    //Join room as acctID will becomes roomID for notifications
    socket.emit('joinRoom', user.acctID)
    
    //Listen to add notification sockets
    socket.on('receivedNotification', (data) => {
      setIsShowRedDots(true)
      setNotificationList((oldData) => [...oldData, data])
    })
    
    if (user) {
      const acctID = user.acctID

      setUserImage('http://localhost:5001/' + user.data)

      //API get notifications
      axios.get('http://localhost:5001/notification/getNotification/' + acctID)
      .then((res) => {
        if (res.data) {
          setNotificationList(res.data)
        }
      })
      .catch((err) => console.log(err)) 
    }
    

    
  },[])

  const generateImages = (data) => {
    if (data) {
        const url = 'http://localhost:5001/'
      return url + data
    }
  }

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

  const handleDeleteAllNotification = () => {

    //API delete all notifications
    axios.post('http://localhost:5001/notification/deleteAllNotification/' + user.acctID)
    .then((res) => {
      const result = res.data
      console.log(result.message)

      //delete all notifications value in variable
      setNotificationList([])
    })
    .catch((err) => console.log(err))

  }

  const handleDeleteNotification = (notificationID) => {

    const data = {
      acctID: user.acctID,
      notificationID: notificationID,
    }

    //API delete specific notifications
    axios.post('http://localhost:5001/notification/deleteOneNotification', data)
    .then((res) => {
      const result = res.data
      console.log(result.message)

      //delete specific notifications value in variable
      setNotificationList((oldData) => {
        const newData = oldData.filter((data) => data.notificationID !== notificationID)
        return newData
      })
      
    })
    .catch((err) => console.log(err))

  }

  return (
    <div className={style.navbar}>
        <div className={style.left}>
          <img src={logo} alt="logo" width={40}/>
          <img src={titleLogo} className={style.titleLogo} alt="titleLogo" width={150} />
        </div>
        <div className={style.right}>
          <div className={style.menuTop}>
            <div className='position-relative'>
              { isShowRedDots && <div id={style.circle}>.</div> }
              <IoNotifications id={style.notif} onClick={() => {setIsShowNotification(!isShowNotification), setIsShowRedDots(false)}}/>
            </div>
            
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

          {
            isShowNotification && (
              <div id={style.notifContainer}>
                <div className={style.head}>
                  <h2 id={style.title}>Notification</h2>
                  <p onClick={handleDeleteAllNotification}>Clear All</p>
                </div>
                
                <div className={style.listNotif}>
                  {
                    notificationList.length > 0 ? (
                      notificationList.map((data) => (
                        <>
                          {data.type === 'quiz' && (
                            <div className={style.card} key={data.id}>
                              <GiNotebook size={25} color='#508D4E'/>
                              <div className={style.contentText}>
                                <h2>Quiz posted</h2>
                                <p><i>{data.date} at {data.time}</i></p>
                              </div>
                              <AiOutlineDelete size={20} color='#3E3F40' id={style.delete} title='delete notification' onClick={() => handleDeleteNotification(data.notificationID)}/>
                            </div>
                          )}

                          {data.type === 'post' && (
                            <div className={style.card} key={data.id}>
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
                            <div className={style.card} key={data.id}>
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
        
    </div>
  )
}

export default Navbar





  	