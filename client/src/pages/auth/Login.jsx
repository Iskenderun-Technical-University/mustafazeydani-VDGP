import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./auth.css"
import axios from 'axios'

const Login = () => {
  const [inputs, setInputs] = useState({
    username:"",
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
      await axios.post("/auth/login", inputs)
      navigate("/")
    }
    catch(err) {
      setError(err.response.data)
    }
  }
  
  return (
    <div className='auth'>
      <form>
        <h2>Login</h2>
        <input type="text" placeholder='username' name='username' onChange={handleChange} required/>
        <input type="password" placeholder='password' name='password' onChange={handleChange} required/>
        <button onClick={handleSubmit} className='btn'>Login</button>
        {err && <p>{err}</p>}
        <span>Don't have an account? <Link to="/register">Register Now</Link></span>
      </form>
    </div>
  )
}

export default Login