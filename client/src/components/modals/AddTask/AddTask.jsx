import React, { useState } from "react";
import "./addtask.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

function AddTask({
  setShowAddTask,
  projCompleted,
  setProjCompleted,
  setWaiting,
  setAllTasks,
  userStats,
  setUserStats,
  project_name,
  project_uuid,
}) {
  const [inputs, setInputs] = useState({
    task: "",
    deadline: "",
    priority: "",
  })
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCancelClick = () => {
    setShowAddTask(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      validateInput()

      const requestData = {
        uuid: uuidv4(),
        project_uuid: project_uuid,
        ...inputs,
        status: "Waiting",
        project_name: project_name,
      }

      await axios.post("/tasks", requestData).then(() => {
        axios.put("/stats", {
          curr: userStats.ongoing_tasks,
          stat: "ongo",
          op: "incr",
          count: 1,
        });
        setUserStats((prevStats) => ({
          ...prevStats,
          completed_projects: projCompleted
            ? prevStats.completed_projects - 1
            : prevStats.completed_projects,
          ongoing_tasks: prevStats.ongoing_tasks + 1,
          overdue_tasks: moment(inputs.deadline).isBefore(moment())
            ? prevStats.overdue_tasks + 1
            : prevStats.overdue_tasks,
        }))
      })

      projCompleted && setProjCompleted(false)

      setAllTasks((prevState) => [...prevState, requestData]);
      setWaiting((prevState) => [...prevState, requestData]);
      setShowAddTask(false)
    } catch (err) {
      setError(err.message)
    }
  }

  const validateInput = () => {
    const {task, deadline, priority} = inputs
    if(!task)
      throw new Error("Task is required!")
    else if(!deadline)
      throw new Error("Deadline is required")
    else if(!priority)
      throw new Error("Priotiry is required!")
  }

  return (
    <div className="add-task modal-back">
      <div className="modal">
        <form>
          <h2>Create a task</h2>
          <div className="modal-content">
            <label htmlFor="task">Enter a task *</label>
            <input
              name="task"
              id="task"
              onChange={handleChange}
              type="text"
              placeholder="Task"
            />
            <label htmlFor="deadline">Choose deadline *</label>
            <input
              name="deadline"
              id="deadline"
              onChange={handleChange}
              type="date"
              placeholder="Task"
            />
            <label htmlFor="priority">Choose priority *</label>
            <select name="priority" id="priority" onChange={handleChange}>
              <option value="">-- Select an option --</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            {error&&<p className="error">{error}</p>}
            <div className="modal-buttons">
              <button className="btn" onClick={handleCancelClick}>
                Cancel
              </button>
              <button className="btn btn-main" onClick={handleSubmit}>
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
