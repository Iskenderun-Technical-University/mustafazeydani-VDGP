import React, { useState } from 'react'
import "./addproject.css"

function AddProject({ setShowDialog }) {

  const [selectedOption, setSelectedOption] = useState("")

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  }

  const handleCancelClick = () =>{
    setShowDialog(false)
  }

  const handleSaveClick = () => {
    // Save project details
    // ...
    
    // Close dialog
    setShowDialog(false);
  }
  return (
    <div className='add-project'>
      <div className="modal">
        <form>
          <h2>Create a project</h2>
          <div className="modal-content">
            <label htmlFor="project-name">Project Name</label>
            <input id="project-name" type="text" placeholder="project name"/>
            <p>Select project's field</p>
            <select value={selectedOption} onChange={handleChange} className='select'>
              <option value="">-- Select an option --</option>
              <option value='web'>Web Development</option>
              <option value='due-time'>By due time</option>
            </select>
            <div className="modal-buttons">
              <button className='btn' onClick={handleCancelClick}>Cancel</button>
              <button className='btn btn-main' onClick={handleSaveClick}>Add</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProject