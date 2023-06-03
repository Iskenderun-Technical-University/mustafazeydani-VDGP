import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Projects from "./pages/projects/Projects";
import Tasks from "./pages/tasks/Tasks";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Single from "./pages/single/Single";
import "./index.css";
import Panels from "./components/Panels/Panels";
import NotFoundPage from "./components/NotFound";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./context/authContext";

const Layout = ({ allProjects, setAllProjects, allNotes, setAllNotes, userStats, setUserStats, selectedMenu, setSelectedMenu}) => {
  return (
    <>
        <Panels 
          allProjects={allProjects} 
          setAllProjects={setAllProjects}
          allNotes={allNotes}
          setAllNotes={setAllNotes}
          userStats={userStats}
          setUserStats={setUserStats}
          selectedMenu={selectedMenu} 
          setSelectedMenu={setSelectedMenu}
        />
        <div className="outlet">
          <Outlet />
        </div>
    </>
  )
}

export const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext)
  if (!currentUser) {
    if(window.location.pathname!=='/login' && window.location.pathname!=='/register') {
      return <Navigate to={"/login"}/>
    }
    return children   
  }
  else if(currentUser) {
    if(window.location.pathname==='/login' || window.location.pathname==='/register') {
      return <Navigate to={"/"}/>
    }
    return children
  }
}


function App() {

  useEffect(() => {
    function flexFont() {
      let divs = document.getElementsByClassName("flexFont")
      document.getElementsByClassName("flexFont")
      for (let i = 0; i < divs.length; i++) {
          let relFontsize = divs[i].offsetWidth * 0.05
          divs[i].style.fontSize = relFontsize + 'px'
      }
    }
  
    window.addEventListener('resize', flexFont)
    flexFont()
  
    return () => window.removeEventListener('resize', flexFont)
  }, [])
  

  const [allProjects, setAllProjects] = useState([])
  const [allTasks, setAllTasks] = useState([])
  const [allNotes, setAllNotes] = useState([])
  const [userStats, setUserStats] = useState({})
  const [fetching, setFetching] = useState(true)
  const [selectedProjects, setSelectedProjects] = useState([])
  const [selectedMenu, setSelectedMenu] = useState(null)
  const [projectSortBy, setProjectSortBy] = useState("creation-newest")
  const [projectFilter, setProjectFilter] = useState("All")
  const [taskSortBy, setTaskSortBy] = useState("deadline-nearest")
  const [taskFilter, setTaskFilter] = useState("All")
  
  return (
    <div className="app">
      <div className="container">
        <Router>
          <Routes>
            <Route path="*" element={<NotFoundPage/>} />
            <Route path="/" element={
              <ProtectedRoute>
                <Layout 
                  allProjects={allProjects}
                  setAllProjects={setAllProjects}
                  allNotes={allNotes}
                  setAllNotes={setAllNotes}
                  userStats={userStats}
                  setUserStats={setUserStats}
                  selectedMenu={selectedMenu} 
                  setSelectedMenu={setSelectedMenu}
                />
              </ProtectedRoute>
            }>
              <Route path="/" element={<Home />}/>
              <Route 
                path="/projects" 
                element={
                  <Projects 
                    allProjects={allProjects}
                    setAllProjects={setAllProjects}
                    allTasks={allTasks}
                    selectedProjects={selectedProjects} 
                    setSelectedProjects={setSelectedProjects} 
                    fetching={fetching} 
                    setFetching={setFetching}
                    projectSortBy={projectSortBy}
                    setProjectSortBy={setProjectSortBy}
                    projectFilter={projectFilter}
                    setProjectFilter={setProjectFilter}
                    userStats={userStats}
                    setUserStats={setUserStats}
                  />
                }
              />
              <Route 
                path="/tasks" 
                element={
                  <Tasks 
                    setSelectedMenu={setSelectedMenu} 
                    allTasks={allTasks} 
                    setAllTasks={setAllTasks} 
                    taskSortBy={taskSortBy}
                    setTaskSortBy={setTaskSortBy}
                    taskFilter={taskFilter}
                    setTaskFilter={setTaskFilter}
                  />
                } 
              />
              <Route path="/projects/:name/:uuid" element={<Single setAllTasks={setAllTasks} userStats={userStats} setUserStats={setUserStats} fetching={fetching} setFetching={setFetching}/>} />
            </Route>
              <Route path="/register" element={
                <ProtectedRoute>
                  <Register />
                </ProtectedRoute>
              } />
              <Route path="/login" element={
                <ProtectedRoute>
                  <Login />
                </ProtectedRoute>
              } />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;