import React, {useState} from 'react'
import "./addnote.css"
import axios from 'axios'
import { v4 as uuidv4 } from "uuid"

function AddNote({setShowAddNote, setAllNotes}) {
    const [error, setError] = useState(null)
    const [title, setTitle] = useState("")
    const handleCancelClick = () =>{
        setShowAddNote(false)
    }
    const handleChange = (e) => {
        setTitle(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            validateInput()
            const requestData = {
                uuid: uuidv4(),
                title: title,
                content: ""
            }
            await axios.post("/notes", requestData)
            setAllNotes(prevNotes=>[...prevNotes, requestData]);
            setShowAddNote(false)
        }
        catch(err) {
            setError(err.message)
        }
    }

    const validateInput = () => {
        if(!title)
            throw new Error("Title is required!")
        else if(title.length > 25)
            throw new Error("Title must be 25 characters or less!")
    }

    return (
        <div className="add-note modal-back">
            <div className="modal">
                <form>
                    <h2>Create a note</h2>
                    <div className="modal-content">
                        <label htmlFor="note">Enter a note title *</label>
                        <input
                        name="note"
                        id="note"
                        onChange={handleChange}
                        type="text"
                        placeholder="Title"
                        />
                        {error&&<p className="error">{error}</p>}
                        <div className="modal-buttons">
                            <button className="btn" onClick={handleCancelClick}>
                                Cancel
                            </button>
                            <button className="btn btn-main" onClick={handleSubmit}>
                                Add
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddNote