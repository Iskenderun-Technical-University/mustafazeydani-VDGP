import React, { useState, useEffect } from "react";
import AddTask from "../../components/modals/AddTask/AddTask";
import { Link, useLocation } from "react-router-dom";
import { MdStart, MdDelete } from "react-icons/md";
import { AiOutlineArrowLeft } from "react-icons/ai";
import axios from "axios";
import "./single.css";
import ConfirmDelete from "../../components/modals/ConfirmDelete/ConfirmDelete";
import Loader from "../../components/loader/Loader";
import moment from "moment";

function Single({ fetching, setFetching }) {
  const { state } = useLocation();
  const { project_uuid, project_name } = state;

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
    } else if (e.target.dataset.id === "to-in-progress") {
      // Update task and make it in progress
      await axios.put("/tasks", {status: "Active", uuid: uuid, type: "status"});
      setInProgress([...inprogress, tasks.find((task) => task.uuid === uuid)]);
      setTasks(tasks.filter((task) => task.uuid !== uuid));
    } else if (e.target.dataset.id === "to-tasks") {
      // Update task and make it in to do list
      await axios.put("/tasks", {status: "Waiting", uuid: uuid, type: "status"});
      setTasks([...tasks, inprogress.find((task) => task.uuid === uuid)]);
      setInProgress(inprogress.filter((task) => task.uuid !== uuid));
    } else if (e.target.dataset.id === "edit-task") {
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
    setFetching(true);
    const fetchData = async () => {
      try {
        // fetch To-Do-Tasks
        let res = await axios.get("/tasks", {
          params: { project_uuid: project_uuid, status: "Waiting" },
        });
        setTasks(res.data);
        // fetch In-Progress-Tasks
        res = await axios.get("/tasks", {
          params: { project_uuid: project_uuid, status: "Active" },
        });
        setInProgress(res.data);
        // fetch Done Tasks
        res = await axios.get("/tasks", {
          params: { project_uuid: project_uuid, status: "Done" },
        });
        setDone(res.data);
      } catch (err) {
        setError("Error fetching tasks");
      }
      setFetching(false);
    };
    fetchData();
  }, [setTasks, setFetching, project_uuid]);

  return (
    <div className="single">
      {showConfirmDelete && (
        <ConfirmDelete
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
                  className="task"
                  data-id="edit-task"
                  key={uuid}
                  onClick={(e) => handleClick(e, uuid)}
                >
                  <p className="task-name">{task}</p>
                  <button data-id="delete-task">
                    <MdDelete className="icon" />
                  </button>
                  <button data-id="to-in-progress">
                    <MdStart className="icon" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        <div className="in-progress container">
          <h2>In-Progress</h2>
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
                className="task"
                key={uuid}
              >
                <p className="task-name">{task}</p>
                <button data-id="to-tasks" onClick={(e) => handleClick(e, uuid)}>
                  <MdStart className="icon" />
                </button>
              </div>
            );
          })}
        </div>
        <div className="done container">
          <h2>Done</h2>
          {err ? (
            <p className="error">{err}</p>
          ) : (
            done.length === 0 &&
            !fetching && <p className="error">No Tasks Added</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Single;
