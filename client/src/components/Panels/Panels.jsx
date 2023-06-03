import React, { useState, useContext, useEffect } from "react";
import "./panels.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import User from "../../assets/user.svg";
import {
  AiFillDelete,
  AiFillEdit
} from "react-icons/ai";
import { ImExit } from "react-icons/im";
import AddProject from "../modals/AddProject/AddProject";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

const Panels = ({
  allProjects,
  setAllProjects,
  userStats,
  setUserStats,
  selectedMenu,
  setSelectedMenu
}) => {
  const [showAddProject, setShowAddProject] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      const [statsRes, overdueRes] = await Promise.all([
        axios.get("/stats"),
        axios.get("/tasks/overdue")
      ])
      setUserStats({...statsRes.data, overdue_tasks: overdueRes.data.overdue_count});
    }
    fetchStats();
  }, [setUserStats]);

  const handleSelect = (menu) => {
    setSelectedMenu(menu);
  };

  const handleCreateProjectClick = () => {
    setShowAddProject(true);
  };

  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="panels">
      {showAddProject && (
        <AddProject
          allProjects={allProjects}
          setAllProjects={setAllProjects}
          setShowDialog={setShowAddProject}
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
            <button className="add-note">+</button>
          </div>
          <div className="notes-content">
            <div className="note btn">
              <p className="note-title">Hello</p>
              <AiFillEdit className="note-icons" />
              <AiFillDelete className="note-icons" />
            </div>
            <div className="note btn">
              <p className="note-title">Hello</p>
              <AiFillEdit className="note-icons" />
              <AiFillDelete className="note-icons" />
            </div>
            <div className="note btn">
              <p className="note-title">Hello</p>
              <AiFillEdit className="note-icons" />
              <AiFillDelete className="note-icons" />
            </div>
            <div className="note btn">
              <p className="note-title">Hello</p>
              <AiFillEdit className="note-icons" />
              <AiFillDelete className="note-icons" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panels;
