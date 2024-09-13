import React, { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Drawer from "../Drawer/Drawer";
import { BellIcon } from "../../assets/icon/Icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { openSettingModal } from "../../redux/slices/settingSlice";

const Header = () => {
  const auth = useSelector((state)=>state.auth?.user);
  const modal = useSelector((state)=>state.modal);
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  

  const handleSettingClick = () => {
    setIsDrawerOpen(true);
  };

  const handleSidebarClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <div className="w-full flex items-center justify-between py-4">
        <div className="flex items-center">
          <div className="text-white">
            <h1 className="text-xl font-semibold">Welcome to</h1>
            <h6>{auth?.name}</h6>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <FaBars
            onClick={handleSidebarClick}
            className="text-white cursor-pointer hover:text-gray-300 transition duration-300 md:hidden"
            size={24}
          />
          <SettingsIcon
            onClick={()=>dispatch(openSettingModal({open:true, type:"setting"}))}
            style={{ color: "white", height: 24, width: 24 }}
            className="cursor-pointer hover:text-gray-300 transition duration-300"
          />
         <div  onClick={()=>dispatch(openSettingModal({open:true, type:"notification"}))}>
          <BellIcon color="white" width="24" height="24"/>
         </div>
        </div>
      </div>
      {isSidebarOpen && (
        <Sidebar closeSidebar={closeSidebar} isSidebarOpen={isSidebarOpen} />
      )}
      {modal.open&&<Drawer/>}
    </>
  );
};

export default Header;
