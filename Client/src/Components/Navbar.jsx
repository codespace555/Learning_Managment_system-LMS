import React from "react";
import Logo from "./Logo";
import { SiHomeadvisor } from "react-icons/si";
import { SiCoursera } from "react-icons/si";
import { FaRobot } from "react-icons/fa6";
import { FaKeyboard } from "react-icons/fa";
import { LuFrame } from "react-icons/lu";
import { FcAbout } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const userData = useSelector((state) => state.auth.userData);
  const authStatus = useSelector((state) => state.auth.status);

  console.log(userData)
  console.log(authStatus)

  const nav = [
    {
      name: "Home",
      link: "/",
      icon: <SiHomeadvisor />,
    },
    {
      name: "Courses",
      link: "/course",
      icon: <SiCoursera />,
    },
    {
      name: "Typing Test",
      link: "/typing",
      icon: <FaKeyboard />,
    },
    {
      name: "Hall of Fame",
      link: "/halloffame",
      icon: <LuFrame />,
    },
    {
      name: "About",
      link: "/about",
      icon: <FcAbout />,
    },
    {
      name: "AI Assistant",
      link: "/about",
      icon: <FaRobot />,
    },
  ];
  return (
    <>
      <nav className="w-screen">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbarsticky top-0 z-50 backdrop-blur p-5 transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-gray-500 supports-backdrop-blur:bg-white/95 dark:bg-slate-900/75 justify-center items-center ">
            <div className="flex justify-between items-center w-full">
              <div className="flex-none lg:hidden">
                <label
                  htmlFor="my-drawer-3"
                  aria-label="open sidebar"
                  className="btn btn-square btn-ghost"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-6 h-6 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
              </div>
              <div className=" text-2xl max-w-56 px-5 mx-2 font-semibold">
                <Logo />
              </div>

              <div className=" md:flex bg-zinc-900 items-center gap-x-3 py-[10px] px-5  w-[70%] relative rounded-lg hidden lg:flex ">
                <svg
                  className="w-6 h-6 text-gray-650 "
                  viewBox="0 0 512 512"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M464 428L339.92 303.9C359.916 276.421 370.673 243.304 370.64 209.32C370.64 120.37 298.27 48 209.32 48C120.37 48 48 120.37 48 209.32C48 298.27 120.37 370.64 209.32 370.64C243.304 370.673 276.421 359.916 303.9 339.92L428 464L464 428ZM209.32 319.69C187.488 319.692 166.146 313.22 147.992 301.092C129.839 288.964 115.69 271.725 107.334 251.555C98.9785 231.385 96.7917 209.191 101.05 187.778C105.309 166.366 115.822 146.697 131.26 131.26C146.697 115.822 166.366 105.309 187.778 101.05C209.191 96.7917 231.385 98.9785 251.555 107.334C271.725 115.69 288.964 129.839 301.092 147.992C313.22 166.146 319.692 187.488 319.69 209.32C319.656 238.581 308.016 266.634 287.325 287.325C266.634 308.016 238.581 319.656 209.32 319.69Z"
                    fill="currentColor"
                  ></path>
                </svg>
                <input
                  className="focus:outline-none text-gray-500 w-full placeholder:text-gray-650 bg-zinc-900"
                  type="text"
                  placeholder="Search by course title"
                />
              </div>
              <ul>
                <Link to="/account/login">
                  <button className="btn btn-outline btn-secondary flex-none  ">
                    Login/Register
                  </button>
                </Link>
              </ul>
            </div>
            <div className="flex-none  hidden lg:block ">
              <ul className="menu menu-horizontal justify-between items-center flex px-14 bg-slate-400 dark:bg-slate-950 mt-3 rounded-xl text-sm ">
                {/* Navbar menu content here */}

                {nav.map((item, index) => (
                  <li key={index}>
                    <Link to={`${item.link}`}>
                      {" "}
                      {item.icon}
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="drawer-side z-40">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-100/80 mt-20 shadow-xl gap-5">
            {/* Sidebar content here */}
            {nav.map((item, index) => (
              <li key={index}>
                <Link to={`${item.link}`}>
                  {" "}
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}

            <div className=" md:hidden bg-zinc-900 items-center gap-x-3 py-[10px] px-5  w-full relative rounded-lg flex  lg:hidden">
              <svg
                className="w-6 h-6 text-gray-650 "
                viewBox="0 0 512 512"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M464 428L339.92 303.9C359.916 276.421 370.673 243.304 370.64 209.32C370.64 120.37 298.27 48 209.32 48C120.37 48 48 120.37 48 209.32C48 298.27 120.37 370.64 209.32 370.64C243.304 370.673 276.421 359.916 303.9 339.92L428 464L464 428ZM209.32 319.69C187.488 319.692 166.146 313.22 147.992 301.092C129.839 288.964 115.69 271.725 107.334 251.555C98.9785 231.385 96.7917 209.191 101.05 187.778C105.309 166.366 115.822 146.697 131.26 131.26C146.697 115.822 166.366 105.309 187.778 101.05C209.191 96.7917 231.385 98.9785 251.555 107.334C271.725 115.69 288.964 129.839 301.092 147.992C313.22 166.146 319.692 187.488 319.69 209.32C319.656 238.581 308.016 266.634 287.325 287.325C266.634 308.016 238.581 319.656 209.32 319.69Z"
                  fill="currentColor"
                ></path>
              </svg>
              <input
                className="focus:outline-none text-gray-500 w-full placeholder:text-gray-650 bg-zinc-900"
                type="text"
                placeholder="Search by course title"
              />
            </div>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
