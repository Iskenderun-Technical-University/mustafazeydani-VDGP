import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import Loader from '../../components/loader/Loader'
import moment from "moment"
import "./tasks.css"

function Tasks({setSelectedMenu, allTasks, setAllTasks, taskSortBy, setTaskSortBy, taskFilter, setTaskFilter}) {
  const [err, setError] = useState(null)
  const [tasks, setTasks] = useState([])
  const [fetching, setFetching] = useState(false)

  const navigate = useNavigate()

  const handleRowClick = (uuid, name) => {
    navigate(`/projects/${name.replace(/\s+/g, "-")}/${uuid}`)
    setSelectedMenu("projects")
  }

  const handleSort = (param) => {
    if(param==="deadline-nearest")
      tasks.sort((a,b)=> moment(a.deadline).isAfter(moment(b.deadline)) ? 1 : -1)
    else if(param==="deadline-farthest")
      tasks.sort((a,b)=> moment(a.deadline).isBefore(moment(b.deadline)) ? 1 : -1)
    else if(param==="priority-ascending") {
      tasks.sort((a, b) => {
        const priorityOrder = { Low: 0, Medium: 1, High: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      })
    }
    else if(param==="priority-descending"){
      tasks.sort((a, b) => {
        const priorityOrder = { Low: 2, Medium: 1, High: 0 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      })
    }
    else if(param==="task-ascending")
      tasks.sort((a,b)=> a.task > b.task ? 1 : -1)
    else if(param==="task-descending")
      tasks.sort((a,b)=> a.task < b.task ? 1 : -1)
  }

  const handleFilter = (param) => {
    if(param!=="All")
      setTasks(allTasks.filter((task)=>task.status===param))
    else
      setTasks([...allTasks])
  }

  handleSort(taskSortBy)
  useEffect(()=>{
    handleFilter(taskFilter) // eslint-disable-next-line
  }, [taskFilter, allTasks])

  useEffect(() => {
    setFetching(true)
    const fetchData = async () => {
      try {
        const res = await axios.get("/tasks/all")
        setAllTasks(res.data)
      } catch (err) {
        setError("Error fetching tasks")
      }
      setFetching(false)
    }
    fetchData()
  }, [setAllTasks, setFetching])

  useEffect(()=>{
    setTasks([...allTasks])
  }, [allTasks])

  return (
    <div className='tasks'>
      <div className='tasks-header'>
        <div className="filter">
          <p className="filter-type">Status</p>
          <select
            value={taskFilter}
            onChange={(e)=>setTaskFilter(e.target.value)}
            className="select"
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Waiting">Waiting</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <div className="filter">
          <p className="filter-type">Sort By</p>
          <select
            value={taskSortBy}
            onChange={(e)=>setTaskSortBy(e.target.value)}
            className="select"
          >
            <option value="deadline-nearest">Deadline (Nearest)</option>
            <option value="deadline-farthest">Deadline (Farthest)</option>
            <option value="task-ascending">Task (Ascending)</option>
            <option value="task-descending">Task (Descending)</option>
            <option value="priority-ascending">Priority (Ascending)</option>
            <option value="priority-descending">Priority (Descending)</option>
          </select>
        </div>
      </div>
      
      <div className="table-container">
        {fetching && allTasks.length===0?
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
               <td className={`deadline ${moment(deadline).isBefore() ? 'red' : ''}`}>{moment(deadline).format("YYYY-MM-DD")}</td>
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