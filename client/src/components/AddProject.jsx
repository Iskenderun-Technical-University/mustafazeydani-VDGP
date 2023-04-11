import React from 'react'
import "./addproject.css"

function AddProject({ setShowDialog }) {

  const handleSaveClick = () => {
    // Save project details
    // ...
    
    // Close dialog
    setShowDialog(false);
  }
  return (
    <div className='add-project'>
      <div className="modal">
        
      </div>
    </div>
  )
}

export default AddProject