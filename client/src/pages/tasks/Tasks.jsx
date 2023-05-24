import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import Loader from '../../components/loader/Loader'
import moment from "moment"
import "./tasks.css"

function Tasks() {
  const [err, setError] = useState(null)
  const [tasks, setTasks] = useState([])
  const [fetching, setFetching] = useState(false)
  const [selectedOption, setSelectedOption] = useState("name")

  const navigate = useNavigate()

  const handleRowClick = (uuid, name) => {
    navigate(`/projects/${name}/${uuid}`)
  }

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
        {fetching?
          <Loader/>:
          err?
          <p className='error'>Error fetching tasks</p>:
          tasks.length===0&&
          <p className='error'>No tasks added</p>
        }
        <table>
          <thead>
            <tr>
              <th>Task name</th>
              <th>Deadline</th>
              <th className='status'>Status</th>
              <th>Project</th>
              <th className='priority'>Priority</th>
            </tr>
          </thead>
          <tbody>{
            tasks.map((singletask)=>{
              const {uuid, task, status, deadline, project_name, project_uuid, priority} = singletask
              return(
                <tr key={uuid} onClick={()=>handleRowClick(project_uuid, project_name)}>
               <td className='task-name'>{task}</td>
               <td className='deadline'>{moment(deadline).format("YYYY-MM-DD")}</td>
               <td>
                 <p className={status + " status"}>{status}</p>
               </td>
               <td>{project_name}</td>
               <td>
                <p className={priority + " priority"}>{priority}</p>
               </td> 
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