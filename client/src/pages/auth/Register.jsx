import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import "./auth.css"

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
    try {
      await axios.post("/auth/register", inputs)
      navigate("/login")
    }
    catch(err) {
      setError(err.response.data)
    }
  }
  return (
    <div className='auth'>
      <form>
        <h2>Register</h2>
        <input type="text" placeholder='username' name='username' onChange={handleChange} required/>
        <input type="email" placeholder='someone@example.com' name='email' onChange={handleChange} required/>
        <input type="password" placeholder='password' name='password' onChange={handleChange} required/>
        <button onClick={handleSubmit} className='btn'>Register</button>
        {err && <p>{err}</p>}
        <span>Already have an account? <Link to="/login">Login instead</Link></span>
      </form>
    </div>
  )
}

export default Register