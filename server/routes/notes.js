import express from "express"
import { addNote, editNote, getNotes, deleteNote } from "../controllers/notes.js"

const router = express.Router()

router.post("/", addNote)
router.put("/", editNote)
router.get("/", getNotes)
router.delete("/", deleteNote)

export default router