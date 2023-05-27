import React, { useState } from 'react'
import "./addproject.css"
import "../common.css"
import axios from 'axios'
import moment from "moment"
import { v4 as uuidv4 } from "uuid"

function AddProject({ allProjects, setAllProjects, setShowDialog}) {
  const [inputs, setInputs] = useState({
    name:"",
    field:"",
    description:""
  })

  const handleChange = (e) => {
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  const handleCancelClick = () =>{
    setShowDialog(false)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const requestData = {
        uuid: uuidv4(),
        ...inputs,
        creation_date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
      }
      await axios.post("/projects", requestData)
      setAllProjects([...allProjects, requestData])
    }
    catch(err) {
      //
    }
    setShowDialog(false)
  }

  return (
    <div className='add-project modal-back'>
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
              <option value='Mobile App Development'>Mobile App Development</option>
              <option value='Blockchain'>Blockchain</option>
              <option value='Artificial Intelligence'>Artificial Intelligence</option>
              <option value='Game Development'>Game Development</option>
              <option value='Other'>Other</option>
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