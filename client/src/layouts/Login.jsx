import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Footer from "@/components/Footer";
const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };
  const Navigate = useNavigate();

  return (
    <div className="flex items-center justify-center mt-36   ">
      <div className="w-1/2 bg-blue-300 shadow-lg rounded-xl p-10">
        <div className="flex flex-col">
          <div className="mb-8 text-center font-bold text-3xl text-blue-500">
            Sign in
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="w-full border rounded-md py-2 px-3"
              placeholder="Username"
            />
          </div>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              className="w-full border rounded-md py-2 px-3 pr-10"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordVisible ? (
              <FiEyeOff
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <FiEye
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            )}
          </div>
          <button className="w-full bg-blue-500 text-white rounded-md mt-4 py-2">
            Login
          </button>
          <div className="mt-4 text-center">
            {/* <span className="mr-10 text-blue-500 cursor-pointer">
              Forgot password?
            </span> */}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => {
                Navigate("/sign-up");
              }}
            >
              Create an account
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
