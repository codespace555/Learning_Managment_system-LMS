import React, { useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import "chart.js/auto";
import { useSelector } from "react-redux";
import LeaderBoard from "../Components/LeaderBoard";

function Profile() {
  const userData = useSelector((state) => state.auth.userData);

  // Sample data for the line chart (e.g., user activity over time)
  const lineData = {
    labels: ["25", "24", "22", "20", "19", "5", "3" ,"25", "24", "22", "20", "19", "5", "3"],
    datasets: [
      {
        label: "Speed and Accuracy",
        data: [65, 59, 80, 0, 56, 55, 40,65, 59, 80, 0, 56, 55, 40],
        fill: false,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const pieData = {
    labels: ["Preference A", "Preference B", "Preference C"],
    datasets: [
      {
        data: [30, 50, 60],
        backgroundColor: ["#FF6384", "#FF6352", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  // Customize chart options if necessary
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="p-5 ">
      <div className="bg-slate-900  m-5 p-10 rounded-lg">
        <div className="flex justify-between items-center text-xl font-bold flex-wrap gap-5">
          <div className="flex-grow-1 avatar flex gap-4 items-center j">
            <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={userData?.data?.avatar?.secure_url} />
              <span className="indicator-item badge badge-primary">new</span> 
            </div>

            <h1 className="text-2xl font-bold ">My Profile </h1>
          </div>
          <div>
            <button className="flex-grow-1 flex text-red-400 gap-2 items-center">
              {" "}
              <svg
                className="h-6 w-[20px]"
                viewBox="0 0 512 512"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M432 96H336V72C336 61.3913 331.786 51.2172 324.284 43.7157C316.783 36.2143 306.609 32 296 32H216C205.391 32 195.217 36.2143 187.716 43.7157C180.214 51.2172 176 61.3913 176 72V96H80C75.7565 96 71.6869 97.6857 68.6863 100.686C65.6857 103.687 64 107.757 64 112C64 116.243 65.6857 120.313 68.6863 123.314C71.6869 126.314 75.7565 128 80 128H97L116 432.92C117.42 459.77 138 480 164 480H348C374.13 480 394.3 460.22 396 433L415 128H432C436.243 128 440.313 126.314 443.314 123.314C446.314 120.313 448 116.243 448 112C448 107.757 446.314 103.687 443.314 100.686C440.313 97.6857 436.243 96 432 96ZM192.57 416H192C187.853 416.003 183.868 414.395 180.883 411.517C177.898 408.639 176.148 404.714 176 400.57L168 176.57C167.849 172.327 169.39 168.197 172.283 165.089C175.177 161.982 179.187 160.151 183.43 160C187.673 159.849 191.803 161.39 194.911 164.283C198.018 167.177 199.849 171.187 200 175.43L208 399.43C208.076 401.531 207.737 403.627 207.003 405.598C206.269 407.568 205.153 409.375 203.72 410.914C202.287 412.452 200.564 413.694 198.651 414.567C196.738 415.439 194.672 415.926 192.57 416ZM272 400C272 404.243 270.314 408.313 267.314 411.314C264.313 414.314 260.243 416 256 416C251.757 416 247.687 414.314 244.686 411.314C241.686 408.313 240 404.243 240 400V176C240 171.757 241.686 167.687 244.686 164.686C247.687 161.686 251.757 160 256 160C260.243 160 264.313 161.686 267.314 164.686C270.314 167.687 272 171.757 272 176V400ZM304 96H208V72C207.988 70.9461 208.187 69.9004 208.584 68.9243C208.982 67.9483 209.571 67.0616 210.316 66.3163C211.062 65.571 211.948 64.9822 212.924 64.5844C213.9 64.1866 214.946 63.9879 216 64H296C297.054 63.9879 298.1 64.1866 299.076 64.5844C300.052 64.9822 300.938 65.571 301.684 66.3163C302.429 67.0616 303.018 67.9483 303.416 68.9243C303.813 69.9004 304.012 70.9461 304 72V96ZM336 400.57C335.852 404.714 334.102 408.639 331.117 411.517C328.132 414.395 324.147 416.003 320 416H319.42C317.319 415.925 315.254 415.437 313.342 414.564C311.43 413.69 309.709 412.449 308.277 410.91C306.845 409.371 305.73 407.565 304.996 405.596C304.262 403.626 303.924 401.531 304 399.43L312 175.43C312.075 173.329 312.563 171.263 313.436 169.35C314.309 167.438 315.551 165.716 317.089 164.283C318.628 162.85 320.434 161.735 322.404 161C324.374 160.265 326.469 159.925 328.57 160C330.671 160.075 332.737 160.563 334.65 161.436C336.562 162.309 338.284 163.551 339.717 165.089C341.15 166.628 342.265 168.434 343 170.404C343.735 172.374 344.075 174.469 344 176.57L336 400.57Z"
                  fill="currentColor"
                ></path>
              </svg>{" "}
              Delete Account
            </button>
          </div>
        </div>
        <div className="m-5">
          <form>
            <label
              htmlFor="input-group-1"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Email
            </label>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 16"
                >
                  <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                  <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                </svg>
              </div>
              <input
                type="text"
                id="input-group-1"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={userData?.data?.email}
              />
            </div>
            <label
              htmlFor="website-admin"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Full Name
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
              </span>
              <input
                type="text"
                id="website-admin"
                className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={userData?.data?.fullName}
              />
            </div>
            <button
              type="submit"
              className={`${
                "bg-gradient-to-r from-cyan-500 to-blue-500" +
                "hover:from-green-5`00 hover:to-lightBlue-500"
              } flex items-center justify-center    
              w-full text-white font-medium rounded-lg px-5 py-2.5 text-center mt-5`}
            >
              Update Profile
            </button>
          </form>
        </div>
        {/* Pie chart container */}
        <div className="h-40">
          <Pie data={pieData} options={chartOptions} />
        </div>
      </div>

      {/* Line chart container */}
      <div className="mb-20 h-96  text-center ">
        <h2 className="text-xl font-semibold mb-2">Typing Progress</h2>
        <Line data={lineData} options={chartOptions} />
      </div>
      <h1 className="text-xl font-semibold my-5 text-center bg-slate-600 p-5 rounded-lg ">Typing Test Leaderboard</h1>
<div>
  <LeaderBoard/>
</div>
  
    </div>
  );
}

export default Profile;
