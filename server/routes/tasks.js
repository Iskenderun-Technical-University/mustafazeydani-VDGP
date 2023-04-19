import express from "express"
import { 
    getTasks,
    addTask,
    deleteTask
} from "../controllers/tasks.js"

const router = express.Router()

router.get("/", getTasks)
router.post("/", addTask)
router.delete("/", deleteTask)


export default router