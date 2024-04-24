import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import authUser from "./Controller/User";
import { login } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
   authUser.getUser().then((user) => {
      if (!authStatus) {
        if (user) {
          dispatch(login(user));
          navigate("/");
        } else {
          navigate("/login");
          toast.status("Please Login");
        }
      }
    });
  }, []);

  return (
    <>
      <div className="bg-gray-300 w-full dark:bg-[#18202c] h-auto overflow-hidden">
        <Navbar />
        <main className="h-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
