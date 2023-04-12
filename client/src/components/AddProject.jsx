import React, { useState } from 'react'
import "./addproject.css"
import axios from 'axios'
import moment from "moment"

function AddProject({ setShowDialog }) {

  const [inputs, setInputs] = useState({
    name:"",
    field:"",
    description:""
  })

  const [err, setError] = useState(null)


  const handleChange = (e) => {
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  const handleCancelClick = () =>{
    setShowDialog(false)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    
    try {
      await axios.post("/projects", {
        ...inputs,
        creation_date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
      })
    }
    catch (err) {
      setError(err.response.data)
    }
    // Close dialog
    setShowDialog(false);
  }
  return (
    <div className='add-project'>
      <div className="modal">
        <form>
          <h2>Create a project</h2>
          <div className="modal-content">
            <label htmlFor="projectname">Project Name</label>
            <input
              name="name" 
              onChange={handleChange} 
              id="projectname" 
              type="text" 
              placeholder="Project name" 
            />
            <p>Select project's field</p>
            <select name="field" onChange={handleChange}>
              <option value="">-- Select an option --</option>
              <option value='Web Development'>Web Development</option>
              <option value='Cyber Security'>Cyber Security</option>
            </select>
            <p>Description</p>
            <textarea 
              name="description" 
              onChange={handleChange}
              rows="4"
              placeholder="Enter description..."
            />

            <div className="modal-buttons">
              <button className='btn' onClick={handleCancelClick}>Cancel</button>
              <button className='btn btn-main' onClick={handleSubmit}>Add</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProject