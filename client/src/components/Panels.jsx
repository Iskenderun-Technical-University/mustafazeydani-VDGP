import React, { useContext } from 'react'
import './panels.css'
import { Link } from 'react-router-dom'
import Logo from '../assets/logo.svg'
import User from '../assets/user.svg'
import {
  AiOutlineUser, 
  AiFillDelete, 
  AiFillEdit,
  AiFillSetting
} from 'react-icons/ai'
import {
  ImExit
} from 'react-icons/im'
import { AuthContext } from '../context/authContext'


const Panels = () => {

  const { currentUser, logout } = useContext(AuthContext)

  return (
    <div className='panels'>
      <div className="leftpanel">
        
        <div className="leftpanel-links">
          <img src={Logo} alt="logo" />
          {/* <Link className='link' to=''><AiOutlineUser/></Link>
          <Link className='link' to=''><AiOutlineUser/></Link>
          <Link className='link' to=''><AiOutlineUser/></Link>
          <Link className='link' to=''><AiOutlineUser/></Link> */}
        </div>

        <div className="controls">
          <a href=""><AiFillSetting/></a>
          <Link onClick={logout} to="/login"><ImExit/></Link>
        </div>
      </div>

      <div className="upperpanel">
        <div className="upperpanel-links">
          <Link to="/" className='link'>My Projects</Link>
          <Link to="/tasks" className='link'>My Tasks</Link>
        </div>
        <a className="btn" href="">Create New Project</a>
      </div>

      <div className="rightpanel">
        <div className="user">
          <p>Hello,<br/><span>{currentUser.username}</span></p>
          <img src={User}/>
        </div>
        <div className="statistics">
          <div className="total-projects">
            <div className="content">
              <p>Total Projects:</p>
              <p>0</p>
            </div>
          </div>
          <div className="completed">
            <div div className="content">
              <p>Completed:</p>
              <p>0</p>
            </div>
          </div>
          <div className="in-progress">
            <div className="content">
              <p>In Progress:</p>
              <p>0</p>
            </div>
          </div>
          <div className="out-of-schedule">
            <div className="content">
              <p>Out of schedule:</p>
              <p>0</p>
            </div>
          </div>
        </div>
        <div className="notes">
          <div className="notes-header">
            <p>Notes</p>
            <a className='add-note'>+</a>
          </div>
          <div className="notes-content">
            <div className="note btn">
                <p className='note-title'>Hello</p>
                <AiFillEdit className='note-icons'/>
                <AiFillDelete className='note-icons'/>
            </div>
            <div className="note btn">
                <p className='note-title'>Hello</p>
                <AiFillEdit className='note-icons'/>
                <AiFillDelete className='note-icons'/>
            </div>
            <div className="note btn">
                <p className='note-title'>Hello</p>
                <AiFillEdit className='note-icons'/>
                <AiFillDelete className='note-icons'/>
            </div>
            <div className="note btn">
                <p className='note-title'>Hello</p>
                <AiFillEdit className='note-icons'/>
                <AiFillDelete className='note-icons'/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Panels