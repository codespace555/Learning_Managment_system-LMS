import React from "react";
import Input from "../Components/Input";
import { useForm } from "react-hook-form";

function RoomHome() {
  const { register, handleSubmit } = useForm();
  return (
    <div className=" h-screen flex items-center justify-center  ">
      <div className=" w-full lg:w-1/2 m-5  rounded-lg md:flex bg-slate-950 items-center justify-between ">
        <img className="w-full glass lg:rounded-l-lg rounded-t-lg" src="./Image.png" alt="" />
        <div className="p-10 w-full ">
          <form>
            <div className="space-y-1">
              <Input
                label="Enter Room Code"
                type="password"
                {...register("roomCode", { required: true })}
              />
            </div>
            <button className="btn btn-outline btn-secondary flex-none w-full  lg:block">
              Join Room
            </button>
          </form>
          <h2 className="text-center my-5">or</h2>
          <button className="btn btn-outline btn-secondary flex-none w-full  lg:block">
            Create Room (only for Teachers)
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoomHome;
