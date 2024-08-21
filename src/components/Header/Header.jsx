import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { Card } from "../Card/Card";

const Header = () => {
  const sellerData = {
    name: "Dummy Seller", // Replace this with your dummy seller data
  };

  const handleSettingClick = () => {
    // Dummy function to mimic setting modal functionality
    console.log("Settings clicked");
  };

  return (
    <div className="w-full bg-[#070A68] border-b border-[#000] flex items-center justify-between p-4 fixed top-0  right-0 z-10">
      {/* Main Header Content */}
      <div className="flex-1 flex justify-start items-center ml-72 ">
        <div className="text-[#fff]">
          <p>Welcome To</p>
          <p>{sellerData.name}</p>
        </div>
        <div className="flex gap-4"></div>
        <div></div>
        <div onClick={handleSettingClick}>
        </div>
      </div>
        {/* <Card /> */}
          <SettingsIcon style={{ color: "white", height: 20, width: 20 }} />
    </div>
  );
};

export default Header;
