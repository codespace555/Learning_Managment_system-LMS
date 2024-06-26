import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LiaUserAstronautSolid } from "react-icons/lia";
import { PiBooksThin } from "react-icons/pi";
import { LuLogOut } from "react-icons/lu";
import authUser from "../Controller/User";
import { toast } from "react-toastify";
import { logout as logoutAction } from "../store/authSlice";
import { Link, useNavigate } from "react-router-dom";

function MyProfile() {
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutuser = async () => {
    console.log("logout");
    const res = await authUser.logout();
    if (res) {
      toast.success(`${res?.message}`);
      dispatch(logoutAction());
      navigate("/");

    }
  };

  return (
    <div>
      <div className="dropdown dropdown-bottom dropdown-end ">
        <div
          tabIndex={0}
          role="button"
          className="btn bg-transparent border-none"
        >
          <div className="avatar">
            <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={userData.data?.avatar?.secure_url} />
            </div>
          </div>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <Link to="/profile">
              <LiaUserAstronautSolid /> My Profile
            </Link>
          </li>

          <li>
            <button>
              <PiBooksThin /> My Course
            </button>
          </li>
          <li>
            <button onClick={() => logoutuser()}>
              <LuLogOut /> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MyProfile;
