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
export const getProject = (req, res)=>{

}
export const addProject = (req, res)=>{

}
export const deleteProject = (req, res)=>{

}
export const updateProject = (req, res)=>{

}