import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import style from './LoginPage.module.css'
import bg from '../../public/assets/sign-in-text.png'
import { verifyAccount } from '../services/accountServices'
import { UserDetailContext, UserDetails } from '../context/UserDetailContext'

const LoginPage = () => {

  const navigate = useNavigate()

    const [isChecked, setisChecked] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    
    const userDetailContext = useContext(UserDetailContext)

    if (!userDetailContext) {
        throw new Error('UserDetailContext is not provided')
    }

    const { handleSetUserDetails } = userDetailContext

  useEffect(() => {

    if (localStorage.getItem('user')) {

        const user = JSON.parse(localStorage.getItem('user') || '{}')

        if (user.acctype === 'admin') {
            navigate('/adminPage')
        }else {
            navigate('/home')
        }
    }
    
  },[])


const handleShowPass = () => {
    setisChecked(!isChecked)
}

const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
        const result = await verifyAccount(email, password)

        if (result) {

            console.log('result', result)

            localStorage.setItem('user', JSON.stringify(result))
            handleSetUserDetails(result)

            if (result.acctype === 'admin') navigate('/adminPage')
       
            navigate('/home')
            
        }

    } catch (error) {
        console.log(error)
    }

}

const handlePassword = (e: any) => {
    setPassword(e.target.value)
    setError(false)
}

const handleEmail = (e: any) => {
    setEmail(e.target.value)
    setError(false)
}

  return (
    
    <div className={style.container}>
        <div className={style.content}>
            <div className={style.left}>
            </div>
            <div className={style.right}>
                <img src={bg} alt='sign in text' />
            
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