import React, { useEffect, useState, useRef } from 'react'
import style from './ChatPage.module.css'
import sample from '../assets/sample.jpg'
import { MdCircle } from "react-icons/md"
import { FaCirclePlus } from "react-icons/fa6"
import { FaMessage } from "react-icons/fa6"
import { FaCommentAlt } from 'react-icons/fa';
import { IoSend } from "react-icons/io5";
import io from 'socket.io-client'
import { useMessageStore } from '../stores/useMessageStore'
import { LuArrowBigDownDash } from "react-icons/lu";
import { useFriendStore } from '../stores/useFriendStore'
import { useImageStore } from '../stores/useImageStore'
import { useAccountStore } from '../stores/useAccountsStore'
import { ProgressBar } from  'react-loader-spinner';
import { BiExit } from "react-icons/bi";
import axios from 'axios'
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
  const [showFriends, setShowFriends] = useState(false)
  const [uniqueID, setuniqueID] = useState(null)
  const chatContainerRef = useRef(null)
  const [lastMessage, setlastMessage] = useState(null)
  const [onlineList, setonlineList] = useState([])
  const activeList = JSON.parse(localStorage.getItem('activeList'))

  const { getMessages, saveMessages } = useMessageStore()

  const [showLoading, setshowLoading] = useState(false)
  const [isShowTypingDisplay, setIsShowTypingDisplay] = useState(false)
  const [showNewMessageModal, setShowNewMessageModal] = useState(false)
  const [resultList, setResultList] = useState([])


  let currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})
  let currentDate = new Date().toDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric',
          weekday: 'short'
  })

  useEffect(() => {

    //Socket for add account to Online
    socket.emit('addOnlineList', currentUser.acctID)

    // Emit an event to get the current online list on component mount
    socket.emit('viewOnline')

    // Listen for online list updates
    socket.on('getOnlineList', (data) => {
        console.log("listOfOnline:", data)
        setonlineList(data)
    });

    //Listen to ReceivedMessages
    socket.on('receivedMessage', (data) => {

        //API to add message in the database
        axios.post('http://localhost:5001/message/addMessages', data)
        .then((res) => {
          const result = res.data
          console.log(result.message)
        })
        .catch((err) => console.log(err))

        //add messages in the variables
        setmessageList((old) => [...old, data])

        //auto scroll
        setTimeout(() => {
          chatContainerRef.current.scrollTop = '9999999999'
        }, 1000);
        
    })

    // Listen for dicounnect acct
    socket.on('disconnectAcct', (data) => {
      const filter = onlineList.filter((online) => online !== data)
      setonlineList(filter)
    });

    // Listen for typing
    socket.on('notifTyping', (status) => {
      if (status) {
        setIsShowTypingDisplay(status)
        chatContainerRef.current.scrollTop = '9999999999'

        setTimeout(() => {
          setIsShowTypingDisplay(false)
        }, 3000);
      }
    });

    //GET FRIENDS BY ACCTID
    axios.get('http://localhost:5001/friends/getFriendsByAcctID/' + currentUser.acctID)
    .then((res) => {
      setfriendsList(res.data)
      console.log("Friends:", res.data)
    })
    .catch((err) => console.log(err))

    //GET FRIENDS BY ACCTID
    axios.get('http://localhost:5001/message/getMessageByAcctID/' + currentUser.acctID)
    .then((res) => {
      setmessage(res.data)
      console.log("message:", res.data)
    })
    .catch((err) => console.log(err))
    
  },[])



  const filterCurrentMessage = (data) => {
    const friendDetails = data
    const receiver = friendDetails.friendAcctID

    console.log("selected fri", friendDetails)

    console.log(receiver)
    console.log(currentUser.acctID)

    // Function to parse date and time
    const parseDateTime = (date, time) => {
      const [timePart, modifier] = time.split(' ');
      let [hours, minutes] = timePart.split(':');
      if (modifier === 'PM' && hours !== '12') {
        hours = parseInt(hours, 10) + 12;
      }
      if (modifier === 'AM' && hours === '12') {
        hours = '00';
      }
      return new Date(`${date} ${hours}:${minutes}:00`);
    };

    const conversations = message.filter(
        (message) =>
            (message.messageSender === currentUser.acctID &&
                message.messageReceiver === receiver) ||
            (message.messageReceiver === currentUser.acctID &&
                message.messageSender === receiver)
    )

    if (conversations.length > 0) {
        // Sorting the messages array
        conversations.sort((a, b) => {
          const dateTimeA = parseDateTime(a.date, a.time)
          const dateTimeB = parseDateTime(b.date, b.time)
          return dateTimeA - dateTimeB
        })

        //Get the roomID
        const roomID = conversations[0].roomID
        setcurrentRoomID(roomID)

        //Join socket in roomID
        socket.emit("joinRoom", roomID)
    }
  
    setcurrentReceiverName(friendDetails.fullname)
    setselectedFriend(friendDetails)
 
    // if (conversations.length > 0 && conversations[0].roomID) {
    //     setcurrentRoomID(conversations[0].roomID);
    //     socket.emit('joinRoom', conversations[0].roomID, currentUser.firstname);
    // } else {
    //     const result = generateUniqueId();
    //     setuniqueID(result);
    //     setcurrentRoomID(result);
    //     socket.emit('joinRoom', result, currentUser.firstname);
    // }

    setmessageList(conversations)


    //auto scroll down
    setTimeout(() => {
      chatContainerRef.current.scrollTop = '9999999999'
    }, 500);
    

  }

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

  const generateImages = (data) => {
    if (data) {
        const url = 'http://localhost:5001/'
      return url + data
    }
  }

  const handleSubmit = (e) => {
      e.preventDefault()

      const dataObj = {
        messageID: generateUniqueId(),
        roomID: currentRoomID,
        messageContent:sendedMessage,
        messageSender: currentUser.acctID,
        messageReceiver: selectedFriend.friendAcctID,
        date: currentDate,
        time: currentTime,
      }

      socket.emit('sendMessage', currentRoomID, dataObj);
  }

  const handleWrintingMessage = (data) => {
    if (data) {
      socket.emit('typing', currentRoomID)
    }
    setsendedMessage(data)
  }

  const handleSearchFriend = (e) => {
    e.preventDefault()
    const search = e.target.value.trim().toLowerCase(); // Trim and convert to lowercase
    const charLength = search.length;
    let list = [];
  
    if (search) {
      for (let i = 0; i < friendsList.length; i++) {
        const texts = friendsList[i].fullname.substring(0, charLength).toLowerCase(); // Convert to lowercase
  
        if (search === texts) {
          list.push(friendsList[i]);
        }
      }
    }

    setResultList(list);
  }

  const handleCheckOnline = (data) => {
    console.log("acct-:", data)

    if (data) {
      if (onlineList.includes(data)) {
        console.log("online-:", onlineList)
        return "yellowGreen"
      }else {
        return "gray"
      }
    }
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
          <div className='d-flex w-100 align-items-center justify-content-between'>
            <h2>Chat</h2>
            <FaMessage 
              size={20}
              title='New Message'
              style={{ cursor: 'pointer' }}
              onClick={() => setShowFriends(!showFriends)}
            />
          </div>
            
            <div className={style.chatList}>
              {
                friendsList.map((friend, index) => (
                  <div className={selectedFriend === friend.friendAcctID ? style.cardActive : style.card } key={index} onClick={() => filterCurrentMessage(friend)}>
                    <img src={generateImages(friend.data)} className={style.circle} alt="pic" />
                    <div className={style.vertical}>
                      <h2>{friend.fullname}</h2>
                    </div>
                    <MdCircle color={handleCheckOnline(friend.friendAcctID)} id={style.activeLight}/>
                  </div>
                ))
              }
                
            </div>
        </div>
        <div className={style.rightBar}>

        {
          showNewMessageModal && (
            <div className={style.newMessModal}>
              <div className={style.headContainer}>
                <BiExit id={style.exitIcons} title='close' onClick={() => setShowNewMessageModal(false)}/>
                <img src={generateImages(selectedFriend.data)} alt="profile picture" />
                <h1>{selectedFriend.fullname}</h1>
              </div>
              <div className='d-flex justify-content-between mt-2'>
                <textarea name="" id="" placeholder='Send message...'></textarea>
                <div id={style.sendIcons}>
                  <IoSend size={19}/>
                </div>
              </div>
            </div>
          )
        }

        {
          showFriends ? (
            <div className={style.friendsContainer}>
              <h1>New Message</h1>
              <input type='text' placeholder='Search friend...' onChange={handleSearchFriend}/>
              <div className={style.searchListContainer}>
                <h2>Search result:</h2>
                <div className={style.searchList}>
                  {
                    resultList.length > 0 && (
                      <div className={style.cardFriend} onClick={() => {setShowNewMessageModal(true), setselectedFriend(resultList[0])} }>
                        <img className={style.circle} src={generateImages(resultList[0].data)} alt="pic" />
                        <h2>{resultList[0].fullname}</h2>
                      </div>
                    )
                  }
                  
                </div>
              </div>
            </div>
          ) : (
              selectedFriend ? (
                  <>
                  <div className={style.header}>
                    <img src={generateImages(selectedFriend.data)} alt="dsd" id={style.headerPic}/>
                    <div className={style.vertical}>
                      <h2>{currentReceiverName ? currentReceiverName :'Name'}</h2>
                      <p>{handleCheckOnline(selectedFriend.friendAcctID) === 'gray' ? 'Offline' : 'Active now'} <MdCircle color={handleCheckOnline(selectedFriend.friendAcctID)} id={style.activeLightHeader}/></p>
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
                                    <p>{message.date} ({message.time})</p>
                                    <div className={style.bubbles}>{message.messageContent}</div>
                                  </div>
                                </div>
                              ) : (
                                <div className={style.receiverChatDiv} key={index}>
                                  <div className={style.bubbleChatContainer}>
                                    <p>{message.date} ({message.time})</p>
                                    <div className={style.senderbubbles}>{message.messageContent}</div>
                                  </div>
                                </div>
                              )

                            )) 
                          }

                          {
                            isShowTypingDisplay && (
                              <div className={style.typingContainer}>
                                <p>{currentReceiverName} is typing...</p>
                              </div>
                            )
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
                          <textarea required value={sendedMessage} placeholder='Aa' onChange={(e) => handleWrintingMessage(e.target.value)}>
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
          )
        }

 
          
        </div>
      </div>
      
    </div>
  )
}

export default ChatPage