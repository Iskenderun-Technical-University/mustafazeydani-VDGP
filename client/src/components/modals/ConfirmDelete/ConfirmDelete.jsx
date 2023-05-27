import axios from 'axios'
import React from 'react'
import "./confirmdelete.css"
import "../common.css"

function ConfirmDelete({
  setTasks, taskDeleteUuid, // Tasks 
  setAllProjects, selectedProjects, setSelectedProjects, setAreAllSelected, // Projects
  setError, setShowConfirmDelete, type // Common
}) {

  const handleCancelClick = () =>{
    setShowConfirmDelete(false)
  }

  const handleSubmit = async e => {
    if(type==="project") { // delete project
      try{
        await axios.delete("/projects", {params: { uuids: selectedProjects }})
        setAllProjects((prevProjects) =>
          prevProjects.filter((project) => !selectedProjects.includes(project.uuid))
        )
      }
      catch(err) {
        setError(err.response.message)
      }
      setSelectedProjects([])
      setAreAllSelected(false)
    }
    
    else if(type==="task") { // delete task
      try{
        await axios.delete("/tasks", {params: { uuid: taskDeleteUuid }})
        setTasks((prevTasks) => prevTasks.filter((task) => task.uuid !== taskDeleteUuid))
      }
      catch(err) {
        setError(err.response.message)
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