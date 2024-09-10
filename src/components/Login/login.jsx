import React, { useState, useEffect , FormEvent} from "react";
import image2 from "./image2.png";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, googleAuthUser } from "../../redux/slices/authSlice"; // Adjust the path as needed
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import { toast } from "react-hot-toast"; // Assuming you are using react-toastify for notifications

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  console.log(status, "status")

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  // useEffect(() => {
  //   if (error) {
  //     console.log(error);
  //     toast.error(error.error);
  //   }

  //   if (status === 'succeeded') {
  //       toast.success("Logged in successful!");
  //       navigate("/dashboard"); 
  //     }
  // }, []);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const goSignup = () => {
    navigate("/Signup");
  };
  const handleLogin = async (e) => {
    console.log("hello")
    e.preventDefault();
    try {
     const result = await dispatch(loginUser({ email, password }));
     console.log(result.payload)
     if(result.payload?.success){
      navigate("/dashboard"); 
     }
    } catch (error) {
      console.log(error)
    }
    
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
    <div className="bg-gradient-to-t from-purple-500 to-blue-500 w-full min-h-screen flex flex-col  lg:flex-row items-center justify-center">
      {/* Image container: hidden on screens smaller than large */}
      <div className="w-full lg:w-1/2  justify-center mb-10 lg:mb-0 hidden lg:flex ">
        <img src={image2} alt="Login" className="max-w-full h-auto lg:ml-28" />
      </div>

      {/* Form container */}
      <div className="w-full lg:w-1/2 flex flex-col  items-center text-white px-8 ">
        <form onSubmit={handleLogin} className="w-full max-w-md">
          <h1 className="font-bold text-3xl  mb-6 text-center lg:text-left">
            Welcome to CENTUMO NFT Marketplace
          </h1>
          <p className="text-center text-2xl lg:text-xl lg:text-left">
            Sign In with your credentials!
          </p>

          <div className="flex justify-center lg:justify-start mt-4 mb-6">
            <button
              className="flex items-center justify-center border border-white rounded-2xl w-full py-2"
              onClick={signWithGoogle} // Attach Google sign-in handler
            >
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
              className="border outline-none border-white rounded-2xl w-full px-4 py-2 text-black"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4 relative">
            <h1 className="mb-2">Password</h1>
            <input
              type={passwordVisible ? "text" : "password"}
              className="border outline-none border-white rounded-2xl w-full px-4 py-2 text-black absolute"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="relative ml-[90%] mt-[5%] inset-y-0 right-0 pr-4 flex items-center cursor-pointer"
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
            type="submit"
            className="bg-yellow-300 text-black rounded-2xl w-full py-2 mb-6"
            // onClick={handleLogin}
          >
            Sign In
          </button>

          <p className="text-center">Don't have an account?</p>
          <button
            className="border border-white rounded-2xl w-full py-2 mt-4"
            onClick={goSignup}
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
