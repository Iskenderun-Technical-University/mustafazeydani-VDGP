import express from "express"
import { 
    addProject, 
    deleteProject, 
    getProject, 
    getProjects, 
    updateProject 
} from "../controllers/projects.js"

const router = express.Router()

router.get("/", getProjects)
// router.get("/:id", getProject)
router.post("/", addProject)
router.delete("/", deleteProject)
// router.put("/:id", updateProject)

export default router