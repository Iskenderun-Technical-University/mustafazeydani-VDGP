import {
  BiCheckbox,
  BiCheckboxChecked,
} from 'react-icons/bi'
import {
  AiFillStar
} from 'react-icons/ai'
import {AiFillDelete} from 'react-icons/ai'
import './projects.css'


const Home = () => {

  return (
    <div className='projects'>
      <div className='top-bar'>
        <div className='top-bar-icons'>
          <BiCheckbox/>
          <AiFillDelete/>
        </div>
        <div className="filter">
          <p className="filter-type">Category</p>
          <select className='select'>
            <option selected>By name</option>
            <option value='due-time'>By due time</option>
          </select>
        </div>

        <div className="filter">
          <p className="filter-type">Sort By</p>
          <select className='select'>
            <option selected>By name</option>
            <option value='due-time'>By due time</option>
          </select>
        </div>
      </div>
      <div className="projects-items">

        <div className="projects-item flexFont">
          <h2 className='project-name'>Financial System</h2>
          <ul className="project-details">
            <li>Website Architecture</li>
            <li>Web Design</li>
          </ul>
          <div className="project-category">Web Development</div>
          <div className="project-footer">
            <p className='project-creation'>1 day go</p>
            <div className="project-icons">
              <AiFillStar className='project-fav-icon' />
              <BiCheckbox className='project-select-icon' />
            </div>
          </div>
        </div>

        <div className="projects-item flexFont">
          <h2 className='project-name'>Financial System</h2>
          <ul className="project-details">
            <li>Website Architecture</li>
            <li>Web Design</li>
          </ul>
          <div className="project-footer">
            <p className='project-creation'>1 day go</p>
            <div className="project-icons">
              <AiFillStar className='project-fav-icon' />
              <BiCheckbox className='project-select-icon' />
            </div>
          </div>
        </div>

        <div className="projects-item flexFont">
          <h2 className='project-name'>Financial System</h2>
          <ul className="project-details">
            <li>Website Architecture</li>
            <li>Web Design</li>
          </ul>
          <div className="project-footer">
            <p className='project-creation'>1 day go</p>
            <div className="project-icons">
              <AiFillStar className='project-fav-icon' />
              <BiCheckbox className='project-select-icon' />
            </div>
          </div>
        </div>

        <div className="projects-item flexFont">
          <h2 className='project-name'>Financial System</h2>
          <ul className="project-details">
            <li>Website Architecture</li>
            <li>Web Design</li>
          </ul>
          <div className="project-footer">
            <p className='project-creation'>1 day go</p>
            <div className="project-icons">
              <AiFillStar className='project-fav-icon' />
              <BiCheckbox className='project-select-icon' />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Home