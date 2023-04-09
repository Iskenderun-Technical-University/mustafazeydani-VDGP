import {db} from "../db"
export const register = (req,res)=>{

    //Check if user exists
    const q = "SELECT * FROM users WHERE email = ? OR username = ?"

    db.query(q, [req.body.email, req.body.name], (err, data) => {
        if(err) return res.json(err);
        if(data.length) return res.status(409).json("User already exists");
    }) 
}

export const login = (req,res)=>{
    
}

export const logout = (req,res)=>{
    
}