import React, { useState, useEffect } from "react";
import AddTask from "../../components/modals/AddTask/AddTask";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import {BsArrowRightCircleFill, BsArrowLeftCircleFill} from "react-icons/bs"
import { AiOutlineArrowLeft } from "react-icons/ai";
import {IoCheckmarkDoneOutline} from "react-icons/io5"
import axios from "axios";
import "./single.css";
import ConfirmDelete from "../../components/modals/ConfirmDelete/ConfirmDelete";
import Loader from "../../components/loader/Loader";
import moment from "moment";

function Single({ userStats, setUserStats, fetching, setFetching }) {

  const url = window.location.href
  const [, temp, project_uuid] = url.match(/\/([^/]+)\/([\w-]+)$/)
  const project_name = temp.replace(/-/g, " ")

  const [err, setError] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [inprogress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [taskDeleteUuid, setTaskToDelete] = useState(null);
  const [clickedItem, setClickedItem] = useState(null);

  const [inputs, setInputs] = useState({
    task: "",
    deadline: "",
    priority: "",
  });
  
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleEditCancel = (e) => {
    setClickedItem(null)
  }

  const handleSubmit = async () => {
    await axios.put("/tasks", {...inputs, uuid: clickedItem, type: "details"})
    const editedTask = tasks.find((task)=>task.uuid===clickedItem)
    editedTask.task = inputs.task
    editedTask.deadline = inputs.deadline
    editedTask.priority = inputs.priority
    setTasks(tasks.map(task => {
      if (task.uuid === clickedItem) {
        return editedTask;
      } else {
        return task;
      }
    }))
    setClickedItem(null)
  }

  const handleAddTask = () => {
    setShowAddTask(true);
  }
  const handleClick = async (e, uuid) => {
    if (e.target.dataset.id === "delete-task") {
      // Delete Task
      setTaskToDelete(uuid)
      setShowConfirmDelete(true)
    } 

    else if (e.target.dataset.id === "tasks-to-in-progress") {
      // Send Task to In Progress from To-Do List
      await axios.put("/tasks", {status: "Active", uuid: uuid, type: "status"});
      setInProgress([...inprogress, tasks.find((task) => task.uuid === uuid)]);
      setTasks(tasks.filter((task) => task.uuid !== uuid));
    } 

    else if (e.target.dataset.id === "to-tasks") {
      // Send Task to To-Do List from In Progress
      await axios.put("/tasks", {status: "Waiting", uuid: uuid, type: "status"});
      setTasks([...tasks, inprogress.find((task) => task.uuid === uuid)]);
      setInProgress(inprogress.filter((task) => task.uuid !== uuid));
    } 

    else if (e.target.dataset.id=== "to-done") {
      // Send task to Done from In Progress
      await axios.put("/tasks", {status: "Done", uuid: uuid, type: "status"}).then(()=>{
        axios.put("/stats", {curr: userStats.completed_tasks, stat: "comp", op: "incr"})
        axios.put("/stats", {curr: userStats.ongoing_tasks, stat: "ongo", op: "decr"})
        setUserStats(prevStats => ({ ...prevStats, completed_tasks: prevStats.completed_tasks + 1, ongoing_tasks: prevStats.ongoing_tasks - 1 }))
      });
      setDone([...done, inprogress.find((task) => task.uuid === uuid)]);
      setInProgress(inprogress.filter((task) => task.uuid !== uuid));
    } 

    else if (e.target.dataset.id === "done-to-in-progress") {
      // Send Task to In Progress from Done List
      await axios.put("/tasks", {status: "Active", uuid: uuid, type: "status"}).then(()=>{
        axios.put("/stats", {curr: userStats.completed_tasks, stat: "comp", op: "decr"})
        axios.put("/stats", {curr: userStats.ongoing_tasks, stat: "ongo", op: "incr"})
        setUserStats(prevStats => ({ ...prevStats, completed_tasks: prevStats.completed_tasks - 1, ongoing_tasks: prevStats.ongoing_tasks + 1 }))
      })
      setInProgress([...inprogress, done.find((task) => task.uuid === uuid)])
      setDone(done.filter((task) => task.uuid !== uuid))
    } 

    else if (e.target.dataset.id === "edit-task") {
      const pressedTask = tasks.find((task)=>task.uuid===uuid)
      setInputs({
        task: pressedTask.task,
        deadline: moment(pressedTask.deadline).format("YYYY-MM-DD"),
        priority: pressedTask.priority
      })
      setClickedItem(uuid);
    }
  }

  useEffect(() => {
    setFetching(true)
    const fetchData = async () => {
      try {
        const [tasksRes, inProgressRes, doneRes] = await Promise.all([
          axios.get("/tasks", {
            params: { project_uuid: project_uuid, status: "Waiting" },
          }),
          axios.get("/tasks", {
            params: { project_uuid: project_uuid, status: "Active" },
          }),
          axios.get("/tasks", {
            params: { project_uuid: project_uuid, status: "Done" },
          }),
        ])
        setTasks(tasksRes.data);
        setInProgress(inProgressRes.data);
        setDone(doneRes.data);
      } catch (err) {
        setError("Error fetching tasks");
      }
      setFetching(false);
    }
    fetchData()
  }, [setTasks, setInProgress, setDone, setFetching, project_uuid])

  return (
    <div className="single">
      {showConfirmDelete && (
        <ConfirmDelete
          userStats={userStats}
          setUserStats={setUserStats}
          setShowConfirmDelete={setShowConfirmDelete}
          taskDeleteUuid={taskDeleteUuid}
          setError={setError}
          setTasks={setTasks}
          type={"task"}
        />
      )}
      {showAddTask && (
        <AddTask
          setShowAddTask={setShowAddTask}
          tasks={tasks}
          setTasks={setTasks}
          userStats={userStats}
          setUserStats={setUserStats}
          project_name={project_name}
          project_uuid={project_uuid}
        />
      )}
      <div className="single-header">
        <h2>{project_name}</h2>
        <button className="btn" onClick={handleAddTask}>
          Create a task
        </button>
        <Link className="back" to="/projects">
          <AiOutlineArrowLeft />
        </Link>
      </div>
      <div className="single-content">
        <div className="container">
          <div className="container-header">
            <h2>To-do List</h2>
            <p>{tasks.length + " Waiting"}</p>
          </div>
          {err ? (
            <p className="error">{err}</p>
          ) : (
            tasks.length === 0 &&
            !fetching && <p className="error">No Tasks Added</p>
          )}
          {clickedItem ? (
            <>
              <form>
                <p>Task</p>
                <input
                  className="task-name-input"
                  type="text"
                  placeholder="Task"
                  value={inputs.task}
                  name="task"
                  onChange={handleChange}
                />
                <p>Deadline</p>
                <input 
                  type="date" 
                  value={inputs.deadline}
                  name="deadline"
                  onChange={handleChange}
                />
                <p>Priority</p>
                <select value={inputs.priority} name="priority" onChange={handleChange}>
                  <option value="">-- Select an option --</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </form>
              <div className="task-buttons">
                <button data-id="cancel" className="btn" onClick={handleEditCancel}>
                  Back
                </button>
                <button className="btn btn-main" onClick={handleSubmit}>Save</button>
              </div>
            </>
          ) : (
            tasks.map((singletask) => {
              const { uuid, task } = singletask;
              return (
                <div
                  className="task to-do"
                  data-id="edit-task"
                  key={uuid}
                  onClick={(e) => handleClick(e, uuid)}
                >
                  <p className="task-name">{task}</p>
                  <button data-id="delete-task">
                    <MdDelete className="icon" />
                  </button>
                  <button data-id="tasks-to-in-progress">
                    <BsArrowRightCircleFill className="icon" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        <div className="container">
          <div className="container-header">
            <h2>In Progress</h2>
            <p>{inprogress.length + " Active"}</p>
          </div>
          {fetching && tasks.length === 0 ? (
            <Loader />
          ) : err ? (
            <p className="error">{err}</p>
          ) : (
            inprogress.length === 0 &&
            !fetching && <p className="error">No Tasks Added</p>
          )}
          {inprogress.map((singletask) => {
            const { uuid, task } = singletask;
            return (
              <div
                className="task in-progress"
                key={uuid}
              >
                <p className="task-name">{task}</p>
                <button data-id="to-tasks" onClick={(e) => handleClick(e, uuid)}>
                  <BsArrowLeftCircleFill className="icon" />
                </button>
                <button data-id="to-done" onClick={(e) => handleClick(e, uuid)}>
                  <IoCheckmarkDoneOutline className="icon" />
                </button>
              </div>
            );
          })}
        </div>
        <div className="container">
          <div className="container-header">
            <h2>Done</h2>
            <p>{done.length + " Done"}</p>
          </div>
          {err ? (
            <p className="error">{err}</p>
          ) : (
            done.length === 0 &&
            !fetching && <p className="error">No Tasks Added</p>
          )}
          {done.map((singletask) => {
            const { uuid, task } = singletask;
            return (
              <div
                className="task done"
                key={uuid}
              >
                <p className="task-name">{task}</p>
                <button data-id="done-to-in-progress" onClick={(e) => handleClick(e, uuid)}>
                  <BsArrowLeftCircleFill className="icon" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Single;
