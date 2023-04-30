import express from "express"
import { 
    addProject, 
    deleteProject,  
    getProjects 
} from "../controllers/projects.js"

const router = express.Router()

router.get("/", getProjects)
router.post("/", addProject)
router.delete("/", deleteProject)


export default router