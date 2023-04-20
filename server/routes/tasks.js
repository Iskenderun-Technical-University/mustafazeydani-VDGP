import express from "express"
import { 
    getTasks,
    addTask,
    deleteTask,
    updateTask
} from "../controllers/tasks.js"

const router = express.Router()

router.get("/", getTasks)
router.post("/", addTask)
router.delete("/", deleteTask)
router.put("/", updateTask)


export default router