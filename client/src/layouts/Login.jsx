import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

import axios from "axios";
import { Toast } from "@/util/Toast";
import { useDispatch, useSelector } from "react-redux";
import { signInSuccess, signInFailutre } from "@/store/userSlice";
import { data } from "autoprefixer";
const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };

  const onChangeHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const submitHandler = async () => {
    try {
      if (formData.password && formData.email) {
        const res = await axios.post("/api/auth/signIn", formData);
        console.log(res.data.user);
        dispatch(signInSuccess(res.data.user));
        Navigate("/");
        Toast("Welcome");
      } else {
        Toast("credentials required");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center mt-36   ">
      <div className="w-1/2 bg-blue-300 shadow-lg rounded-xl p-10">
        <div className="flex flex-col">
          <div className="mb-8 text-center font-bold text-3xl text-blue-500">
            Sign in
          </div>
          <div className="mb-4">
            <input
              type="email"
              className="w-full border rounded-md py-2 px-3"
              placeholder="Email"
              id="email"
              onChange={onChangeHandler}
              value={formData.email}
            />
          </div>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              className="w-full border rounded-md py-2 px-3 pr-10"
              placeholder="Password"
              id="password"
              value={formData.password}
              onChange={onChangeHandler}
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
          <button
            className="w-full bg-blue-500 text-white rounded-md mt-4 py-2"
            onClick={submitHandler}
          >
            Login
          </button>
          <div className="mt-4 text-center">
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
