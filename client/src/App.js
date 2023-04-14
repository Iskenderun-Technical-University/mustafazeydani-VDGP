import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
import Projects from "./pages/projects/Projects";
import Tasks from "./pages/tasks/Tasks";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import "./index.css";
import Panels from "./components/Panels/Panels";
import NotFoundPage from "./components/NotFound";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./context/authContext";

const Layout = ({ projects, setProjects }) => {
  return (
    <>
        <Panels projects={projects} setProjects={setProjects}/>
        <div className="outlet">
          <Outlet />
        </div>
    </>
  )
}

export const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext)
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return children
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

  const [projects, setProjects] = useState([])

  return (
    <div className="app">
      <div className="container">
        <Router>
          <Routes>
            <Route path="*" element={<NotFoundPage/>} />
            <Route path="/" element={
              <ProtectedRoute>
                <Layout projects={projects} setProjects={setProjects}/>
              </ProtectedRoute>
            }>
              <Route path="/" element={<Projects projects={projects} setProjects={setProjects}/>} />
              <Route path="/tasks" element={<Tasks />} />
            </Route>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;