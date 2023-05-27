import React, { useState ,useContext } from 'react'
import './panels.css'
import { Link } from 'react-router-dom'
import Logo from '../../assets/logo.svg'
import User from '../../assets/user.svg'
import {
  AiFillDelete, 
  AiFillEdit,
  // AiFillSetting
} from 'react-icons/ai'
import {
  ImExit
} from 'react-icons/im'
import AddProject from '../modals/AddProject/AddProject'
import { AuthContext } from '../../context/authContext'

const Panels = ({allProjects, setAllProjects, selectedMenu, setSelectedMenu}) => {

  const [showAddProject, setShowAddProject] = useState(false)

  const handleSelect = (menu) => {
      setSelectedMenu(menu)
  }
  
  const handleCreateProjectClick = () => {
    setShowAddProject(true)
  }

  const { currentUser, logout } = useContext(AuthContext)

  return (
    <div className='panels'>
      {showAddProject && 
        <AddProject 
          allProjects={allProjects}
          setAllProjects={setAllProjects}
          setShowDialog={setShowAddProject} 
      />
      }
      <div className="leftpanel">
        
        <div className="leftpanel-links">
          <Link to="/" onClick={() => handleSelect("")}><img src={Logo} alt="logo" /></Link>
        </div>

        <div className="controls">
          <Link onClick={logout} to="/login"><ImExit/></Link>
        </div>
      </div>

      <div className="upperpanel">
        <div className="upperpanel-links">
          <Link to="/projects" className={selectedMenu==="projects"?"selected":""} onClick={()=>handleSelect("projects")}>My Projects</Link>
          <Link to="/tasks" className={selectedMenu==="tasks"?"selected":""} onClick={()=>handleSelect("tasks")}>My Tasks</Link>
        </div>
        <button className='btn' onClick={handleCreateProjectClick}>Create New Project</button>
      </div>

      <div className="rightpanel">
        <div className="user">
          <p>Hello,<br/><span>{currentUser.username}</span></p>
          <img alt="user-avatar" src={User}/>
        </div>
        <div className="statistics">
          <div className="total-projects">
            <div className="content">
              <p>Total Projects:</p>
              <p>0</p>
            </div>
          </div>
          <div className="completed">
            <div className="content">
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
            <button className='add-note'>+</button>
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