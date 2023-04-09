import express from "express"
import authRoutes from "./routes/auth.js"
import noteRoutes from "./routes/notes.js"
import projectSpecRoutes from "./routes/project_specs.js"
import projectStatRoutes from "./routes/project_stats.js"
import projectRoutes from "./routes/projects.js"
import taskRoutes from "./routes/tasks.js"
import userRoutes from "./routes/users.js"

const app = express()

app.use(express.json())
app.use("/api/auth", postRoutes)
app.use("/api/notes", postRoutes)
app.use("/api/project_specs", postRoutes)
app.use("/api/project_stats", postRoutes)
app.use("/api/projects", postRoutes)
app.use("/api/tasks", postRoutes)
app.use("/api/users", postRoutes)

app.listen(8800, ()=> {
    console.log("connected")
})