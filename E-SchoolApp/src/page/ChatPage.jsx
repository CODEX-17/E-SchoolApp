import React, { useEffect, useState, useRef } from 'react'
import style from './ChatPage.module.css'
import sample from '../assets/sample.jpg'
import { MdCircle } from "react-icons/md"
import { FaCirclePlus } from "react-icons/fa6"
import { IoSend } from "react-icons/io5";
import io from 'socket.io-client'
import { useMessageStore } from '../stores/useMessageStore'
import { LuArrowBigDownDash } from "react-icons/lu";
import { useFriendStore } from '../stores/useFriendStore'
import { useImageStore } from '../stores/useImageStore'
import { useAccountStore } from '../stores/useAccountsStore'
import { ProgressBar } from  'react-loader-spinner';
const socket = io.connect('http://localhost:5001')


const ChatPage = () => {

  const [messageList, setmessageList] = useState([])
  const [message, setmessage] = useState()
  const currentUser = JSON.parse(localStorage.getItem('user'))
  const [friends, setfriends]= useState()
  const [friendsList, setfriendsList] = useState([])
  const [accounts, setaccounts] = useState()
  const [images, setimages] = useState()
  const [selectedFriend, setselectedFriend] = useState(null)
  const [sendedMessage, setsendedMessage] = useState(null)
  const [currentReceiverName, setcurrentReceiverName] = useState(null)
  const [currentRoomID, setcurrentRoomID] = useState(null)
  const [uniqueID, setuniqueID] = useState(null)
  const chatContainerRef = useRef(null)
  const [lastMessage, setlastMessage] = useState(null)
  const [onlineList, setonlineList] = useState([])
  const activeList = JSON.parse(localStorage.getItem('activeList'))

  const { getMessages, saveMessages } = useMessageStore()
  const { getFriend } = useFriendStore()
  const { getImages } = useImageStore()
  const { getAccounts } = useAccountStore()

  const [showLoading, setshowLoading] = useState(true)


  let currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})
  let currentDate = new Date().toDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric',
          weekday: 'short'
  })

  useEffect(() => {

    socket.on('onlinePerson', (data) => {
        socket.emit('insertOnline', currentUser.acctID)
    })

    // socket.on('sendOnlineList', (list) => {
    //   const value = new Set(list)
    //   setTimeout(() => {
    //     alert(value)
    //     console.log(value)
    //     setonlineList(value)
    //   }, 2000);
      
    // })

    socket.on('isTyping', (data) => {
      if (data) {
        console.log('typing...')
      }else {
        console.log('nott...')
      }
      
    })

    getMessages()
    getFriend()
    getImages()
    getAccounts()
    refreshData()
    
  },[])

  useEffect(() => {
    
    socket.on('joinedRoom', (message) => {
      console.log(message)
    })

    socket.on('mess', (dataObj) => {
      setmessageList((old) => [...old, dataObj])
    })

  },[]) 

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = '9999999999';
    }

  };

  const refreshData = () => {
    getMessages()
    getFriend()
    getImages()
    getAccounts()

    setshowLoading(true)

    setTimeout(() => {
      const images = JSON.parse(localStorage.getItem('images')) || null
      const accounts = JSON.parse(localStorage.getItem('accounts')) || null
      const friends = JSON.parse(localStorage.getItem('friends')) || null
      const message = JSON.parse(localStorage.getItem('messages')) || null

      setimages(images)
      setaccounts(accounts)
      setfriends(friends)
      setmessage(message)

      const currentFriends = friends.filter((friend) => friend.acctID === currentUser.acctID)
      setfriendsList(currentFriends)

      setshowLoading(false)
    }, 3000)
    
  }

  const filterCurrentMessage = (receiver, name) => {
    const conversations = message.filter(
        (message) =>
            (message.messageSender === currentUser.acctID &&
                message.messageReceiver === receiver) ||
            (message.messageReceiver === currentUser.acctID &&
                message.messageSender === receiver)
    );
    
    setcurrentReceiverName(name);
    setselectedFriend(receiver);
   
    const size = conversations.length

    setlastMessage(conversations[size-1])
    console.log('last:',conversations[size-1])

    if (conversations.length > 0 && conversations[0].roomID) {
        setcurrentRoomID(conversations[0].roomID);
        socket.emit('joinRoom', conversations[0].roomID, currentUser.firstname);
    } else {
        const result = generateUniqueId();
        setuniqueID(result);
        setcurrentRoomID(result);
        socket.emit('joinRoom', result, currentUser.firstname);
    }

    setmessageList((prevMessage) => [...prevMessage, ...conversations]);
    scrollToBottom()
  };

  // const filterCurrentMessage = (receiver, name) => {
  //     const conversations = 
  //       message.filter((message) => 
  //         (message.messageSender === currentUser.acctID && message.messageReceiver === receiver)
  //          || 
  //         (message.messageReceiver === currentUser.acctID && message.messageSender === receiver)
  //       )

  //     setcurrentReceiverName(name)
  //     setmessageList(conversations)
  //     setselectedFriend(receiver)
  //     if (conversations[0].roomID) {
  //       setcurrentRoomID(conversations[0].roomID)
  //       socket.emit('joinRoom', conversations[0].roomID)
  //     }else {
  //       const result = generateUniqueId()
  //       setuniqueID(result)
  //       setcurrentRoomID(result)
  //       socket.emit('joinRoom', result)
  //     }

      
  // }

  

  const generateUniqueId = () => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const length = 8
    let result = ''
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length)
        result += charset.charAt(randomIndex)
    }
    return result
  }

  const generateImages = (friendAcctID) => {
    const selectedAct = accounts.filter((act) => act.acctID === friendAcctID).map((act) => act.imageID)
    const userImages = images.filter((img) => img.imageID === selectedAct[0]).map((img) => img.data)
      if (userImages) {
        const image = userImages[0]
        const url = 'http://localhost:5001/'
        return url+image
      }

      return sample
  }

  const handleSubmit = (e) => {
      e.preventDefault()
      scrollToBottom()
      const dataObj = {
        roomID: currentRoomID,
        messageContent:sendedMessage,
        messageSender: currentUser.acctID,
        messageReceiver: selectedFriend,
        date: currentDate,
        time: currentTime,
      }

      socket.emit('sendMessage', currentRoomID, dataObj);
      saveMessages(dataObj)
      // socket.emit('message', sendedMessage);
      // socket.emit('hello', 1, '2', { 3: '4', 5: Uint8Array.from([6]) })
      // socket.emit('friend', message);
  }

  const handleWrintingMessage = (data) => {
    if (data) {
      socket.emit('typing', currentRoomID, true)
    }
    setsendedMessage(data)
    scrollToBottom()
  }


  return (
    <div className={style.container}>
      
         {
          showLoading && (
              <div className={style.exitTrapNotif}>
                  <ProgressBar
                      id={style.progressBar}
                      visible={true}
                      height="80"
                      width="80"
                      color="green"
                      barColor= '#3E3F40'
                      borderColor= '#099AED'
                      ariaLabel="progress-bar-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                  />
                  <p>Loading...</p>
              </div>
          )
      }
      
      <div className={style.content}>
        <div className={style.leftBar}>
            <h2>Chat</h2>
            <div className={style.chatList}>
              {
                friendsList.map((friend, index) => (
                  <div className={selectedFriend === friend.friendAcctID ? style.cardActive : style.card } key={index} onClick={() => filterCurrentMessage(friend.friendAcctID, friend.fullname)}>
                    <img src={generateImages(friend.friendAcctID)} className={style.circle} alt="pic" />
                    <div className={style.vertical}>
                      <h2>{friend.fullname}</h2>
                    </div>
                    <MdCircle color='yellowgreen' id={style.activeLight}/>
                  </div>
                ))
              }
                
               
                
            </div>
        </div>
        <div className={style.rightBar}>
         {
          selectedFriend ? (
              <>
              <div className={style.header}>
                <img src={generateImages(selectedFriend)} alt="dsd" id={style.headerPic}/>
                <div className={style.vertical}>
                  <h2>{currentReceiverName ? currentReceiverName :'Name'}</h2>
                  <p>Active now <MdCircle color='yellowgreen' id={style.activeLightHeader}/></p>
                </div>
                <LuArrowBigDownDash
                    id={style.scrollDown}
                    onClick={() =>scrollToBottom()}
                    title='Scroll Down'
                />
              </div>
              <div className={style.body}>
                <div className={style.messageScreenContainer} >
                  {
                    messageList.length > 0 ? (
                      <div className={style.messageScreen} ref={chatContainerRef}>
                      {
                        messageList.map((message, index) => (

                          message.messageSender === currentUser.acctID ? (
                            <div className={style.ownChatDiv} key={index}>
                              <div className={style.bubbleChatContainer}>
                                <p>{message.time}</p>
                                <div className={style.bubbles}>{message.messageContent}</div>
                              </div>
                            </div>
                          ) : (
                            <div className={style.receiverChatDiv} key={index}>
                              <div className={style.bubbleChatContainer}>
                                <p>{message.time}</p>
                                <div className={style.senderbubbles}>{message.messageContent}</div>
                              </div>
                            </div>
                          )

                        )) 
                      }
                      
                    </div>

                    ) : (
                      <div className='h-100 d-flex align-items-center justify-content-center'>
                        <p>No Conversations</p>
                      </div>
                    )
                  }
                  
                </div>
                <form action="" onSubmit={handleSubmit} className={style.formControl}>
                  <div className={style.botPanel}>
                      <FaCirclePlus id={style.plusSign} />
                      <textarea required value={sendedMessage} onChange={(e) => handleWrintingMessage(e.target.value)}>
                      </textarea>
                      <IoSend id={style.sendSign} type='submit' onClick={handleSubmit}/>
                  </div>
                  </form>
              </div>
              </>
          ) : (
            <div className='h-100 d-flex align-items-center justify-content-center'>
              <p>Select Conversation.</p>
            </div>
          )

         }
          
        </div>
      </div>
      
    </div>
  )
}

export default ChatPage