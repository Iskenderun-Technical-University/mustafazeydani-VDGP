import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom"
import Home from "./pages/Home"
import Register from "./pages/auth/Register"
import Login from "./pages/auth/Login"
import "./index.css"
import Panels from "./components/Panels"


const Layout = ()=>{
  return (
    <>
      <Panels />
      <Outlet />
      {/* <InfoPanel /> */}
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
        element: <Home />
      } /*********** */
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
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router}/>
      </div>
    </div>
  );
}



export default App;