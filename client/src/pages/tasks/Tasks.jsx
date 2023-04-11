import React, {useState} from 'react'
import {
  BiCheckbox,
  // BiCheckboxChecked,
} from 'react-icons/bi'
import {AiFillDelete} from 'react-icons/ai'
import "./tasks.css"

function Tasks() {
  const [selectedOption, setSelectedOption] = useState("name")

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  }
  return (
    <div className='tasks'>
      <div className='tasks-header'>
        <div className='tasks-header-icons'>
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
      
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Task name</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Project</th>
              <th>Priority</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="checkbox"/></td>
              <td>Do some work</td>
              <td className='deadline'>15.06.2051</td>
              <td>
                <p className="status">Active</p>
              </td>
              <td>Web Development</td>
              <td className='priority'>Important</td>
              <td className='mark-as-done'>Mark As Done</td>
            </tr>

            <tr>
              <td><input type="checkbox" /></td>
              <td>Do some work</td>
              <td className='deadline'>15.06.2051</td>
              <td>
                <p className="status">Active</p>
              </td>
              <td>Web Development</td>
              <td className='priority'>Normal</td>
              <td className='mark-as-done'>Mark As Done</td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>Do some work</td>
              <td className='deadline'>15.06.2051</td>
              <td>
                <p className="status">Active</p>
              </td>
              <td>Web Development</td>
              <td className='priority'>Normal</td>
              <td className='mark-as-done'>Mark As Done</td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>Do some work</td>
              <td className='deadline'>15.06.2051</td>
              <td>
                <p className="status">Active</p>
              </td>
              <td>Web Development</td>
              <td className='priority'>Normal</td>
              <td className='mark-as-done'>Mark As Done</td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>Do some work</td>
              <td className='deadline'>15.06.2051</td>
              <td>
                <p className="status">Active</p>
              </td>
              <td>Web Development</td>
              <td className='priority'>Normal</td>
              <td className='mark-as-done'>Mark As Done</td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>Do some work</td>
              <td className='deadline'>15.06.2051</td>
              <td>
                <p className="status">Active</p>
              </td>
              <td>Web Development</td>
              <td className='priority'>Normal</td>
              <td className='mark-as-done'>Mark As Done</td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>Do some work</td>
              <td className='deadline'>15.06.2051</td>
              <td>
                <p className="status">Active</p>
              </td>
              <td>Web Development</td>
              <td className='priority'>Normal</td>
              <td className='mark-as-done'>Mark As Done</td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>Do some work</td>
              <td className='deadline'>15.06.2051</td>
              <td>
                <p className="status">Active</p>
              </td>
              <td>Web Development</td>
              <td className='priority'>Normal</td>
              <td className='mark-as-done'>Mark As Done</td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>Do some work</td>
              <td className='deadline'>15.06.2051</td>
              <td>
                <p className="status">Active</p>
              </td>
              <td>Web Development</td>
              <td className='priority'>Normal</td>
              <td className='mark-as-done'>Mark As Done</td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>Do some work</td>
              <td className='deadline'>15.06.2051</td>
              <td>
                <p className="status">Active</p>
              </td>
              <td>Web Development</td>
              <td className='priority'>Normal</td>
              <td className='mark-as-done'>Mark As Done</td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>Do some work</td>
              <td className='deadline'>15.06.2051</td>
              <td>
                <p className="status">Active</p>
              </td>
              <td>Web Development</td>
              <td className='priority'>Normal</td>
              <td className='mark-as-done'>Mark As Done</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Tasks