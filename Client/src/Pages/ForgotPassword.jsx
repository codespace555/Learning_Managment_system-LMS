import React from "react";
import Input from "../Components/Input";
import { Link } from "react-router-dom";
import { IoReturnUpBackSharp } from "react-icons/io5";
import { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    console.log(email);
  };

  return (
    <div className="max-w-lg rounded-lg p-10 border bg-slate-800/80 border-black/10">
      <h1 className="text-center underline text-pink-700">Forgot Password</h1>
      <form onSubmit={handleSubmit} className="w-50 m-auto">
        <div className="mb-3">
          <Input
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-outline btn-secondary flex-none w-full  lg:block"
        >
          Send
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
