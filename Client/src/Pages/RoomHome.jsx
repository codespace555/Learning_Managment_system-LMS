import React from "react";
import Input from "../Components/Input";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Modal from "../Components/Modal";
import { useSelector } from "react-redux";

function RoomHome() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
 
  const joinroom = (data) => {
    console.log(data.roomCode);
    navigate(`/room/${data.roomCode}`);
  };
  const createRoom = () => {
   
    console.log('Creating room with code:');
    
  };
  return (
    <div className=" h-screen flex items-center justify-center  ">
      <div className=" w-full lg:w-1/2 m-5  rounded-lg md:flex bg-slate-950 items-center justify-between ">
        <img className="w-full glass rounded-lg " src="./Image.png" alt="" />
        <div className="p-10 w-full ">
          <form onSubmit={handleSubmit(joinroom)}>
            <div className="space-y-1">
              <Input
                label="Enter Room Code"

                {...register("roomCode", { required: true })}
              />
            </div>
            <button
              className="btn btn-outline btn-secondary flex-none w-full  lg:block"
              type="submit"
            >
              Join Room
            </button>
          </form>
          
          {
           userData && userData?.data?.role === "ADMIN" ?
           <>
          <h2 className="text-center my-5">or</h2>
           
           <Modal text="Create Room">
            
            <Input
              label="Enter Room Code"
              {...register("Code", { required: true })}
            />
            <button
              className="btn btn-outline btn-secondary w-full mt-4"
              onClick={() => createRoom()}
            >
              Create Room
            </button>
        
        </Modal>
        </>
         : null
          }
          
        </div>
      </div>
    </div>
  );
}

export default RoomHome;
