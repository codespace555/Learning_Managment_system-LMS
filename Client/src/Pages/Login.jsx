import React, { useState } from "react";
import { Input, OAuthbtn } from "../Components/components.js";
import Logo from "../Components/Logo.jsx";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { MdEmojiPeople } from "react-icons/md";

function Login() {
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  return (
    <>
      <div
        className={` max-w-lg rounded-lg p-10 border bg-slate-800/80 border-black/10 `}
      >
        <span className=" ">
          <Logo />
        </span>
        <h2>Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-gray-200">
          Don't have an account?
          <Link
            to="/account/register"
            className="font-medium hover:text-blue-900 text-blue-500 transition duration-150 ease-in-out"
          >
            {" "}
            Sign up{" "}
          </Link>
          .
        </p>
        {error && <p className=" text-red-500  text-center">{error}</p>}
        <OAuthbtn icon={<FcGoogle />} oauth="Login With Google" />
        <OAuthbtn icon={<MdEmojiPeople />} oauth="Login With Demo Account" />

        <h1 className="mt-2 text-center text-base text-gray-200">or</h1>
        <form onSubmit={handleSubmit()} className="mt-8">
          
          <div className="space-y-5">
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
          </div>
          <div className="space-y-1">
            <Input
              label="Password"
              type="password"
              {...register("password", { required: true })}
            />
          </div>
          <button className="btn btn-outline btn-secondary flex-none w-full  lg:block">
            Login
          </button>
        </form>
        <p className="mt-2 text-center text-base text-gray-200">
          Forgot your password?
          <Link
            to="/account/forgotyourpassword"
            className="font-medium hover:text-blue-900 text-blue-500 transition duration-150 ease-in-out"
          >
            {" "}
            Reset Password{" "}
          </Link>
          .
        </p>
      </div>
    </>
  );
}

export default Login;
