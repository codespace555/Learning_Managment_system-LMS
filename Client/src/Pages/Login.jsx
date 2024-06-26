import React, { useState } from "react";
import { Input, OAuthbtn } from "../Components/components.js";
import Logo from "../Components/Logo.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { MdEmojiPeople } from "react-icons/md";
import authUser from "../Controller/User.js";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice.js";

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handelSumbit = async (data) => {
    try {
      const loginuser = await authUser.loginUser(data);
      if (loginuser) {
        toast.success(`Welcome back ${loginuser?.data.user.fullName}`);
        console.log(loginuser)
        const user = await authUser.getUser();
        console.log(user)
        if (user) {
          dispatch(login(user));
          navigate("/");
        }
      }
    } catch (error) {
      toast.error(error);
    }
  };
  const loginWithDemoAccount = () => {
    const data = {
      email: "help.subbazzar@gmail.com",
      password: "7050553648",
    }
    handelSumbit(data)
  }
  return (
    <>
      <div
        className={` max-w-lg w-full rounded-lg p-10 border bg-slate-800/80 border-black/10 `}
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

        <OAuthbtn icon={<FcGoogle />} oauth="Login With Google" />
        <OAuthbtn singupWithoauth={loginWithDemoAccount} icon={<MdEmojiPeople />} oauth="Login With Demo Account" />

        <h1 className="mt-2 text-center text-base text-gray-200">or</h1>
        <form onSubmit={handleSubmit(handelSumbit)} className="mt-8">
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
