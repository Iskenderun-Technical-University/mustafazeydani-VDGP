import {db} from "../db.js"
import jwt from "jsonwebtoken"

export const getTasks = (req, res)=>{
    const token = req.cookies.access_token
    jwt.verify(token, "jwtkey", (err, userInfo)=>{
        if(err) return res.status(403).json("Token is not valid!")
        const q = "SELECT * FROM tasks WHERE `user_uuid` = (?) AND `project_uuid` = (?) AND `status` = (?)"
        db.query(q, [userInfo.uuid, req.query.project_uuid, req.query.status], (err, data)=>{
            if(err) return res.send(err)
            return res.status(200).json(data)
        })
    })
}

export const addTask = (req, res)=>{
    const token = req.cookies.access_token
    jwt.verify(token, "jwtkey", (err, userInfo)=>{
        if(err) return res.status(403).json("Token is not valid!")
        
        const q = "INSERT INTO tasks VALUES(?)"

        const values = [
            req.body.uuid,
            userInfo.uuid,
            req.body.project_uuid,
            req.body.task,
            req.body.deadline,
            req.body.priority,
            req.body.status,
            req.body.project_name
        ]
        db.query(q, [values], (err, data)=>{
            if(err) return res.status(500).json(err)
            return res.json("Task has been created!")
        })
    })
}

export const deleteTask = (req, res)=>{
    const q = "DELETE FROM tasks WHERE uuid = (?)"
    db.query(q, [req.query.uuid], (err, data)=>{
        if(err) return res.status(500).json(err)
        return res.json("Task has been deleted!")
    })
}

export const updateTask = (req, res)=>{
    if(req.body.type==="status") { // Update Task Status 
        const q = "UPDATE tasks SET `status` = (?) WHERE `uuid` = (?)"
        db.query(q, [req.body.status, req.body.uuid], (err, data)=>{
            if(err) return res.status(500).json(err)
            return res.json("Task has been updated")
        })
    }
    else if(req.body.type==="details") { // Update Task Details 
        const q = "UPDATE tasks SET `task` = (?), `deadline` = (?), `priority` = (?) WHERE `uuid` = (?)"
        db.query(q, [req.body.task, req.body.deadline, req.body.priority, req.body.uuid], (err, data)=>{
            if(err) return res.status(500).json(err)
            return res.json("Task has been updated")
        })
    }
    
}