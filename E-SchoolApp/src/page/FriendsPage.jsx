import React, { useEffect, useState } from 'react';
import style from './FriendsPage.module.css'
import { IoPersonAdd } from "react-icons/io5";
import sample from '../assets/sample.jpg'
import { AiOutlineUserDelete } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import notifSound from '../assets/sound/notif.mp3';
import erroSound from '../assets/sound/error.mp3';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFriendStore } from '../stores/useFriendStore';
import { useAccountStore } from '../stores/useAccountsStore';
import { useImageStore } from '../stores/useImageStore';
import { ThreeDots } from  'react-loader-spinner';

const CountdownTimer = () => {

  const notif = new Howl({ src: [notifSound]})
  const errSound = new Howl({ src: [erroSound]})

  const [friends, setfriends] = useState()
  const [accounts, setaccounts] = useState()
  const [images, setimages] = useState()

  const [userFriendList, setuserFriendList] = useState([])
  const [userAccount, setuserAccount] = useState()
  const [suggestedFriends, setsuggestedFriends] = useState([])
  const [resultFriends, setresultFriends] = useState([])

  const [showLoading, setshowLoading] = useState(true)

  const { addFriend, deleteFriend, getFriend } = useFriendStore()
  const { getAccounts } = useAccountStore()
  const { getImages } =useImageStore()

  useEffect(() => {

    getFriend()
    getImages()
    getAccounts()

    setTimeout(() => {
      setshowLoading(false)
      refreshData()
    }, 3000);

    
  },[])

  const refreshData = () => {
    getFriend()
    getImages()
    getAccounts()

    const friends = JSON.parse(localStorage.getItem('friends'))
    setfriends(friends)
    const accounts = JSON.parse(localStorage.getItem('accounts'))
    setaccounts(accounts)
    const user = JSON.parse(localStorage.getItem('user'))
    setuserAccount(user)
    const images = JSON.parse(localStorage.getItem('images'))
    setimages(images)

    const filter = friends.filter((friend) => friend.acctID === user.acctID)
    console.log('filter',filter)
    if (filter) {
      setuserFriendList(filter)
    }

    let updatedData = []

      for (let i = 0; i < accounts.length; i++) {
        const number = filter.length
        let count = 0
        for (let x = 0; x < filter.length; x++) {
          if (accounts[i].acctID !== filter[x].friendAcctID && accounts[i].acctID !== user.acctID) {
              count += 1
          }else {
            continue
          }
        }
        if (count === number) {
            updatedData.push(accounts[i])
        }

      }

      setsuggestedFriends(updatedData)
    
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

  const generatePic = (friendAcctID) => {

    if (friendAcctID) {
      const currentImageID = accounts.filter((act) => act.acctID === friendAcctID).map((act) => act.imageID)
      const imageID = currentImageID[0]
      if (imageID) {
        const filter = images.filter((img) => img.imageID === imageID).map((img) => img.data)
          if (filter) {
            return 'http://localhost:5001/'+filter[0]
          }
      }
    }
    
    return sample
  }

 

  const handleAddFriend = (acctID) => {
  
      const selectedAccounts = accounts.filter((act) => act.acctID === acctID)
      const userAcctID = userAccount.acctID

      if (selectedAccounts) {
        let oldData = [...userFriendList]
        const number = userFriendList.length
        const fullname = selectedAccounts[0].firstname+' '+selectedAccounts[0].middlename.charAt(0).toUpperCase()+' '+selectedAccounts[0].lastname
        const myFullname = userAccount.firstname+' '+userAccount.middlename.charAt(0).toUpperCase()+' '+userAccount.lastname
        let updatedList = [...suggestedFriends]
        updatedList = updatedList.filter((act) => act.acctID !== acctID)
        
        setsuggestedFriends(updatedList)

        const newData = {
          id: number,
          acctID: userAcctID,
          friendAcctID: acctID,
          fullname,
        }

        const fiendData = {
          id: number,
          acctID,
          friendAcctID: userAcctID,
          fullname: myFullname,
        }

        oldData.push(newData)
        addFriend(fiendData)
        addFriend(newData)
        setuserFriendList(oldData)
     }

     if (resultFriends.length > 0) {
        const filter = resultFriends.filter((act) => act.acctID !== acctID)
        setresultFriends(filter)
     }
     
  }

  const handleUnfriend = (friendAcctID) => {
      let updated = userFriendList.filter((act) => act.friendAcctID !== friendAcctID)
      setuserFriendList(updated)
      
      const selectedUser = accounts.filter((act) => act.acctID === friendAcctID)
      deleteFriend(friendAcctID)

      let newData = [...suggestedFriends]
      newData.push(selectedUser[0])
      console.log('friendAcctID',friendAcctID)
      console.log('newData',newData)
      setsuggestedFriends(newData)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const search = e.target.value
    let resultList = []

    if (search) {

      for (let i = 0; i < accounts.length; i++) {
        const firstname = accounts[i].firstname
        const lastname = accounts[i].lastname
        const middlename = accounts[i].middlename

        if (
          firstname.toUpperCase() === search.toUpperCase() ||
          middlename.toUpperCase() === search.toUpperCase() ||
          lastname.toUpperCase() === search.toUpperCase()
        ) {
          resultList.push(accounts[i])
        }
      }

      console.log('resultList',resultList)
      setresultFriends(resultList)
    }


  }


  
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
                    <h2>FRIEND LIST</h2>
                    <IoPersonAdd id={style.btnAdd} title='add friend'/>
                  </div>
                  <div className={style.listFriends}>

                    {
                      userFriendList.length > 0 ? (
                        userFriendList.map((friend, index) => (
                          <div className={style.card} key={index}>
                              <img src={generatePic(friend.friendAcctID)} alt="" id={style.profile}/>
                              <h2>{friend.fullname}</h2>
                              <AiOutlineUserDelete id={style.btnAdd} title='unfriend' onClick={() => handleUnfriend(friend.friendAcctID)}/>
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
                          resultFriends.map((friend) => (
                            <div className={style.card}>
                              <img src={generatePic(friend.acctID)} alt="" id={style.profile}/>
                              <h2>{friend.firstname+' '+friend.middlename+' '+friend.lastname}</h2>
                              <IoPersonAdd id={style.btnAdd} title='add friend' onClick={() => handleAddFriend(friend.acctID)}/>
                          </div>
                          ))
                        }

                      </div>
                    </div>
                    <div className={style.resultBox}>
                      <h2>Suggest:</h2>
                      <div className={style.listFriends}>
                        {
                          suggestedFriends.map((friend) => (
                            <div className={style.card}>
                              <img src={generatePic(friend.acctID)} alt="" id={style.profile}/>
                              <h2>{friend.firstname+' '+friend.middlename+' '+friend.lastname}</h2>
                              <IoPersonAdd id={style.btnAdd} title='add friend' onClick={() => handleAddFriend(friend.acctID)}/>
                          </div>
                          ))
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
