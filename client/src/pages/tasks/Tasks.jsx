import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Loader from '../../components/loader/Loader'
import moment from "moment"

import {
  BiCheckbox,
  // BiCheckboxChecked,
} from 'react-icons/bi'
import {AiFillDelete} from 'react-icons/ai'
import "./tasks.css"

function Tasks() {
  const [err, setError] = useState(null)
  const [tasks, setTasks] = useState([])
  const [fetching, setFetching] = useState(false)
  const [selectedOption, setSelectedOption] = useState("name")

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  }

  useEffect(() => {
    setFetching(true)
    const fetchData = async () => {
      try {
        const res = await axios.get("/tasks/all")
        setTasks(res.data)
      } catch (err) {
        setError("Error fetching tasks")
      }
      setFetching(false)
    }
    fetchData()
  }, [setTasks, setFetching])

  return (
    <div className='tasks'>
      <div className='tasks-header'>
        <div className='tasks-header-icons'>
          <BiCheckbox/>
          <AiFillDelete/>
        </div>
        <div className="filter">
          <p className="filter-type">Category</p>
          <select value={selectedOption} onChange={handleChange} className='select'>
            <option value='name'>By name</option>
            <option value='due-time'>By due time</option>
          </select>
        </div>

        <div className="filter">
          <p className="filter-type">Sort By</p>
          <select value={selectedOption} onChange={handleChange} className='select'>
            <option value="name">By name</option>
            <option value='due-time'>By due time</option>
          </select>
        </div>
      </div>
      
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Task name</th>
              <th>Deadline</th>
              <th className='status'>Status</th>
              <th>Project</th>
              <th className='priority-header'>
                <p className='priority'>Priority</p>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {fetching?<Loader/>:err ?<p>{err}</p>:
            tasks.map((task)=>{
               return(
                <tr>
               <td><input type="checkbox"/></td>
               <td>{task.task}</td>
               <td className='deadline'>{moment(task.deadline).format("YYYY-MM-DD")}</td>
               <td>
                 <p className={task.status + " status"}>{task.status}</p>
               </td>
               <td>{task.project_name}</td>
               <td className="priority-cell" colSpan={task.status!=="Active" && "2"}>
                <p className={task.priority + " priority"}>{task.priority}</p>
               </td> 
               {task.status==="Active" && 
                <td className='mark-as-done-cell'>
                  <button className='mark-as-done'>Mark As Done</button>
                </td>
               }
              </tr>
               )
            })}
           
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Tasks