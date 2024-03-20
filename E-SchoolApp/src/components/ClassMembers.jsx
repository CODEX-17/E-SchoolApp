import React, { useEffect, useState } from 'react'
import style from './ClassMembers.module.css'
import { useMemberStore } from '../stores/useMemberStore'
import axios from 'axios'
import { BiExit } from "react-icons/bi"
import sample from '../assets/sample.jpg'
import { AiOutlineDelete } from "react-icons/ai"
import { CgAddR } from "react-icons/cg";
import { RiUserAddFill } from "react-icons/ri";
import notifSound from '../assets/sound/notif.mp3';
import erroSound from '../assets/sound/error.mp3';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThreeDots } from  'react-loader-spinner';
import { useImageStore } from '../stores/useImageStore'
import { useAccountStore } from '../stores/useAccountsStore'

const ClassMembers = ({ memberID }) => {

  const notif = new Howl({ src: [notifSound]})
  const errSound = new Howl({ src: [erroSound]})
  const [allMembers, setallMembers] = useState()

  const [currentMembers, setcurrentMembers] = useState([])
  const [suggestMembers, setsuggestMembers] = useState([])
  const [selectState, setselectState] = useState(false)
  
  const [isShowLoading, setisShowLoading] = useState(false)

  const currentAccount = JSON.parse(localStorage.getItem('user'))
  const [accounts, setAccounts] = useState()
  const [images, setimages] = useState()

  const { addMembers, deleteMembers, getMembers } = useMemberStore()
  const { getAccounts } = useAccountStore()
  const { getImages } =useImageStore()

 
  useEffect(() => {
 
    getMembers()
    getImages()
    getAccounts()

    refreshData()
  },[])

  const refreshData = () => {
    setisShowLoading(true)
    getMembers()
    getImages()
    getAccounts()

    setTimeout(() => {
      setisShowLoading(false)
      const members = JSON.parse(localStorage.getItem('members'))
      const accounts = JSON.parse(localStorage.getItem('accounts'))
      const images = JSON.parse(localStorage.getItem('images'))

      setimages(images)
      setallMembers(members)
      setAccounts(accounts)

      if (members) {
        const filter = members.filter((member) => member.membersID === memberID && member.memberType !== 'admin')
        
        for (let i = 0; i < filter.length; i++) {
          filter[i].checked = false
        }

        console.log('filter',filter)
        setcurrentMembers(filter)

        let updatedData = []

        for (let i = 0; i < accounts.length; i++) {
          const number = filter.length
          let count = 0
          
          for (let x = 0; x < filter.length; x++) {
            if (accounts[i].acctID !== filter[x].acctID && accounts[i].acctID !== currentAccount.acctID) {
                count += 1
            }else {
              continue
            }
          }

          if (count === number) {
              updatedData.push(accounts[i])
          }

        }
        console.log(updatedData)
        setsuggestMembers(updatedData)

      }
    }, 3000);

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

  const generatePic = (imageID) => {
    if (imageID) {
      const currentImage = images.filter((img) => img.imageID === imageID).map((img) => img.data)
      if (currentImage) {
        return 'http://localhost:5000/' + currentImage[0]
      }else {
        return sample
      }
    }
    
  }

  const generateDP = (acctID) => {
    const imageID = accounts.filter((act) => act.acctID === acctID).map((act) => act.imageID)

    if (imageID) {
      const currentImage = images.filter((img) => img.imageID === imageID[0]).map((img) => img.data)
      if (currentImage) {
        return 'http://localhost:5000/' + currentImage[0]
      }else {
        return sample
      }
    }
    
  }

  const findAdmin = () => {
    console.log('allMembers',allMembers)
    console.log('memberID',memberID)
    if (allMembers && memberID) {
      const result = allMembers.filter((mm) => mm.membersID === memberID && mm.memberType === 'admin')
      if (result.length > 0)  {
        const fullname = result[0].firstName + ' ' + result[0].midleName.charAt(0).toUpperCase() + ' ' + result[0].lastName
        return fullname
      }

      return 'No admin'
    }
    
    
  }

  const handleAddMember = (id, index) => {
      let updated = [...currentMembers]
      const addedMember = accounts.filter((act) => act.acctID === id)

        const membersID = memberID
        const acctID = addedMember[0].acctID
        const firstName = addedMember[0].firstname
        const hidden = 'false'
        const lastName = addedMember[0].lastname
        const memberType = 'member'
        const midleName = addedMember[0].middlename

          updated.push(
            {
              ID: index,
              acctID,
              firstName,
              hidden,
              lastName,
              memberType,
              membersID,
              midleName,
          })
        

        addMembers(membersID, acctID, firstName, midleName, lastName, memberType)
        setcurrentMembers(updated)

        const filter = suggestMembers.filter((act) => act.acctID !== id)
        console.log(filter)
        setsuggestMembers(filter)

        const message = 'Member added.'
        notify(message, 'success')
        refreshData()

  }

  const handleDeleteMember = (acctID, index) => {
      const updated = currentMembers.filter((act) => act.acctID !== acctID)
      setcurrentMembers(updated)
      deleteMembers(acctID)
      const message = 'member successfully removed.'
      notify(message, 'success')
      refreshData()
  }

  const handleSelectAll = () => {
    let updated = [...suggestMembers]

      for (let i = 0; i < updated.length; i++) {
        if (selectState) {
            updated[i].checked = false
            setselectState(false)
        }else {
            updated[i].checked = true
            setselectState(true)
        }
      }
    
    if (condition) {
      
    }
    console.log('updated',updated)
    setsuggestMembers(updated)

  }

  return (
    <div className={style.container}>
      {
        isShowLoading ? (
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
              <p>Loading members...</p>
          </div>
        ) : (
          <>
            <h2>Class Members</h2>
            <div className={style.head}>
              <h2 id={style.labelAdmin}>Class Admin</h2>
              <div className={style.card}>
                <img src={sample} alt="dp" id={style.dpImg}/>
                <p>{findAdmin()}</p>
              </div>
            </div>
            <div className={style.horizontal}>
              <div className={style.leftCon}>

              <div className='d-flex gap-2'>
                <h2 id={style.memberLabel}>Members</h2>
              </div>
                  
                <div className={style.listView}>
                  {
                    currentMembers ? (
                      currentMembers.map((member, index) => (
                        
                          <div className={style.cardMember} key={index}>
                            <img src={generateDP(member.acctID)} alt="dp" id={style.dpImg}/>
                            <p>{member.firstName+' '+member.midleName+' '+member.lastName}</p>
                            {
                              currentAccount.acctype === 'faculty' && (
                                <AiOutlineDelete id={style.deleteIcon} onClick={() => handleDeleteMember(member.acctID, index)}/>
                              )
                            }
                            
                          </div>

                      ))) : (<p>Loading..</p>)
                  }
                </div>

              </div>
                  <div className={style.rightCon}>
                          <div className='d-flex justify-content-between position-relative'>
                            <h2>Add Members</h2>
                          </div>
                          <div className={style.accountList}>
                            {
                              suggestMembers.map((acct, index) => (
                                <div className={style.cardAccounts} key={index}>
                                  <img src={generatePic(acct.imageID)} alt="dp" id={style.dpImg}/>
                                  <p>{acct.firstname+' '+acct.middlename+' '+acct.lastname}</p>
                                    {
                                      currentAccount.acctype === 'faculty' &&
                                      <RiUserAddFill id={style.addFriendIcon} onClick={() => handleAddMember(acct.acctID, index)}/>
                                    }
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
  )
}

export default ClassMembers