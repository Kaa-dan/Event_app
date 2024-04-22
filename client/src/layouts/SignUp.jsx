import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import { Toast } from "@/util/Toast";
const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const Navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const onChangeHandler = async (e) => {
    try {
      setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    } catch (error) {
      console.log(error?.messsage);
    }
  };

  const submitHandler = async () => {
    try {
      if (formData.userName && formData.password && formData.email) {
        const res = await axios.post("/api/auth/signUp", formData);
        Toast(res.data.message);
        Navigate("/sign-in");
      } else {
        Toast("Credential required");
      }
    } catch (error) {
      Toast(error.response.data.message);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };

  return (
    <div className="flex items-center justify-center mt-36">
      <div className="w-1/2 bg-blue-300 shadow-lg rounded-xl p-10">
        <div className="flex flex-col">
          <div className="mb-8 text-center font-bold text-3xl text-blue-500">
            Sign Up
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="w-full border rounded-md py-2 px-3"
              placeholder="Username"
              id="userName"
              onChange={onChangeHandler}
              value={formData.userName}
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              className="w-full border rounded-md py-2 px-3"
              placeholder="Email"
              id="email"
              onChange={onChangeHandler}
              value={formData?.email}
            />
          </div>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              className="w-full border rounded-md py-2 px-3 pr-10"
              placeholder="Password"
              id="password"
              onChange={onChangeHandler}
              value={formData.password}
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
            className="w-full bg-blue-500 text-white rounded-md py-2 mt-4 "
            onClick={submitHandler}
          >
            Signup
          </button>
          <div className="mt-4 text-center">
            {/* <span className="mr-6 text-blue-500">Forgot password</span> */}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => {
                Navigate("/sign-in");
              }}
            >
              Already have an account?
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
