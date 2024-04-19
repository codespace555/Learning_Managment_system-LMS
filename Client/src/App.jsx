import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import authUser from "./Controller/User";
import { login } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    authUser.getUser().then((user) => {
      if (user) {
        dispatch(login(user));
        navigate("/");
      }
    });
  }, []);

  return (
    <>
      <div className="bg-gray-300 w-full dark:bg-[#18202c] h-auto overflow-hidden">
        <Navbar />
        <main className="h-screen">
          <Outlet />
        </main>
        <Footer />
      </div>

      <ToastContainer />
    </>
  );
}

export default App;
