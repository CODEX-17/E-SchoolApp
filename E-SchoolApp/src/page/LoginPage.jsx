import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import style from './LoginPage.module.css'
import logoWhite from '../assets/logo-white.png'
import logoBlue from '../assets/logo.png'
import { useAccountStore } from '../stores/useAccountsStore'
import { useImageStore } from '../stores/useImageStore'
import { usePostStore } from '../stores/usePostStore'
import { useMemberStore } from '../stores/useMemberStore'
import { useQuestionsStore } from '../stores/useQuestionsStore'
import { useFillLayoutStore } from '../stores/useFillLayoutStore'
import { useChoicesStore } from '../stores/useChoicesStore'
import { useQuizStore } from '../stores/useQuizStore'
import { useMessageStore } from '../stores/useMessageStore'
import { useFriendStore } from '../stores/useFriendStore'
import { useFilesStore } from '../stores/useFilesStore'
import { useScheduleStore } from '../stores/useScheduleStore'
import { useScoreStore } from '../stores/useScoreStore'
import { useNavigateStore } from '../stores/useNavigateStore'
import { useClassStore } from '../stores/useClassStore'

const LoginPage = () => {

  const navigate = useNavigate()

  const { routeChoose } = useNavigateStore()
  const { getImages } = useImageStore()
  const { getPost } = usePostStore()
  const { getMembers } = useMemberStore()
  const { getQuestion } = useQuestionsStore()
  const { getFillLayout } = useFillLayoutStore()
  const { getChoices } = useChoicesStore()
  const { getQuiz } = useQuizStore()
  const { getMessages } = useMessageStore()
  const { getFriend } = useFriendStore()
  const { getFiles } = useFilesStore()
  const { getSchedule } = useScheduleStore()
  const { getScore } = useScoreStore()
  const { getClass } = useClassStore()

const [urlImage, seturlImage] = useState(true)
const [isChecked, setisChecked] = useState(false)
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState(false)
const { getAccounts, account } = useAccountStore()

  useEffect(() => {
    
    getScore()
    getSchedule()
    getFriend()
    getQuiz()
    getChoices()
    getQuestion()
    getFillLayout()
    getMembers()
    getPost()
    getImages()
    getAccounts()
    getMessages()
    getFiles()
    getClass()

    const authtoken = JSON.parse(localStorage.getItem('authtoken'))
    const user = JSON.parse(localStorage.getItem('user'))

    if ( authtoken || user ) {
        if (user.acctype === 'admin') {
            navigate('/adminPage')
        }else {
            navigate('/home')
        }
        
    }
    

  },[])


const handleHoverLogo = () => {
    seturlImage(!urlImage);
    
}

const handleShowPass = () => {
    setisChecked(!isChecked);
}

const handleSubmit = (e) => {
    e.preventDefault()

    const accountVerified = account.filter(acct => acct.email === email && acct.password === password)
    console.log(accountVerified)
    console.log('dsds')

    if (accountVerified.length > 0) {
        localStorage.setItem('user', JSON.stringify(accountVerified[0]))
        localStorage.setItem('authtoken', JSON.stringify(true))
        if (accountVerified[0].acctype === 'admin') {
            navigate('/adminPage')
        }else {
            navigate('/home')
        }
        
    }else {
        console.log('error')
        localStorage.removeItem('user')
        localStorage.removeItem('authtoken')
        setError(true)
        setTimeout(() => {
            setError(false)
        }, 3000);
        
    }
}

const handlePassword = (e) => {
    setPassword(e.target.value)
    setError(false)
}

const handleEmail = (e) => {
    setEmail(e.target.value)
    setError(false)
}

  return (
    
    <div className={style.container}>
        <div className={style.content}>
            <div className={style.left}>
            </div>
            <div className={style.right}>
                <img src='/sign-in-text.png' alt='sign in text' />
            
                    <form action="" className='form' onSubmit={handleSubmit}>
                        <div className={style.inputDiv}>
                            <input type="email" placeholder='Email' onChange={handleEmail} required/>
                            <input type={isChecked ? "text" : "password"} placeholder='Password' onChange={handlePassword} required/>
                            <div className={style.horizontalDiv}>
                                <label id={style.label} htmlFor="checkbox">Show password?</label>
                                <input id={style.checkbox} type="checkbox" name='checkbox' checked={isChecked} onChange={handleShowPass}/>
                             </div>
                            <button className={style.btn} type="submit">Sign in</button>
                        </div>
                        { error && <p className={style.errorMessage}>You've Incorrect Password!</p>}
                    </form>
                <h2 id={style.mark}>@All Right Reserved 2024</h2>
            </div>
        </div>
    </div>
  )
}

export default LoginPage