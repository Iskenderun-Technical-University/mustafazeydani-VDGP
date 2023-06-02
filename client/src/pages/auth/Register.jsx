import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import "./auth.css"
import { v4 as uuidv4 } from "uuid"

const Register = () => {
  const [inputs, setInputs] = useState({
    username:"",
    email:"",
    password:""
  })

  const [err, setError] = useState(null)

  const navigate = useNavigate()

  const handleChange = e => {
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const{username, email, password} = inputs
    try {
      if(!username)
        throw new Error("Username field is required!")
      else if(username.length < 3 || username.length > 20)
        throw new Error("Username must be between 3 and 20 characters")
      else if (!/^[a-zA-Z0-9_-]+$/.test(username)) 
        throw new Error("Username can only contain letters, numbers, underscores, and hyphens")

      try {
        if(!email)
          throw new Error("Email field is required!")
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
          throw new Error("Invalid email address")
        try {
          if(!password)
            throw new Error("Password field is required!")
          else if (password.length < 8)
            throw new Error("Password must be at least 8 characters long")
          else if(!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password))
            throw new Error("Password must contain at least one uppercase, lowecase and number")

          try {
            const uuid = uuidv4()
            await axios.post("/auth/register", {uuid: uuid, ...inputs}).then(()=>{
              axios.post("/stats", {uuid: uuid})
            })
            navigate("/login")
          }
          catch(err) {
            setError(err.response.data)
          }
        }
        catch(err) {
          setError(err.message)
        }
      }
      catch(err) {
        setError(err.message)
      }
    }
    catch(err) { 
      setError(err.message)
    }
  }
  return (
    <div className='auth'>
      <form>
        <h2>Register</h2>
        <input 
          type="text" 
          placeholder='username' 
          name='username' 
          onChange={handleChange}
        />
        <input 
          type="email" 
          placeholder='someone@example.com' 
          name='email' 
          onChange={handleChange}
        />
        <input 
          type="password" 
          placeholder='password' 
          name='password' 
          onChange={handleChange}
        />
        <button onClick={handleSubmit} className='btn'>Register</button>
        {err && <p>{err}</p>}
        <span>Already have an account? <Link to="/login">Login instead</Link></span>
      </form>
    </div>
  )
}

export default Register