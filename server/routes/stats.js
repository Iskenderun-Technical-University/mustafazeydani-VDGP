import express from "express"
import {
    addStats,
    getStats,
    setStats
} from "../controllers/stats.js"

const router = express.Router()

router.get("/", getStats)
router.post("/", addStats)
router.put("/", setStats)

export default router