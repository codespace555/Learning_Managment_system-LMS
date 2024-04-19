import React from "react";
import { useSelector } from "react-redux";
import { LiaUserAstronautSolid } from "react-icons/lia";
import { PiBooksThin } from "react-icons/pi";
import { LuLogOut } from "react-icons/lu";

function MyProfile() {
  const userData = useSelector((state) => state.auth.userData);
  return (
    <div>
      <div className="dropdown dropdown-bottom dropdown-end ">
        <div tabIndex={0} role="button" className="btn bg-transparent border-none">
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
            <button><LiaUserAstronautSolid /> My Profile</button>
          </li>
         
          <li>
          <button><PiBooksThin /> My Course</button>

          </li>
          <li>
            <button><LuLogOut /> Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MyProfile;
