import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import style from './LoginPage.module.css'
import { useAccountStore } from '../stores/useAccountsStore'
import axios from 'axios'
import generateImageByImageID from '../utils/generateImageByImageID'

const LoginPage = () => {

  const navigate = useNavigate()

    const [urlImage, seturlImage] = useState(true)
    const [isChecked, setisChecked] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const { getAccounts, account } = useAccountStore()

  useEffect(() => {

    if (localStorage.getItem('user')) {
        const user = JSON.parse(localStorage.getItem('user'))

        if (user.acctype === 'admin') {
            navigate('/adminPage')
        }else {
            navigate('/home')
        }
    }
    
  },[])


const handleShowPass = () => {
    setisChecked(!isChecked);
}

const handleSubmit = (e) => {
    e.preventDefault()

    axios.post('http://localhost:5001/accounts/verifyAccount', {email, password})
    .then((res) => {
        const result = res.data
        if (result.length > 0) {
            localStorage.setItem('user', JSON.stringify(result[0]))
            console.log(result)
            if (result[0].acctype === 'admin') {
                console.log('admin here!')
                navigate('/adminPage')
            }else{
                navigate('/home')
            }
            
        }else{
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 3000)
        }
        
    })
    .catch((err) => console.log(err))

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