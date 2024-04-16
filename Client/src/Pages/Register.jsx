import React, { useState } from "react";
import { Input, OAuthbtn } from "../Components/components.js";
import Logo from "../Components/Logo.jsx";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import authUser from "../Controller/User.js";

function Register() {
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("avatar", data.avatar[0]);

      const response = await authUser.createUser(formData);
      console.log(response);
      console.log(response?.data);
    } catch (error) {
      setError(error);
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
          {error && <p className=" text-red-500  text-center">{error}</p>}
          <OAuthbtn icon={<FcGoogle />} oauth="Register With Google" />

          <h1 className="mt-2 text-center text-base text-gray-200">or</h1>
          <form onSubmit={handleSubmit(onSubmit)} className=" ">
            <div className="md:flex gap-5 justify-center items-center w-full">
              <div className="md:space-y-5">
                <div className="md:flex   items-center justify-center md:h-auto  w-full md:p-5">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full md:h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 p-5"
                  >
                    <div className="flex  flex-col items-center justify-center md:pt-5 pb-6 ">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">
                          Click to upload Avatar
                        </span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      name="avatar"
                      type="file"
                      className="hidden"
                      {...register("avatar", {
                        required: true,
                      })}
                    />
                  </label>
                </div>
              </div>
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
