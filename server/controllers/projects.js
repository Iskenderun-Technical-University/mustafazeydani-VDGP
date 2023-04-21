import {db} from "../db.js"
import jwt from "jsonwebtoken"

export const getProjects = (req, res)=>{
    const token = req.cookies.access_token
    jwt.verify(token, "jwtkey", (err, userInfo)=>{
        if(err) return res.status(403).json("Token is not valid!")
        const q = "SELECT * FROM projects WHERE `user_uuid` = ?"

        db.query(q, [userInfo.uuid], (err, data)=>{
            if(err) return res.send(err)
            return res.status(200).json(data)
        })
    })
}

export const addProject = (req, res)=>{
    const token = req.cookies.access_token
    jwt.verify(token, "jwtkey", (err, userInfo)=>{
        if(err) return res.status(403).json("Token is not valid!")
        
        const q = "INSERT INTO projects VALUES(?)"

        const values = [
            req.body.uuid,
            userInfo.uuid,
            req.body.name,
            req.body.field,
            req.body.description,
            req.body.creation_date
        ]
        db.query(q, [values], (err, data)=>{
            if(err) return res.status(500).json(err)
            return res.json("Project has been created!")
        })
    })
}

export const deleteProject = (req, res)=>{
    const q = "DELETE FROM projects WHERE uuid IN (?)"
    db.query(q, [req.query.uuids], (err, data)=>{
        if(err) return res.status(500).json(err)
        return res.json("Project has been deleted!")
    })
}


export const getProject = (req, res)=>{

}


export const updateProject = (req, res)=>{

}