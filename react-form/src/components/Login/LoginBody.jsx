import React from "react";
import InputLogin from "./InputLogin";
import { Link } from "react-router-dom";

function LoginBody() {
  return (
    <>
      <main className="mx-8 mt-20 md:m-32">
        <header>
          <span className="text-4xl mb-4">Welcome Back</span>
          <Link to={'/'} className='m-2 p-2 text-purple-400 block'> Back Dashboard</Link>
          <p className="text-gray-500">
            Welcome back! Please enter your detail.
          </p>
        </header>
        <InputLogin />
      </main>
    </>
  );
}

export default LoginBody;
