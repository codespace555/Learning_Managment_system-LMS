import React from "react";
import { Outlet } from "react-router-dom";


function Account() {
  return (
    <>
      <div className="flex items-center justify-center w-full flex-wrap p-5 bg-center  bg-cover  bg-scroll  bg-[url('/login.png')] h-screen bg-no-repeat ">
       
        <Outlet />
      </div>
    </>
  );
}

export default Account;
