import React, { useContext } from 'react'
import Robot from "../../assets/robot.svg"
import { AuthContext } from '../../context/authContext'
import "./home.css"

function Home() {
  const { currentUser } = useContext(AuthContext)
  return (
    <div className="home">
      <img src={Robot} />
      <p>Welcome back {currentUser.username}</p>
    </div>
  )
}

export default Home