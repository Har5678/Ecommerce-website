import {createBrowserRouter,RouterProvider} from "react-router-dom"
import './App.css';
import "./styles.css";
import { Navbar } from './pages/Navbar';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import Homepage from "./pages/HomePage";
import { ContextProvider } from "./ContextProvider";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import Order from "./pages/Orders";
import { CartItem } from "./pages/CartItems";





function App() {
  
  const router=createBrowserRouter([
    {
      path:"/",
      element:<ContextProvider><Homepage/></ContextProvider>
    },
    {
      path:"",
      element:<ContextProvider><Navbar/></ContextProvider>,
      children:[
        {
          path:"/signIn",
          element:<ContextProvider><SignIn/></ContextProvider>
        },
        {
          path:"/register",
          element:<ContextProvider><Register/></ContextProvider>
        },
        {
          path:"/cartTobeAdded",
          element:<CartItem />
        },
        {
          path:"/order",
          element:<Order />
        }
        
      ]
    }
  ])
  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
    <RouterProvider router={router} />
    </>
  );
}

export default App;
