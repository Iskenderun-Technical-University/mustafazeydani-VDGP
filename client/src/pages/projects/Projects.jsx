import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { BiCheckbox, BiCheckboxChecked } from "react-icons/bi"
import { AiFillDelete } from "react-icons/ai"
import Loader from "../../components/loader/Loader"
import "./projects.css"
import axios from "axios"
import moment from "moment"
import ConfirmDelete from "../../components/modals/ConfirmDelete/ConfirmDelete"

const Projects = ({
  allProjects,
  setAllProjects,
  allTasks,
  selectedProjects,
  setSelectedProjects,
  fetching,
  setFetching,
  projectSortBy,
  setProjectSortBy,
  projectFilter,
  setProjectFilter,
  userStats,
  setUserStats
}) => {
  const navigate = useNavigate()

  const [err, setError] = useState(null)
  const [areAllSelected, setAreAllSelected] = useState(false)
  const [toggledCheckboxes, setToggledCheckboxes] = useState({})
  const [projects, setProjects] = useState([])
  
  
  const handleSelectAll = () => {
    const allUuids = projects.map((project) => project.uuid)
    const isAllSelected = allUuids.every((uuid) =>
      selectedProjects.includes(uuid)
    );

    if (isAllSelected) {
      setToggledCheckboxes({})
      setSelectedProjects([])
      setAreAllSelected(false)
    } else {
      const toggledState = allUuids.reduce((acc, uuid) => {
        acc[uuid] = true
        return acc
      }, {})
      setToggledCheckboxes(toggledState)
      setSelectedProjects(allUuids)
      setAreAllSelected(true)
    }
  }

  const handleSelect = (e, uuid, name) => {
    if (
      e.target.dataset.id==="checkbox"
    ) {
      setToggledCheckboxes((prevState) => ({
        ...prevState,
        [uuid]: !prevState[uuid],
      }))
      setSelectedProjects((prevSelectedProjects) => {
        if (prevSelectedProjects.includes(uuid))
          return prevSelectedProjects.filter((id) => id !== uuid)
        else return [...prevSelectedProjects, uuid]
      })
    } else {
      navigate(`/projects/${name.replace(/\s+/g, "-")}/${uuid}`)
    }
  }

  useEffect(() => {
    setFetching(true)
    const fetchData = async () => {
      try {
        const res = await axios.get("/projects")
        setAllProjects(res.data)
      } 
      catch (err) {
        setError("Error fetching projects")
      }
      setFetching(false)
    }
    fetchData()
  }, [setProjects, setFetching, setAllProjects])

  useEffect(()=>{
    setProjects([...allProjects])
  }, [allProjects])

  const handleSort = (param) => {
    if(param==="creation-newest")
      projects.sort((a,b)=> moment(a.creation_date).isBefore(moment(b.creation_date)) ? 1 : -1)
    else if(param==="creation-oldest")
      projects.sort((a,b)=> moment(a.creation_date).isAfter(moment(b.creation_date)) ? 1 : -1)
    else if(param==="name-ascending")
      projects.sort((a,b)=> a.name > b.name ? 1 : -1)
    else if(param==="name-descending")
      projects.sort((a,b)=> a.name < b.name ? 1 : -1)
  }

  const handleFilter = (param) => {
    if(param!=="All")
      setProjects(allProjects.filter((project)=>project.field===param))
    else 
      setProjects([...allProjects])
  }

  handleSort(projectSortBy)
  
  useEffect(()=>{
    handleFilter(projectFilter) // eslint-disable-next-line
  }, [projectFilter, allProjects])

  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const handleDeleteButtonClick = () => {
    if (selectedProjects.length !== 0) setShowConfirmDelete(true)
  }

  return (
    <div className="projects">
      {showConfirmDelete && (
        <ConfirmDelete
          userStats={userStats}
          setUserStats={setUserStats}
          setAllProjects={setAllProjects}
          allTasks={allTasks}
          selectedProjects={selectedProjects}
          setShowConfirmDelete={setShowConfirmDelete}
          setSelectedProjects={setSelectedProjects}
          setAreAllSelected={setAreAllSelected}
          setError={setError}
          type={"project"}
        />
      )}
      <div className="top-bar">
        <div className="top-bar-icons">
          {!areAllSelected ? (
            <BiCheckbox
              onClick={handleSelectAll}
              className="checkbox checkbox-main"
            />
          ) : (
            <BiCheckboxChecked
              onClick={handleSelectAll}
              className="checkbox checkbox-main"
            />
          )}
          <AiFillDelete
            onClick={handleDeleteButtonClick}
            className="project-delete-icon"
          />
        </div>
        <div className="filter">
          <p className="filter-type">Category</p>
          <select
            value={projectFilter}
            onChange={(e)=>setProjectFilter(e.target.value)}
            className="select"
          >
            <option value="All">All</option>
            <option value="Web Development">Web Development</option>
            <option value="Cyber Security">Cyber Security</option>
            <option value="Mobile App Development">Mobile App Development</option>
            <option value="Blockchain">Blockchain</option>
            <option value="Artificial Intelligence">Artificial Intelligence</option>
            <option value="Game Development">Game Development</option>  
            <option value="Other">Other</option>  
          </select>
        </div>

        <div className="filter">
          <p className="filter-type">Sort By</p>
          <select
            value={projectSortBy}
            onChange={(e)=>setProjectSortBy(e.target.value)}
            className="select"
          >
            <option value="creation-newest">Creation Date (Newest)</option>
            <option value="creation-oldest">Creation Date (Oldest)</option>
            <option value="name-ascending">Name (ascending)</option>
            <option value="name-descending">Name (descending)</option>
          </select>
        </div>
      </div>
      <div className="projects-items">
        {fetching && projects.length===0 ? (
          <Loader />
        ) : err ? (
          <p className="error">{err}</p>
        ) : (
          projects.length === 0 && <p className="error">No Projects Added</p>
        )}
        {projects.map((project) => {
          const {
            uuid,
            name,
            description,
            field,
            creation_date
          } = project;
          const isCheckboxToggled = !toggledCheckboxes[uuid];
          return (
            <div
              className="projects-item flexFont"
              key={uuid}
              onClick={(e) => handleSelect(e, uuid, name)}
            >
              <h2 className="project-name">{name}</h2>
              <p className="project-details">{description}</p>
              <div className={"project-category " + field.split(" ")[0]}>{field}</div>
              <div className="project-footer">
                <p className="project-creation">
                  {moment(creation_date).fromNow()}
                </p>
                <div className="project-icons">
                  {isCheckboxToggled ? (
                    <button className="checkbox" data-id="checkbox"><BiCheckbox className="no-event" /></button>
                  ) : (
                    <button className="checkbox" data-id="checkbox"><BiCheckboxChecked className="no-event" /></button> 
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Projects
