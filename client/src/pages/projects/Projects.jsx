import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { BiCheckbox, BiCheckboxChecked } from "react-icons/bi"
import { AiFillStar } from "react-icons/ai"
import { AiFillDelete } from "react-icons/ai"
import Loader from "../../components/loader/Loader"
import "./projects.css"
import axios from "axios"
import moment from "moment"
import ConfirmDelete from "../../components/modals/ConfirmDelete/ConfirmDelete"

const Projects = ({
  projects,
  setProjects,
  selectedProjects,
  setSelectedProjects,
  fetching,
  setFetching,
}) => {
  const navigate = useNavigate()

  const [err, setError] = useState(null)
  const [areAllSelected, setAreAllSelected] = useState(false)
  const [toggledCheckboxes, setToggledCheckboxes] = useState({})

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

  const handleSelect = (e, uuid) => {
    if (
      e.target.className.baseVal === "project-checkbox" ||
      e.target.className.baseVal === ""
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
      navigate(`/${uuid}`)
    }
  }

  useEffect(() => {
    setFetching(true)
    const fetchData = async () => {
      try {
        const res = await axios.get("/projects")
        setProjects(res.data)
      } catch (err) {
        setError("Error fetching projects")
      }
      setFetching(false)
    }
    fetchData()
  }, [setProjects])

  const [selectedOption, setSelectedOption] = useState("name")
  const handleChange = (event) => {
    setSelectedOption(event.target.value)
  };

  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const handleDeleteButtonClick = () => {
    if (selectedProjects.length !== 0) setShowConfirmDelete(true)
  };

  return (
    <div className="projects">
      {showConfirmDelete && (
        <ConfirmDelete
          setProjects={setProjects}
          selectedProjects={selectedProjects}
          setShowConfirmDelete={setShowConfirmDelete}
          setAreAllSelected={setAreAllSelected}
        />
      )}
      <div className="top-bar">
        <div className="top-bar-icons">
          {!areAllSelected ? (
            <BiCheckbox
              onClick={handleSelectAll}
              className="project-checkbox checkbox-main"
            />
          ) : (
            <BiCheckboxChecked
              onClick={handleSelectAll}
              className="project-checkbox checkbox-main"
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
            value={selectedOption}
            onChange={handleChange}
            className="select"
          >
            <option value="name">By name</option>
            <option value="due-time">By due time</option>
          </select>
        </div>

        <div className="filter">
          <p className="filter-type">Sort By</p>
          <select
            value={selectedOption}
            onChange={handleChange}
            className="select"
          >
            <option value="name">By name</option>
            <option value="due-time">By due time</option>
          </select>
        </div>
      </div>
      <div className="projects-items">
        {fetching ? (
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
            creation_date,
            is_favourite,
          } = project;
          const isCheckboxToggled = !toggledCheckboxes[uuid];
          return (
            <div
              className="projects-item flexFont"
              key={uuid}
              onClick={(e) => handleSelect(e, uuid)}
            >
              <h2 className="project-name">{name}</h2>
              <p className="project-details">{description}</p>
              <div className="project-category">{field}</div>
              <div className="project-footer">
                <p className="project-creation">
                  {moment(creation_date).fromNow()}
                </p>
                <div className="project-icons">
                  <AiFillStar
                    className="project-fav-icon"
                    style={{
                      color: is_favourite ? "yellow" : "var(--color-darkgrey)",
                    }}
                  />
                  {isCheckboxToggled ? (
                    <BiCheckbox className="project-checkbox" />
                  ) : (
                    <BiCheckboxChecked className="project-checkbox" />
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
