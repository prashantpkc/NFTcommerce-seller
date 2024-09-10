import React from "react";
import { useNavigate } from "react-router-dom";

const Pagenotfound = () => {
    const navigate = useNavigate();
    const back =() => {
        navigate("/")
    }
  return (
    <div className="w-[100vh] h-screen">
      <div className="w-full h-full flex-col flex justify-center items-center">
        <div className="w-auto sm:w-96 h-auto sm:h-96">
          <img
            src="/public/pagenotfound.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div onClick={back} className="p-4 cursor-pointer">
            <p className="border text-[#5c0f0f] bg-[#a1dcfa]">Back</p>
        </div>
      </div>
    </div>
  );
};

export default Pagenotfound

