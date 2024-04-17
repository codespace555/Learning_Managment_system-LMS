import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import {
  About,
  Account,
  Course,
  ForgotPassword,
  Halloffame,
  Home,
  Login,
  Register,
  Typeing,
} from "./Pages/pages.js";
import store from "./store/store.js";
import AutoLogin from "./Components/AutoLogin.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App>
        {" "}
        <AutoLogin />
      </App>
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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
