import React, { useState, useContext, useEffect } from "react";
import "./panels.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import User from "../../assets/user.svg";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import {
  AiFillDelete,
  AiOutlinePlus
} from "react-icons/ai";
import { ImExit } from "react-icons/im";
import AddProject from "../modals/AddProject/AddProject";
import AddNote from "../modals/AddNote/AddNote";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import ConfirmDelete from "../modals/ConfirmDelete/ConfirmDelete";

const Panels = ({
  allProjects,
  setAllProjects,
  allNotes,
  setAllNotes,
  userStats,
  setUserStats,
  selectedMenu,
  setSelectedMenu
}) => {
  const [showAddProject, setShowAddProject] = useState(false)
  const [showAddNote, setShowAddNote] = useState(false)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [clickedNote, setClickedNote] = useState("")
  const [noteContent, setNoteContent] = useState("")
  const [noteToDelete, setNoteToDelete] = useState()
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStats = async () => {
      const [statsRes, overdueRes] = await Promise.all([
        axios.get("/stats"),
        axios.get("/tasks/overdue")
      ])
      setUserStats({...statsRes.data, overdue_tasks: overdueRes.data.overdue_count});
    }
    fetchStats();
  }, [setUserStats])

  useEffect(()=> {
    const fetchNotes = async () => {
      const res = await axios.get("/notes")
      setAllNotes(res.data)
    }
    fetchNotes()
  }, [setAllNotes])

  const handleSelect = (menu) => {
    setSelectedMenu(menu)
  }

  const handleCreateProjectClick = () => {
    setShowAddProject(true)
  }

  const handleDone = async () => {
    try {
      await axios.put("/notes", {content: noteContent, uuid: clickedNote})
      const editedNote = allNotes.filter((note)=>note.uuid === clickedNote)[0]
      editedNote.content = noteContent
      setAllNotes(allNotes.map((note) => {
        if(note.uuid===clickedNote)
          return editedNote
        else
          return note
      }))
      setClickedNote(null)
    }
    catch(err) {
      setError(err.message)
    }
  }
  const handleCreateNoteClick = () => {
    setShowAddNote(true)
  }
  const handleChange = (e) => {
    setNoteContent(e.target.value)
  }
 
  const handleNoteClick = (e, content, uuid) => {
    if(e.target.dataset.id === "view-note") {
      setClickedNote(uuid)
      setNoteContent(content)
    }
    else if(e.target.dataset.id === "delete-note") {
      setShowConfirmDelete(true)
      setNoteToDelete(uuid)
    }
  }

  const { currentUser, logout } = useContext(AuthContext)

  return (
    <div className="panels">
      {showAddProject 
      ? (
        <AddProject
          allProjects={allProjects}
          setAllProjects={setAllProjects}
          setShowAddProject={setShowAddProject}
        />
      ) 
      : showAddNote 
      ?(
        <AddNote
          setShowAddNote={setShowAddNote}
          setAllNotes={setAllNotes}
        />
      )
      : showConfirmDelete 
      && (
        <ConfirmDelete 
          type={"note"}
          setAllNotes={setAllNotes}
          noteToDelete={noteToDelete}
          setShowConfirmDelete={setShowConfirmDelete}
        />
      )}
      <div className="leftpanel">
        <div className="leftpanel-links">
          <Link to="/" onClick={() => handleSelect("")}>
            <img src={Logo} alt="logo" />
          </Link>
        </div>

        <div className="controls">
          <Link onClick={logout} to="/login">
            <ImExit />
          </Link>
        </div>
      </div>

      <div className="upperpanel">
        <div className="upperpanel-links">
          <Link
            to="/projects"
            className={selectedMenu === "projects" ? "selected" : ""}
            onClick={() => handleSelect("projects")}
          >
            My Projects
          </Link>
          <Link
            to="/tasks"
            className={selectedMenu === "tasks" ? "selected" : ""}
            onClick={() => handleSelect("tasks")}
          >
            My Tasks
          </Link>
        </div>
        <button className="btn" onClick={handleCreateProjectClick}>
          Create New Project
        </button>
      </div>

      <div className="rightpanel">
        <div className="user">
          <p>
            Hello,
            <br />
            <span>{currentUser.username}</span>
          </p>
          <img alt="user-avatar" src={User} />
        </div>
        {(() => {
          const {
            completed_projects,
            completed_tasks,
            ongoing_tasks,
            overdue_tasks,
          } = userStats;
          return (
            <div className="statistics">
              <div className="completed_projects">
                <div className="content">
                  <p>Completed Projects:</p>
                  <p>{completed_projects}</p>
                </div>
              </div>
              <div className="completed_tasks">
                <div className="content">
                  <p>Completed Tasks:</p>
                  <p>{completed_tasks}</p>
                </div>
              </div>
              <div className="ongoing_tasks">
                <div className="content">
                  <p>Ongoing Tasks:</p>
                  <p>{ongoing_tasks}</p>
                </div>
              </div>
              <div className="overdue_tasks">
                <div className="content">
                  <p>Overdue Tasks:</p>
                  <p>{overdue_tasks}</p>
                </div>
              </div>
            </div>
          );
        })()}
        <div className="notes">
          <div className="notes-header">
            <p>Notes</p>
            {clickedNote && (<button className="notes-header-icons" onClick={handleDone}><IoCheckmarkDoneOutline /></button>)}
            <button className="notes-header-icons" onClick={handleCreateNoteClick}><AiOutlinePlus /></button>
          </div>
          <div className="notes-container">
            {clickedNote
            ?(
              <textarea className="note-content" value={noteContent} onChange={handleChange}>Hello</textarea>
            )
            :
            allNotes.map((note) => {
              const {uuid, title, content} = note
              return (
                <div className="note btn" data-id="view-note" key={uuid} onClick={(e) => handleNoteClick(e, content, uuid)}>
                  <p className="note-title">{title}</p>
                  <button data-id="delete-note" className="note-icon-btn"><AiFillDelete className="note-icon"/></button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panels;
