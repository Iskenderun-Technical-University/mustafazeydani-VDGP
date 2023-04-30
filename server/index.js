import express from "express"
import authRoutes from "./routes/auth.js"
import projectRoutes from "./routes/projects.js"
import tasksRoutes from "./routes/tasks.js"
import cookieParser from "cookie-parser"

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use("/server/auth", authRoutes)
app.use("/server/projects", projectRoutes)
app.use("/server/tasks", tasksRoutes)

app.listen(8800, ()=> {
    console.log("connected")
})