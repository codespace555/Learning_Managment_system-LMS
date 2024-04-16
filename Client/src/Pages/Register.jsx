import React, { useState } from "react";
import { Input, OAuthbtn } from "../Components/components.js";
import Logo from "../Components/Logo.jsx";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import authUser from "../Controller/User.js";
import { toast } from "react-toastify";

function Register() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("avatar", data.avatar[0]);

      const response = await authUser.createUser(formData);

      console.log(response?.data);
      toast.success(response?.message);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div>
      <>
        <div
          className={`mx-auto  max-w-lg rounded-lg p-10 border bg-slate-800/80 border-black/10 `}
        >
          <span className=" ">
            <Logo />
          </span>
          <h2>Create your New account</h2>
          <p className="mt-2 text-center text-base text-gray-200">
            Allready have an account?
            <Link
              to="/account/login"
              className="font-medium hover:text-blue-900 text-blue-500 transition duration-150 ease-in-out"
            >
              {" "}
              Login{" "}
            </Link>
            .
          </p>
          <OAuthbtn icon={<FcGoogle />} oauth="Register With Google" />

          <h1 className="mt-2 text-center text-base text-gray-200">or</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="">
            
          <div className="md:space-y-5 mt-5 ml-20 ">
                <input
                  type="file"
                  className="file-input file-input-bordered file-input-secondary w-full max-w-xs"
                  {...register("avatar", {
                    required: true,
                  })}
                />
              </div>
            <div className="flex flex-col justify-center   w-full">
              <div>
                <div className="space-y-5">
                  <Input
                    type="text"
                    label="enter your name"
                    {...register("fullName", {
                      required: true,
                    })}
                  />
                </div>
                <div className="space-y-5">
                  <Input
                    type="email"
                    label="mail@mail.com"
                    {...register("email", {
                      required: true,

                      validate: {
                        matchPatern: (value) =>
                          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                            value
                          ) || "Email address must be a valid address",
                      },
                    })}
                  />
                </div>
                <div className="space-y-1">
                  <Input
                    label="Password"
                    type="password"
                    {...register("password", { required: true })}
                  />
                </div>
              </div>
            </div>
            <button className="btn btn-outline btn-secondary flex-none w-full  lg:block mt-5">
              Register
            </button>
          </form>
        </div>
      </>
    </div>
  );
}

export default Register;
