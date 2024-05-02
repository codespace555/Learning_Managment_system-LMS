import React from "react";
import { useParams } from "react-router-dom";

function Room() {
  const code = useParams();
  console.log(code.code);
  return (
    <div className=" m-32 h-screen flex justify-center items-center ">
      <h1 className="text-3xl p-5 m-5 text-white">{code.code}</h1>
    </div>
  );
}

export default Room;
