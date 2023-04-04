import React from 'react'
import { Link } from 'react-router-dom'
import "./auth.css"

const Register = () => {
  return (
    <div className='auth'>
      <form>
        <h1>Register</h1>
        <input type="text" placeholder='username' required/>
        <input type="email" placeholder='someone@example.com' required/>
        <input type="password" placeholder='password' required/>
        <button className='btn'>Register</button>
        <p>This is an error!</p>
        <span>Already have an account? <Link to="/login">Login instead</Link></span>
      </form>
    </div>
  )
}

export default Register