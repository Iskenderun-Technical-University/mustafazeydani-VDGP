import React from 'react'
import { Link } from 'react-router-dom'
import "./auth.css"

const Login = () => {
  return (
    <div className='auth'>
      <form>
        <h2>Login</h2>
        <input type="text" placeholder='username' required/>
        <input type="password" placeholder='password' required/>
        <button className='btn'>Login</button>
        <p>This is an error!</p>
        <span>Don't have an account? <Link to="/register">Register Now</Link></span>
      </form>
    </div>
  )
}

export default Login