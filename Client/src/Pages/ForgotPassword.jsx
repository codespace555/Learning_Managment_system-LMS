import React, { useState } from "react";
import Input from "../Components/Input";
import { Link } from "react-router-dom";
import { IoReturnUpBackSharp } from "react-icons/io5";
import authUser from "../Controller/User";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

function ForgotPassword() {
 const [send,setSend] = useState("Send")
  const { register, handleSubmit } = useForm();

  const handleEmail = async (data) => {
console.log(data)
    try {
      const resp = await authUser.forgotpassword({email:data.email});
      console.log(resp)
      if (resp) {
        toast.success(`${resp?.message}`);
        setSend("Sent Again after 15 minutes")
        
      }
       
    }catch(err) {
      toast.error(err);
      
    }

  };

  return (
    <div className="max-w-lg rounded-lg p-10 border bg-slate-800/80 border-black/10">
      <h1 className="text-center underline text-pink-700">Forgot Password</h1>
      <form onSubmit={handleSubmit(handleEmail)} className="w-50 m-auto">
        <div className="mb-3">
        <Input
              type="email"
              label="mail@mail.com"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-outline btn-secondary flex-none w-full  lg:block"
        >
          {send}
        </button>
      </form>
      <div className="mt-5">
        <Link to="/account/login">
          <IoReturnUpBackSharp />
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassword;
