import React, { useEffect, useState } from 'react';
import style from './FriendsPage.module.css'
import { IoPersonAdd } from "react-icons/io5";
import { AiOutlineUserDelete } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import notifSound from '../assets/sound/notif.mp3';
import erroSound from '../assets/sound/error.mp3';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThreeDots } from  'react-loader-spinner';
import axios from 'axios';
import io from 'socket.io-client'
const socket = io.connect('http://localhost:5001')

const CountdownTimer = () => {

  const notif = new Howl({ src: [notifSound]})
  const errSound = new Howl({ src: [erroSound]})

  const [userAccount, setuserAccount] = useState(JSON.parse(localStorage.getItem('user')))
  const [resultFriends, setresultFriends] = useState([])
  const [showLoading, setshowLoading] = useState(true)

  //Variable for fetching data from database
  const [friendList, setfriendList] = useState(null)
  const [suggestedList, setSuggestedList] = useState(null)

  let time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})
  let date = new Date().toDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    weekday: 'short' 
 })

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

  useEffect(() => {
    setshowLoading(true)
    getDatas()
  },[])

  //Generate fullname
  const generateFullName = (firstName, middlename, lastName) => {
    if (firstName && lastName && middlename) {
      return firstName + ' ' + middlename.charAt(0) + '. ' + lastName
    }else {
      console.error('not complete details')
    }
  }


  const getDatas = () => {
    axios.get('http://localhost:5001/friends/getFriendsByAcctID/' + userAccount.acctID)
    .then((res) => {
       const friends = res.data
       console.log('friends:', friends)
       setfriendList(friends)

       if (friends) {
          axios.get('http://localhost:5001/accounts/getAccounts')
          .then((res) => {
            const accounts = res.data
            console.log('accounts:', accounts)

              let duplicate = false
              let suggetedFriends = []

            //Loop accounts
            for (let i = 0; i < accounts.length; i++) {
              const acctID = accounts[i].acctID
              
              //Loop friendsList to see if this current acctID is existing
              for (let x = 0; x < friends.length; x++) {
                const friendAcctID = friends[x].friendAcctID;
        

                //It will true when this acctID is existing
                if (friendAcctID === acctID) {
                  duplicate = true
                }
              }

              //If acctID is unique it will store in suggested variable
              if (!duplicate && acctID !== userAccount.acctID) {

                suggetedFriends.push({
                  acctID: userAccount.acctID,
                  friendAcctID: accounts[i].acctID,
                  fullname: generateFullName(accounts[i].firstname, accounts[i].middlename ,accounts[i].lastname),
                  imageID: accounts[i].imageID,
                  data: accounts[i].data,
                })

                duplicate = false
              }else {
                duplicate = false
              }

            }

              console.log('suggetedFriends', suggetedFriends)
              setSuggestedList(suggetedFriends)

            //After all process done the loading will disabled
            
            setshowLoading(false)

          })
          .catch((err) => console.log(err))
       }
        
    })
    .catch((err) => console.log(err))
  }

 
  //Generate filepath using filename
  const generatePicture = (fileName) => {
    if (fileName) {
      const url = 'http://localhost:5001/'
      return url + fileName
    }else {
      console.error('no file name')
    }
  }

  const notify = (message, state) => {
    console.log(message);
     if (state === 'err') {
        errSound.play()
        toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
     }
    else if (state ==='success') {
        notif.play()
        toast.success(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    
  }
  
  const handleAddFriend = (data) => {

    if (data) {
      const newFriendData = data

      console.log("process data:", data)

      axios.post('http://localhost:5001/friends/addFriends', newFriendData)
      .then((res) => {
          const result = res.data
          const message = result.message

          //Add to variable friendList
          setfriendList((oldData) => [...oldData, newFriendData])

          //Remove from variable suggestedFriendList
          const filter = suggestedList.filter((data) => data.friendAcctID !== newFriendData.friendAcctID)
          setSuggestedList(filter)

          //Remove from variable resultFriendList
          const filterResult = resultFriends.filter((data) => data.friendAcctID !== newFriendData.friendAcctID)
          setresultFriends(filterResult)

          //After all the process it will notify
          notify(message, 'success')
      })
      .then((err) => console.error(err))

 

      const obj = {
        notificationID: generateUniqueId(),
        acctID: newFriendData.friendAcctID,
        title: generateFullName(userAccount.firstname, userAccount.middlename, userAccount.lastname),
        data: userAccount.data,
        content: 'added you as a friend.',
        date: date, 
        time: time,
        type: 'profile',
      }

      //API add notification
      axios.post('http://localhost:5001/notification/addNotification', obj)
      .then((res) => {
        const result = res.data
        console.log(result.message)

        socket.emit('addNotification', newFriendData.friendAcctID, obj)
      })
      .catch((err) => console.log(err))

    }else {
      console.log('no data received')
    }
     
  }

  const handleUnfriend = (data, index) => {
    console.log(index)
     if (data) {
        const friendData = data
        const currentIndex = index

        const params = {
          friendAcctID: friendData.friendAcctID,
          acctID: friendData.acctID
        }

        axios.delete('http://localhost:5001/friends/deleteFriends', { data: params })
        .then((res) => {
            const result = res.data
            const message = result.message

             //Remove from variable friendList
             const filter = friendList.filter((data, index) => index !== currentIndex)
             setfriendList(filter)
             
             //Add to variable suggestedFriendList
             setSuggestedList((oldData) => [...oldData, friendData])

             //After all the process it will notify
             notify(message, 'success')
        })
        .catch((err) => console.error(err))
    
     }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const search = e.target.value.trim(); // Trim to remove leading/trailing whitespace
    const charLength = search.length;
    let resultList = [];

    if (search) {
        for (let i = 0; i < suggestedList.length; i++) {
            console.log(suggestedList)
            const fullname = suggestedList[i].fullname.substring(0, charLength);

            if (fullname.toUpperCase() === search.toUpperCase()) {
                resultList.push(suggestedList[i]);
            }
        }
    } else {
        // If search is empty, you might want to reset the resultList
        resultList = [];
    }

    setresultFriends(resultList);
};


  
  return (
    <div className={style.container}>

      {
          showLoading ? (
              <div className={style.exitTrapNotif}>
                  <ThreeDots
                    visible={true}
                    height="80"
                    width="80"
                    color="#099AED"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    />
                  <p>Generating friends</p>
              </div>
          ) : (
            <>
              <ToastContainer/>
                <div className={style.left}>
                  <div className='d-flex justify-content-between'>
                    <h2>Friend List</h2>
                  </div>
                  <div className={style.listFriends}>
                    {
                      friendList ? (
                        friendList.map((friend, index) => (
                          <div className={style.cardFriend} key={index}>
                              <img src={generatePicture(friend.data)} alt="profile" id={style.profile}/>
                              <h2>{friend.fullname}</h2>
                              <AiOutlineUserDelete id={style.btnAdd} title='unfriend' onClick={() => handleUnfriend(friend, index)}/>
                          </div>
                        ))
                      ) : (
                        <p>No friend</p>
                      )
                    }

                  </div>
                </div>
                <div className={style.right}>
                  <div className={style.searchHead}>
                      <h2>ADD FRIEND</h2>
                      <div className='d-flex gap-1 mt-2'>
                        <input type="text" id={style.inputSearch} placeholder='Search friend...' onChange={handleSearch}/>
                        <button><FaSearch/></button>
                      </div>
                    </div>
                    <div className={style.resultBox}>
                      <h2>Result:</h2>
                      <div className={style.listFriends}>
                        {
                          resultFriends.map((friend, index) => (
                            <div className={style.card}>
                              <img src={generatePicture(friend.data)} alt="" id={style.profile}/>
                              <h2>{friend.fullname}</h2>
                              <IoPersonAdd id={style.btnAdd} title='add friend' onClick={() => handleAddFriend(friend)}/>
                          </div>
                          ))
                        }

                      </div>
                    </div>
                    <div className={style.resultBox}>
                      <h2>Suggest:</h2>
                      <div className={style.listFriends}>
                        {
                          suggestedList ?
                            suggestedList.map((acct, index) => (
                              <div className={style.card} key={index}>
                                <img src={generatePicture(acct.data)} alt="profile" id={style.profile}/>
                                <h2>{acct.fullname}</h2>
                                <IoPersonAdd id={style.btnAdd} title='add friend' onClick={() => handleAddFriend(acct)}/>
                            </div>
                            ))
                          : <p>No accounts.</p>
                        }
                        

                      </div>
                    </div>
                  
                </div>
            </>
          )
      }

      
    </div>
  );
};

export default CountdownTimer;
