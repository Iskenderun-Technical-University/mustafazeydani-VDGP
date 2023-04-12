import { useContext, useEffect, useState } from 'react'
import {
  BiCheckbox,
  // BiCheckboxChecked,
} from 'react-icons/bi'
import {
  AiFillStar
} from 'react-icons/ai'
import {AiFillDelete} from 'react-icons/ai'
import './projects.css'
import axios from 'axios'
import { AuthContext } from '../../context/authContext'


const Home = () => {

  const [projects, setProjects] = useState([])

  const [err, setError] = useState(null)

  useEffect(()=>{
    const fetchData = async () =>{
      try {
        const res = await axios.get("/projects")
        setProjects(res.data)
      }
      catch(err) {
        setError("Error fetching projects")
      }
    }
    fetchData()
  },[])

  const [selectedOption, setSelectedOption] = useState("name")

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  }
  
  return (
    <div className='projects'>
      <div className='top-bar'>
        <div className='top-bar-icons'>
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
      <div className="projects-items">
        {err ? (<p>{err}</p>) : projects.length === 0 && (<p>No Projects Added</p>)}
        {projects.map((project) => {
          const { uuid, name, description, field, is_favourite } = project;
          return (
            <div className="projects-item flexFont" key={uuid}>
              <h2 className="project-name">{name}</h2>
              <p className="project-details">{description}</p>
              <div className="project-category">{field}</div>
              <div className="project-footer">
                <p className="project-creation">1 day go</p>
                <div className="project-icons">
                  <AiFillStar
                    className="project-fav-icon"
                    style={{
                      color: is_favourite ? "yellow" : "var(--color-darkgrey)",
                    }}
                  />
                  <BiCheckbox className="project-select-icon" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Home