import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
import Projects from "./pages/projects/Projects";
import Tasks from "./pages/tasks/Tasks";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import "./index.css";
import Panels from "./components/Panels";
import NotFoundPage from "./components/NotFound";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";

const Layout = () => {
  return (
    <>
      <Panels />
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
  return children;
}

function App() {
  return (
    <div className="app">
      <div className="container">
        <Router>
          <Routes>
            <Route path="*" element={<NotFoundPage/>} />
            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route path="/" element={<Projects />} />
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