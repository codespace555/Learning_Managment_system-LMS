import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../Components/Input";
import authUser from "../Controller/User";
import { toast } from "react-toastify";

function Reset() {
  const { register, handleSubmit } = useForm();
  const { resetToken } = useParams();
  console.log(resetToken);
const navigate = useNavigate();
  const verifyToken = async (data) => {
    console.log(data);
   try {
     const resp = await authUser.resetpassword({
       password: data.password,
       resetToken: resetToken,
     });
     console.log({
      password: data.password,
      resetToken: resetToken,
    });
 
     if (resp) {
       toast.success(resp?.message);
       navigate("/account/login");
     }
   } catch (error) {
    toast.error(error);
   }
  };
  return (
    <div className="flex items-center justify-center w-full  p-5 bg-center  bg-cover  bg-scroll  bg-[url('/login.png')] h-screen bg-no-repeat ">
      <div className="w-1/2 h-1/2 rounded-lg p-10 border bg-slate-800/80 border-black/10">
        <h1 className="text-center underline text-pink-700">Reset Password</h1>
        <form
          onSubmit={handleSubmit(verifyToken)}
          className="w-50 m-auto flex flex-col items-center gap-y-4"
        >
          <div className="mb-3 w-full">
            <Input
              type="password"
              label="Enter Your New Password"
              {...register("password", {
                required: true,
               })}
            />
          </div>

          <button
            
            className="btn btn-outline btn-secondary flex-none w-full  lg:block"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default Reset;
