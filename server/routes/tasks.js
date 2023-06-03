import express from "express"
import { 
    getTasks,
    getAllTasks,
    countOverdueTasks,
    addTask,
    deleteTask,
    updateTask
} from "../controllers/tasks.js"

const router = express.Router()

router.get("/", getTasks)
router.get("/all", getAllTasks)
router.get("/overdue", countOverdueTasks)
router.post("/", addTask)
router.delete("/", deleteTask)
router.put("/", updateTask)


export default router