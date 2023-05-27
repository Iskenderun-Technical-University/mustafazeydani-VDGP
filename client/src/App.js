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

const Layout = ({ allProjects, setAllProjects, selectedMenu, setSelectedMenu }) => {
  return (
    <>
        <Panels 
          allProjects={allProjects} 
          setAllProjects={setAllProjects} 
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
  const [fetching, setFetching] = useState(true)
  const [selectedProjects, setSelectedProjects] = useState([])
  const [selectedMenu, setSelectedMenu] = useState(null)
  const [sortBy, setSortBy] = useState("creation-newest")
  
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
                    selectedProjects={selectedProjects} 
                    setSelectedProjects={setSelectedProjects} 
                    fetching={fetching} 
                    setFetching={setFetching}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                  />
                }
              />
              <Route path="/tasks" element={<Tasks setSelectedMenu={setSelectedMenu}/>} />
              <Route path="/projects/:name/:uuid" element={<Single fetching={fetching} setFetching={setFetching}/>} />
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