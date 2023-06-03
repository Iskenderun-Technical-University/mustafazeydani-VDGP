import {db} from "../db.js"
import jwt from "jsonwebtoken"

export const getNotes = (req, res) => {
    const token = req.cookies.access_token
    jwt.verify(token, "jwtkey", (err, userInfo)=>{
        if(err) return res.status(403).json("Token is not valid!")
        const q = "SELECT * FROM notes WHERE `user_uuid` = ?"

        db.query(q, [userInfo.uuid], (err, data)=>{
            if(err) return res.send(err)
            const modifiedData = data.map(({ user_uuid, ...other }) => other);
            return res.status(200).json(modifiedData)
        })
    })
}

export const addNote = (req, res) => { 
    const token = req.cookies.access_token
    jwt.verify(token, "jwtkey", (err, userInfo)=>{
        if(err) return res.status(403).json("Token is not valid!")

        const q = "INSERT INTO notes VALUES(?)"

        const values = [
            req.body.uuid,
            userInfo.uuid,
            req.body.title,
            req.body.content
        ]

        db.query(q, [values], (err)=>{
            if(err) return res.status(500).json(err)
            return res.json("Note has been created!")
        })
    })
    
} 

export const editNote = (req, res) => {
    const q = "UPDATE notes SET `content` = ? WHERE `uuid` = ?"
    db.query(q, [req.body.content, req.body.uuid], (err)=>{
        if(err) return res.status(500).json(err)
        return res.json("Note has been edited")
    })
}

export const deleteNote = (req, res) => {
    const q = "DELETE FROM notes WHERE uuid = ?"
    db.query(q, [req.query.uuid], (err, data)=>{
        if(err) return res.status(500).json(err)
        return res.json("Note has been deleted!")
    })
}

