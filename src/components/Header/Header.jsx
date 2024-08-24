import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const sellerData = {
    name: "Prashant", // Replace this with your dummy seller data
  };

  const handleSettingClick = () => {
    console.log("Settings clicked");
  };

  const goDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="w-full bg-gradient-to-r from-[#0A0D75] to-[#0D1380] border-b border-gray-800 flex items-center justify-between px-8 py-4 fixed top-0 right-0 z-10 h-28 shadow-md ">
      {/* Left Section */}
      <div className="flex items-center space-x-6 ml-[20%]">
        <FaArrowLeft
          onClick={goDashboard}
          className="text-white cursor-pointer hover:text-gray-300 transition duration-300"
          size={20}
        />
        <div className="text-white">
          <h1 className="text-xl font-semibold">Welcome to {sellerData.name}</h1>
          {/* <p className="text-sm text-gray-300">Your dashboard</p> */}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-6">
        <SettingsIcon
          onClick={handleSettingClick}
          style={{ color: "white", height: 24, width: 24 }}
          className="cursor-pointer hover:text-gray-300 transition duration-300"
        />
      </div>
    </div>
  );
};

export default Header;
