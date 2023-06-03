import axios from 'axios'
import React from 'react'
import moment from 'moment'
import "./confirmdelete.css"
import "../common.css"

function ConfirmDelete({
  userStats, setUserStats, // User Stats
  setWaiting, taskToDelete, allTasks, // Tasks 
  noteToDelete, setAllNotes, // Notes
  setAllProjects, selectedProjects, setSelectedProjects, setAreAllSelected, // Projects
  setError, setShowConfirmDelete, type // Common
}) {

  const handleCancelClick = () =>{
    setShowConfirmDelete(false)
  }

  const handleSubmit = async () => {
    if(type==="project") { // delete project
      try{
        const deletedOngoingTasksCount = allTasks.filter((task)=> 
          selectedProjects.includes(task.project_uuid) && task.status!=="Done"
        ).length
        const deletedOverdueTasksCount = allTasks.filter((task)=>
          selectedProjects.includes(task.project_uuid) && moment(task.deadline).isBefore(moment())).length
        await axios.delete("/projects", {params: { uuids: selectedProjects }})
        axios.put("/stats", {curr: userStats.ongoing_tasks, stat: "ongo", op: "decr", count: deletedOngoingTasksCount})
        setUserStats(prevStats => ({ 
          ...prevStats, 
          ongoing_tasks: prevStats.ongoing_tasks - deletedOngoingTasksCount,
          overdue_tasks: prevStats.overdue_tasks - deletedOverdueTasksCount 
        }))
        setAllProjects((prevProjects) =>
          prevProjects.filter((project) => !selectedProjects.includes(project.uuid))
        )
      }
      catch(err) {
        setError(err.message)
      }
      setSelectedProjects([])
      setAreAllSelected(false)
    }
    
    else if(type==="task") { // delete task
      try{
        await axios.delete("/tasks", {params: { uuid: taskToDelete.uuid }}).then(()=>{
          axios.put("/stats", {curr: userStats.ongoing_tasks, stat: "ongo", op: "decr", count: 1})
          setUserStats((prevStats) => ({
            ...prevStats,
            ongoing_tasks: prevStats.ongoing_tasks - 1,
            overdue_tasks: moment(taskToDelete.deadline).isBefore(moment())
              ? prevStats.overdue_tasks - 1
              : prevStats.overdue_tasks,
          }));
        })
        setWaiting((prevTasks) => prevTasks.filter((task) => task.uuid !== taskToDelete.uuid))
      }
      catch(err) {
        setError(err.message)
      }
    }

    else if(type==="note") { // delete note
      try {
        await axios.delete("/notes", {params: { uuid: noteToDelete }})
        setAllNotes((prevNotes)=>prevNotes.filter((note)=>note.uuid!==noteToDelete))
      }
      catch(err) {
        setError(err.message)
      }
    }
    setShowConfirmDelete(false)
  }
  
  return (
    <div className='confirm-delete modal-back'>
      <div className="modal">
        <div className="modal-content">
          <p>This item will be permanently deleted. Do you want to confirm?</p>
          <div className="modal-buttons">
            <button className='btn' onClick={handleCancelClick}>Cancel</button>
            <button className='btn btn-main' onClick={handleSubmit}>Confirm</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDelete