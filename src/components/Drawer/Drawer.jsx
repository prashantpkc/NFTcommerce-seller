import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeDark, setDark } from "../../redux/slices/darkModeSlice";
import { removeNav, setNav } from "../../redux/slices/navfixedSlice";
import { setNavColor } from "../../redux/slices/sidebarNavColorSlice";
import { setSidebarDark, setSidebarLight } from "../../redux/slices/sidebarDarkModeSlice";

import { Close } from "@mui/icons-material";
import { Stack, Switch, styled } from "@mui/material";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 44,
  height: 24,
  padding: 0,
  display: "flex",
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    width: 20,
    height: 20,
    borderRadius: 12,
  },
  "& .MuiSwitch-track": {
    borderRadius: 24 / 2,
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,.35)" : "rgba(0,0,0,.25)",
  },
}));

const Drawer = ({ open, onClose }) => {
  const [selectedColor, setSelectedColor] = useState("#eaedfc");
  const isDarkEnabled = useSelector((state) => state.darkmode.dark);
  const navfix = useSelector((state) => state.navfix.fix);
  const isSidebarDarkEnabled = useSelector((state) => state.sidebarDarkMode.isSidebarDark);
  const dispatch = useDispatch();

  const handleColorClick = (color) => {
    setSelectedColor(color);
    dispatch(setNavColor(color));
  };

  const handleDarkMode = () => {
    dispatch(setDark());
  };

  const removeDarkMode = () => {
    dispatch(removeDark());
  };

  const handleRemoveNav = () => {
    dispatch(removeNav());
  };

  const handleSetSidebarLight = () => {
    dispatch(setSidebarLight());
  };

  const handleSetSidebarDark = () => {
    dispatch(setSidebarDark());
  };

  const handleSetNav = () => {
    dispatch(setNav());
  };

  const handleWhatsapp = () => {
    const link = "https://your-link-here.com";
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(link)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleFacebook = () => {
    const link = "https://your-link-here.com";
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`;
    window.open(facebookUrl, "_blank");
  };

  if (!open) return null; // Early return if not open

  return (
    <div className="relative">
      <div className="fixed z-50 top-0 right-0 w-96 h-screen bg-[#dde4ff] border">
        <div className="h-full">
          <div className="flex justify-between px-8 py-6 h-[15%]">
            <div className="flex flex-col">
              <p className="text-xl text-[#384b6a] font-semibold">Dashboard Configurator</p>
              <p className="text-[#717d96]">See our dashboard options.</p>
            </div>
            <div onClick={onClose}>
              <Close />
            </div>
          </div>
          <div className="overflow-y-auto px-8 pb-4 h-[85%]">
            <div className="py-4 mb-4">
              <p className="text-xl mb-2 text-[#384b6a]">Sidebar Colors</p>
              <div className="flex gap-2">
                {["#eaedfc", "#262626", "#1194ef", "#2dceb6", "#fb7c40", "#f54b48"].map((color) => (
                  <p
                    key={color}
                    className={`w-6 h-6 rounded-full cursor-pointer border transition-transform transform hover:scale-110 ${
                      selectedColor === color ? "border-black" : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorClick(color)}
                  ></p>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[#384b6a] text-xl">Sidenav Type</p>
              <p className="text-[#717d96]">Choose between 2 different sidenav types.</p>
              <div className="flex justify-between mt-4 mb-8">
                <div className="h-10 w-36 cursor-pointer bg-[#7664e4] rounded-lg flex justify-center items-center">
                  <p className="text-[#fff] font-semibold" onClick={handleSetSidebarLight}>White</p>
                </div>
                <div className="h-10 w-36 border cursor-pointer border-[#3520ed] rounded-lg flex justify-center items-center">
                  <p className="text-[#3520ed] font-semibold" onClick={handleSetSidebarDark}>Dark</p>
                </div>
              </div>
              <div>
                <div className="flex justify-between">
                  <p className="text-[#384b6a] text-lg">Navbar fixed</p>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <AntSwitch
                      checked={navfix}
                      inputProps={{ "aria-label": "ant design" }}
                      onChange={navfix ? handleRemoveNav : handleSetNav}
                    />
                  </Stack>
                </div>
                <hr className="border-t border-gray-300 my-4" />
                <div className="flex justify-between">
                  <p className="text-[#384b6a] text-lg">Light / Dark</p>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <AntSwitch
                      checked={isDarkEnabled}
                      onChange={isDarkEnabled ? removeDarkMode : handleDarkMode}
                      inputProps={{ "aria-label": "ant design" }}
                    />
                  </Stack>
                </div>
              </div>
              <div className="flex flex-col gap-5 mt-8">
                <div className="flex justify-center items-center cursor-pointer w-full h-10 bg-black text-white rounded-md">
                  <p className="text-white font-semibold">Free Download</p>
                </div>
                <div className="flex justify-center items-center cursor-pointer w-full h-10 border border-[black] text-white rounded-md">
                  <p className="text-[#384b6a] font-semibold">View Documentation</p>
                </div>
              </div>
              <div className="mt-8 flex flex-col justify-center items-center">
                <p className="text-[#384b68] font-semibold mb-2">Thank you for sharing!</p>
                {/* <div className="flex gap-8">
                  <div onClick={handleWhatsapp} className="cursor-pointer text-[#24d07d"]>
                    <i className="fab fa-whatsapp fa-2x"></i>
                  </div>
                  <div onClick={handleFacebook} className="cursor-pointer text-[#0091ea"]>
                    <i className="fab fa-facebook fa-2x"></i>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
