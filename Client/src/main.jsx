import React ,{Suspense, lazy} from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import Loader from "./Components/Loader.jsx";
import AutoLogin from "./Components/AutoLogin.jsx";
const Home = React.lazy(() => import("./Pages/Home"));
const Account = React.lazy(() => import("./Pages/Accoutn"));
const Course = React.lazy(() => import("./Pages/Course"));
const Typeing = React.lazy(() => import("./Pages/Typeing"));
const Halloffame = React.lazy(() => import("./Pages/Halloffame"));
const About = React.lazy(() => import("./Pages/About"));
const Login = React.lazy(() => import("./Pages/Login"));
const Register = React.lazy(() => import("./Pages/Register"));
const ForgotPassword = React.lazy(() => import("./Pages/ForgotPassword"));
const Reset = React.lazy(() => import("./Pages/Reset"));
const Profile = React.lazy(() => import("./Pages/Profile"));
const Aiassisant = React.lazy(() => import("./Pages/Aiassisant"));



const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App/>
      
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/account",
        element: <Account />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
          {
            path: "forgotyourpassword",
            element: <ForgotPassword />,
          },
          
          
        ],
      },

      {
        path: "/course",
        element: <Course />,
      },
      {
        path: "/typing",
        element: <Typeing />,
      },
      {
        path: "/halloffame",
        element: <Halloffame />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/reset-password/:resetToken",
        element: <Reset />,
      },
      {
        path: "/profile",
        element:<Profile/> ,
      },
      {
        path: "/yourhelper",
        element:<Aiassisant/> ,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Suspense fallback={<div><Loader/></div>}>
    <RouterProvider router={router} />
    </Suspense>
  </Provider>
);
