import React, { StrictMode, Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import Loader from "./Components/Loader.jsx";
import AuthLayout from "./Components/AuthLayout.jsx";
const Home = React.lazy(() => delayForDemo(import("./Pages/Home")));
const Account = React.lazy(() => delayForDemo(import("./Pages/Accoutn")));
const Course = React.lazy(() => delayForDemo(import("./Pages/Course")));
const Typeing = React.lazy(() => delayForDemo(import("./Pages/Typeing")));
const Halloffame = React.lazy(() => delayForDemo(import("./Pages/Halloffame")));
const About = React.lazy(() => delayForDemo(import("./Pages/About")));
const Login = React.lazy(() => delayForDemo(import("./Pages/Login")));
const Register = React.lazy(() => delayForDemo(import("./Pages/Register")));
const ForgotPassword = React.lazy(() =>
  delayForDemo(import("./Pages/ForgotPassword"))
);
const Reset = React.lazy(() => delayForDemo(import("./Pages/Reset")));
const Profile = React.lazy(() => delayForDemo(import("./Pages/Profile")));
const Aiassisant = React.lazy(() => delayForDemo(import("./Pages/Aiassisant")));
const RoomHome = React.lazy(() => delayForDemo(import("./Pages/RoomHome")));
const Room = React.lazy(() => delayForDemo(import("./Pages/Room")));
function delayForDemo(promise) {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  }).then(() => promise);
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/room/:code",
        element: (
          <AuthLayout authentication={true}>
            <Room />
          </AuthLayout>
        ),
      },
      {
        path: "course",
        element: <Course />,
      },
      {
        path: "typing",
        element: <Typeing />,
      },
      {
        path: "halloffame",
        element: <Halloffame />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "reset-password/:resetToken",
        element: <Reset />,
      },
      {
        path: "profile",
        element: (
          <AuthLayout authentication={true}>
            <Profile />
          </AuthLayout>
        ),
      },
      {
        path: "yourhelper",
        element: <Aiassisant />,
      },
      {
        path: "joinroom",
        element: <RoomHome />,
      },
      {
        path: "account",
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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Suspense
    fallback={
      <div>
        <Loader />
      </div>
    }
  >
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </Suspense>
);
