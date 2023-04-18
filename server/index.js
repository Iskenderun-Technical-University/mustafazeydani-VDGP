import express from "express"
import authRoutes from "./routes/auth.js"
// import noteRoutes from "./routes/notes.js"
// import projectSpecRoutes from "./routes/project_specs.js"
// import projectStatRoutes from "./routes/project_stats.js"
import projectRoutes from "./routes/projects.js"
import tasksRoutes from "./routes/tasks.js"
// import taskRoutes from "./routes/tasks.js"
// import userRoutes from "./routes/users.js"
import cookieParser from "cookie-parser"

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use("/server/auth", authRoutes)
// app.use("/server/notes", noteRoutes)
// app.use("/server/project_specs", projectSpecRoutes)
// app.use("/server/project_stats", projectStatRoutes)
app.use("/server/projects", projectRoutes)
app.use("/server/tasks", tasksRoutes)
// app.use("/server/tasks", taskRoutes)
// app.use("/server/users", userRoutes)

app.listen(8800, ()=> {
    console.log("connected")
})