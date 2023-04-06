import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom"
import { useEffect } from "react"
import Projects from "./pages/projects/Projects"
import Tasks from "./pages/tasks/Tasks"
import Register from "./pages/auth/Register"
import Login from "./pages/auth/Login"
import "./index.css"
import Panels from "./components/Panels"

const Layout = ()=>{
  return (
    <>
      <Panels />
      <div className='outlet'>
        <Outlet />
      </div>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children:[
      {
        path: "/",
        element: <Projects />
      },
      {
        path: "/tasks",
        element: <Tasks />
      }
    ]
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  useEffect(() => {
    function flexFont() {
      let divs = document.getElementsByClassName("flexFont");
      document.getElementsByClassName("flexFont");
      for (let i = 0; i < divs.length; i++) {
          let relFontsize = divs[i].offsetWidth * 0.05;
          divs[i].style.fontSize = relFontsize + 'px';
      }
    }

    window.addEventListener('resize', flexFont);
    flexFont(); 

    return () => window.removeEventListener('resize', flexFont);
  }, []);

  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router}/>
      </div>
    </div>
  );
}

export default App;
