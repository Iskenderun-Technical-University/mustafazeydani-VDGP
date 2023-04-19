import React, { useState, useEffect } from "react";
import AddTask from "../../components/modals/AddTask/AddTask";
import { Link, useLocation } from "react-router-dom";
import { MdStart, MdDelete } from "react-icons/md";
import { AiOutlineArrowLeft } from "react-icons/ai";
import axios from "axios";
import "./single.css";
import ConfirmDelete from "../../components/modals/ConfirmDelete/ConfirmDelete";
import Loader from "../../components/loader/Loader";

function Single({ fetching, setFetching }) {
  const { state } = useLocation();
  const { project_uuid, project_name } = state;

  const [err, setError] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [clickedItem, setClickedItem] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [taskUuid, setTaskToDelete] = useState(null);

  const handleAddTask = () => {
    setShowAddTask(true);
  };

  const handleClick = (e, uuid) => {
    if(e.target.dataset.id==="delete-task") { // Delete Task
      setTaskToDelete(uuid)
      setShowConfirmDelete(true)
    }
    else if(e.target.dataset.id==="to-in-progress") {

    }
    else {
      if (!clickedItem) {
        setClickedItem(true);
      } 
      else setClickedItem(false);
    }
  }

  useEffect(() => {
    setFetching(true);
    const fetchData = async () => {
      try {
        const res = await axios.get("/tasks");
        setTasks(res.data);
      } catch (err) {
        setError("Error fetching tasks");
      }
      setFetching(false);
    };
    fetchData();
  }, [setTasks, setFetching]);

  return (
    <div className="single">
      {
        showConfirmDelete &&
        <ConfirmDelete
          setShowConfirmDelete={setShowConfirmDelete}
          taskUuid={taskUuid}
          setError={setError}
          setTasks={setTasks}
          type={"task"}
        />
      }
      {showAddTask && (
        <AddTask
          setShowAddTask={setShowAddTask}
          tasks={tasks}
          setTasks={setTasks}
          project_name={project_name}
          project_uuid={project_uuid}
        />
      )}
      <div className="single-header">
        <button className="btn" onClick={handleAddTask}>
          Create a task
        </button>
        <Link className="back" to="/projects">
          <AiOutlineArrowLeft />
        </Link>
      </div>
      <div className="single-content">
        <div className="to-do container">
          <h2>To-do List</h2>
          {fetching && tasks.length === 0 ? (
            <Loader />
          ) : err ? (
            <p className="error">{err}</p>
          ) : (
            tasks.length === 0 && !fetching && <p className="error">No Tasks Added</p>
          )}
          {clickedItem ? (
            <>
              <p>Task</p>
              <input
                className="task-name-input"
                type="text"
                placeholder="Task"
              />
              <p>Deadline</p>
              <input type="date" />
              <p>Priority</p>
              <select>
                <option value="">Normal</option>
                <option value="">Important</option>
              </select>
              <div className="task-buttons">
                <button className="btn" onClick={handleClick}>
                  Back
                </button>
                <button className="btn btn-main">Save</button>
              </div>
            </>
          ) : (
            tasks.map((singletask) => {
              const { uuid, task } = singletask;
              return (
                <div className="task" key={uuid} onClick={(e)=>handleClick(e, uuid)}>
                  <p className="task-name">{task}</p>
                  <button data-id="delete-task"><MdDelete className="icon"/></button>
                  <button data-id="to-in-progress"><MdStart className="icon"/></button>
                </div>
              );
            })
          )}
        </div>

        <div className="in-progress container">
          <h2>In-Progress</h2>
        </div>
        <div className="done container">
          <h2>Done</h2>
        </div>
      </div>
    </div>
  );
}

export default Single;
