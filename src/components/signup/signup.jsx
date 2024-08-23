import React, { useState, useEffect } from "react";
import image2 from "./image2.png";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, googleAuthUser } from "../../redux/slices/authSlice";
import { toast } from "react-hot-toast"; // Assuming you are using react-toastify for notifications

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Changed from fullName to name
  const [passwordVisible, setPasswordVisible] = useState(false);

  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(error.error);
    }
  }, [error]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const GoSignIn = () => {
    navigate("/Login");
  };

  const handleSignup = () => {
    dispatch(signupUser({ email, password, name }));
  };

  const signWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { displayName: name, email, photoURL: profile_pic } = result.user;

      // Dispatch the googleAuthUser action with the user details
      const authResult = await dispatch(
        googleAuthUser({ name, email, profile_pic })
      );

      console.log(authResult, "auth result");

      if (authResult.payload?.success) {
        toast.success("Signed in with Google successfully!");
        navigate("/dashboard"); // Redirect to homepage on successful Google signup
      }
    } catch (error) {
      toast.error("Failed to sign in with Google");
      console.error("Google Auth Error:", error);
    }
  };

  return (
    <div className="bg-gradient-to-t from-purple-500 to-blue-500 w-full min-h-screen flex flex-col lg:flex-row items-center justify-center overflow-hidden">
      {/* Image container: hidden on screens smaller than large */}
      <div className="w-full lg:w-1/2  justify-center hidden lg:flex">
        <img src={image2} alt="Signup" className="max-w-full h-auto lg:ml-28" />
      </div>

      {/* Form container */}
      <div className="w-full lg:w-1/2 flex flex-col items-center text-white px-4">
        <div className="w-full max-w-md">
          <h1 className="font-bold text-3xl mb-4 text-center lg:text-left">
            Welcome to CENTUMO NFT Marketplace
          </h1>
          <p className="text-center text-2xl lg:text-lg lg:text-left lg:mb-2 sm:mb-5">
            Sign Up with your credentials!
          </p>

          <div className="flex justify-center lg:justify-start mb-4">
            <button
              onClick={signWithGoogle}
              className="flex items-center justify-center border border-white rounded-2xl w-full py-2"
            >
              <FaGoogle className="text-yellow-200 mr-2" />
              Sign Up with Google
            </button>
          </div>

          <div className="flex items-center mb-4">
            <hr className="flex-grow border-white" />
            <span className="px-2 text-white">OR</span>
            <hr className="flex-grow border-white" />
          </div>

          <div className="mb-4">
            <h1 className="mb-2">Full Name</h1>
            <input
              type="text"
              className="border border-white rounded-2xl w-full px-4 py-2 text-black"
              placeholder="Enter your full name"
              value={name} // Updated to use name
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <h1 className="mb-2">Email</h1>
            <input
              type="email"
              className="border border-white rounded-2xl w-full px-4 py-2 text-black"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4 relative">
            <h1 className="mb-2">Password</h1>
            <input
              type={passwordVisible ? "text" : "password"}
              className="border border-white rounded-2xl w-full px-4 py-2 text-black"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute inset-y-0 right-0 top-8 pr-4 flex items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? (
                <FaEye className="text-gray-500" />
              ) : (
                <FaEyeSlash className="text-gray-500" />
              )}
            </div>
          </div><br/>

          {/* <h1 className="text-yellow-300 text-right mb-4 cursor-pointer">Forgot Password?</h1> */}

          <button
            onClick={handleSignup}
            className="bg-yellow-300 text-black rounded-2xl w-full py-2 mb-4"
          >
            Sign Up
          </button>

          <p className="text-center mb-4">Already have an account?</p>
          <button
            className="border border-white rounded-2xl w-full py-2"
            onClick={GoSignIn}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
