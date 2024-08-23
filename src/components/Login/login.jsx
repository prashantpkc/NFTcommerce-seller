import React, { useState } from "react";
import image2 from "./image2.png";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="bg-gradient-to-t from-purple-500 to-blue-500 w-full min-h-screen flex flex-col lg:flex-row items-center justify-center">
      {/* Image container: hidden on screens smaller than large */}
      <div className="w-full lg:w-1/2  justify-center mb-10 lg:mb-0 hidden lg:flex">
        <img src={image2} alt="Login" className="max-w-full h-auto lg:ml-28" />
      </div>

      {/* Form container */}
      <div className="w-full lg:w-1/2 flex flex-col items-center text-white px-8">
        <div className="w-full max-w-md">
          <h1 className="font-bold text-2xl lg:text-3xl mb-6 text-center lg:text-left">
            Welcome to CENTUMO NFT Marketplace
          </h1>
          <p className="text-center lg:text-left">Sign In with your credentials!</p>

          <div className="flex justify-center lg:justify-start mt-4 mb-6">
            <button className="flex items-center justify-center border border-white rounded-2xl w-full py-2">
              <FaGoogle className="text-yellow-200 mr-2" />
              Sign In with Google
            </button>
          </div>

          <div className="flex items-center my-6">
            <hr className="flex-grow border-white" />
            <span className="px-2 text-white">OR</span>
            <hr className="flex-grow border-white" />
          </div>

          <div className="mb-4">
            <h1 className="mb-2">Email</h1>
            <input
              type="email"
              className="border border-white rounded-2xl w-full px-4 py-2 text-black"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4 relative">
            <h1 className="mb-2">Password</h1>
            <input
              type={passwordVisible ? "text" : "password"}
              className="border border-white rounded-2xl w-full px-4 py-2 text-black"
              placeholder="Enter your password"
            />
            <div
              className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? (
                <FaEyeSlash className="text-gray-500" />
              ) : (
                <FaEye className="text-gray-500" />
              )}
            </div>
          </div>

          <h1 className="text-yellow-300 text-right mb-4 cursor-pointer">Forgot Password?</h1>

          <button className="bg-yellow-300 text-black rounded-2xl w-full py-2 mb-6">
            Sign In
          </button>

          <p className="text-center">Don't have an account?</p>
          <button className="border border-white rounded-2xl w-full py-2 mt-4">
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
