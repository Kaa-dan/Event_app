import React from "react";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <div className="w-1/2 bg-green-400 shadow-lg rounded-xl p-10">
        <div className="flex flex-col">
          <div className="mb-8 text-center font-bold text-3xl text-blue-500">
            EVENTZ
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="w-full border rounded-md py-2 px-3"
              placeholder="Username"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="w-full border rounded-md py-2 px-3"
              placeholder="Password"
            />
          </div>
          <button className="w-full bg-blue-500 text-white rounded-md py-2">
            Login
          </button>
          <div className="mt-4 text-center">
            <span className="mr-10 text-blue-500 cursor-pointer">Forgot password?</span>
            <span className="text-blue-500 cursor-pointer">Create an account</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
