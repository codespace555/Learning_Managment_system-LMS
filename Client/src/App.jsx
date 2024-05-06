import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
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
          console.log(user);
        } else {
          navigate("/login");
          toast.status("Please Login");
        }
      }
    });
  }, []);

  return (
    <>
      <div className=" w-full bg-[#18202c] h-auto text-gray-400 overflow-hidden">
        <Navbar />
        <main className="h-auto mt-36 bg-[#18202c]">
          <Outlet />
        </main>

        {/* <Footer /> */}
      <ToastContainer />
      </div>
    </>
  );
}

export default App;
