import axios from 'axios'
import React from 'react'
import "./confirmdelete.css"
import "../common.css"

function ConfirmDelete({setProjects, selectedProjects, setShowConfirmDelete, setAreAllSelected, setError}) {

  const handleCancelClick = () =>{
    setShowConfirmDelete(false)
  }

  const handleSubmit = async e => {
    try{
      await axios.delete("/projects", {params: { uuids: selectedProjects }})
      setProjects((prevProjects) =>
        prevProjects.filter((project) => !selectedProjects.includes(project.uuid))
      )
    }
    catch(err) {
      setError(err.response.message)
    }
    setShowConfirmDelete(false)
    setAreAllSelected(false)
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