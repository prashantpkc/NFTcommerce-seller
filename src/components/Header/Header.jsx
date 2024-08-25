import React, { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { FaArrowLeft, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar"; // Import your Sidebar component

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

  const handleSidebarClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <div className="w-full bg-gradient-to-r from-[#0A0D75] to-[#0D1380] border-b border-gray-800 flex items-center justify-between px-8 py-4 fixed top-0 right-0 z-10 h-28 shadow-md">
        {/* Left Section */}
        <div className="flex items-center space-x-6 ml-[20%]">
          <FaArrowLeft
            onClick={goDashboard}
            className="text-white cursor-pointer hover:text-gray-300 transition duration-300"
            size={20}
          />
          <div className="text-white">
            <h1 className="text-xl font-semibold">Welcome to {sellerData.name}</h1>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6">
          {/* Sidebar Icon - Visible only on mobile screens */}
          <FaBars
            onClick={handleSidebarClick}
            className="text-white cursor-pointer hover:text-gray-300 transition duration-300 md:hidden"
            size={24}
          />
          <SettingsIcon
            onClick={handleSettingClick}
            style={{ color: "white", height: 24, width: 24 }}
            className="cursor-pointer hover:text-gray-300 transition duration-300"
          />
        </div>
      </div>

      {/* Conditionally render the Sidebar */}
      {isSidebarOpen && (
        <Sidebar closeSidebar={closeSidebar} isSidebarOpen={isSidebarOpen} />
      )}
    </>
  );
};

export default Header;
