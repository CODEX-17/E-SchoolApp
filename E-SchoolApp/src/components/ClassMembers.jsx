import React, { useEffect, useState } from 'react'
import style from './ClassMembers.module.css'
import axios from 'axios'
import { AiOutlineDelete } from "react-icons/ai"
import { RiUserAddFill } from "react-icons/ri";
import notifSound from '../assets/sound/notif.mp3';
import erroSound from '../assets/sound/error.mp3';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThreeDots } from  'react-loader-spinner';


const ClassMembers = ({ memberID, currentClassCode }) => {

  const notif = new Howl({ src: [notifSound]})
  const errSound = new Howl({ src: [erroSound]})

  const currentAccount = JSON.parse(localStorage.getItem('user'))

  //Pros variables
  const currentMemberID = memberID
  const classCode = currentClassCode

  //Variable for fetching in database
  const [membersList, setMembersList] = useState(null)
  const [currentMembersList, setCurrentMembersList] = useState(null)
  const [suggestMembersList, setSuggestMembersList] = useState(null)
  const [accountsList, setAccountsList] = useState(null)

  //Show variables
  const [isShowLoading, setisShowLoading] = useState(false)

  const [adminMember, setAdminMember] = useState(null)

  useEffect(() => {

      axios.get('http://localhost:5001/members/getMembers')
      .then((res) => {
          const value = res.data

          setMembersList(value)

          //Find the member by memberID
          const currentMembersFilter = value.filter((data) => data.membersID === currentMemberID)
          setCurrentMembersList(currentMembersFilter)

          //Find admin in currentMembers
          const adminFilter = currentMembersFilter.filter((data) => data.memberType === 'admin')
          setAdminMember(adminFilter[0])

          //Fetch all accounts
          axios.get('http://localhost:5001/accounts/getAccounts')
          .then((res) => {
                const result = res.data
                setAccountsList(result)

                //Find the suggested members
                let suggestedMembers = []
                let duplicate = false

                if (currentMembersFilter) {

                  //Loop the fetch accounts and check if they exist in membersList
                  for (let i = 0; i < result.length; i++) {
                    const acctID = result[i].acctID
                
                    //Loop of Current Members
                    for (let x = 0; x < currentMembersFilter.length; x++) {
                      const membersAcctID = currentMembersFilter[x].acctID
                    
                      //Check if they exist in membersList
                      if (acctID === membersAcctID) {
                        duplicate = true
                      }

                    }

                    //If not it will push in variable
                    if (!duplicate) {
                      suggestedMembers.push({
                        membersID: currentMemberID,
                        acctID: result[i].acctID,
                        firstname: result[i].firstname,
                        middlename: result[i].middlename,
                        lastname: result[i].lastname,
                        memberType: 'member',
                        imageID: result[i].imageID,
                        data: result[i].data,
                      })

                      duplicate = false
                    }else {
                      duplicate = false
                    }
                    
                  }
                
                }

                //Set the final result in variable
                setSuggestMembersList(suggestedMembers)
            })
            .catch((err) => console.log(err))
          

      })
      .catch((err) => console.log(err))


  },[])




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

  const generateFullname = (firstName, middleName, lastName) => {
    if (firstName, middleName, lastName) {
        const fullname = firstName + ' ' + middleName.charAt(0) + '. ' + lastName
        return fullname
    }
  }

  

  const handleAddMember = (data, index) => {

      const currentIndex = index

      axios.post('http://localhost:5001/members/addMembers', data)
      .then((res) => {
        const result = res.data

        //Add new member in variable 
        setCurrentMembersList((oldData) => [...oldData, data])

        //Remove the selected member in suggestedMembers
        const filter = suggestMembersList.filter((data, index) => index !== currentIndex)
        setSuggestMembersList(filter)

        const newClass = {
          acctID: data.acctID,
          classCode: classCode,
          hidden: 'false',
        }

        console.log(newClass)

        //API to add class in member that added
        axios.post('http://localhost:5001/classLists/addClassList', newClass)
        .then((res) => {
          const result = res.data
          console.log(result.message)
        })
        .catch((err) => console.log(err))


        const message = result.message
        notify(message, 'success')

      })
      .catch((err) => console.log(err)) 

  }

  const handleDeleteMember = (member, index) => {
      if (member, index) {

        const id = member.id
        const currentIndex = index

        //API to delete member from database
        axios.delete('http://localhost:5001/members/deleteMember/' + id)
        .then((res) => {
          const result = res.data
          const message = result.message

          //Delete classList by classCode & acctID
          const params = {
            classCode: classCode,
            acctID: member.acctID,
          }

          axios.delete('http://localhost:5001/classLists/deleteClassList', { data: params })
          .then((res) => {
            const result = res.data
            console.log(result.message)
          })
          .catch((err) => console.log(err))


          //Remove the selected member in currentMemberList
          const filter = currentMembersList.filter((data, index) => index !== currentIndex)
          setCurrentMembersList(filter)

          //Add in suggested members
          setSuggestMembersList((oldData) => [...oldData, member])

          notify(message, 'success')
        })
        .catch((err) => console.log(err))

        
      }
  }

  const generatePicture = (fileName) => {
    if (fileName) {
      const url = 'http://localhost:5001/'
      const filePath = url + fileName
      if (filePath) {
        return filePath
      }else {
        console.error('no file path')
      }
    }
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
                <img src={adminMember && generatePicture(adminMember.data)} alt="dp" id={style.dpImg}/>
                <p>{adminMember && generateFullname(adminMember.firstname, adminMember.middlename, adminMember.lastname)}</p>
              </div>
            </div>
            <div className={style.horizontal}>
              <div className={style.leftCon}>

              <div className='d-flex gap-2'>
                <h2 id={style.memberLabel}>Members</h2>
              </div>
                  
                <div className={style.listView}>
                  {
                    currentMembersList ? (
                      currentMembersList.map((member, index) => (
                          <div className={style.cardMember} key={index}>
                            <img src={generatePicture(member.data)} alt="dp" id={style.dpImg}/>
                            <p>{generateFullname(member.firstname,member.middlename,member.lastname)}</p>
                            { member.memberType === 'admin' && <p id={style.subtitle}>(admin)</p>}
                            {
                              currentAccount.acctype === 'faculty' && member.memberType !== 'admin' && (
                                <AiOutlineDelete id={style.deleteIcon} title='remove member' onClick={() => handleDeleteMember(member, index)}/>
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
                              suggestMembersList &&
                              suggestMembersList.map((acct, index) => (
                                <div className={style.cardAccounts} key={index}>
                                  <img src={generatePicture(acct.data)} alt="dp" id={style.dpImg}/>
                                  <p>{generateFullname(acct.firstname, acct.middlename, acct.lastname)}</p>
                                    {
                                      currentAccount.acctype === 'faculty' &&
                                      <RiUserAddFill id={style.addFriendIcon} title='add mmember' onClick={() => handleAddMember(acct, index)}/>
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