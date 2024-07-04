import React, { useState } from 'react'
import classes from './signin.module.css'
import {login} from '../../redux/authSlice'
import {request} from '../../util/fetchApi'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'

const Signin = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async(e) => {
    e.preventDefault()
    try {
      const options = {
        'Content-Type': 'application/json'
      }

      const data = await request('/auth/login', "POST", options, {email, password})
      dispatch(login(data))
      console.log(data)
      navigate("/")

    } catch (error) {
      console.error(error)
    }
  }


  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Sign In</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder='Email...' onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder='Password...' onChange={(e) => setPassword(e.target.value)}/>
          <button type='submit'>Sign In</button>
        </form>
      </div>
    </div>
  )
}

export default Signin