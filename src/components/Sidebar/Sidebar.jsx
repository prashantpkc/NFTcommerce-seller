import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Dashboard as DashboardIcon,
  Add as AddIcon,
  MusicNote as MusicNoteIcon,
  ShoppingBag as ShoppingBagIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";
import { logout } from "../../redux/slices/authSlice"; // Adjust the import path

const Sidebar = ({ isSidebarOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDarkEnabled = useSelector((state) => state.darkmode.dark);
  const navbg = useSelector((state) => state.sidebarbg?.color);
  const isSidebarDarkEnabled = useSelector((state) => state.sidebarDarkMode.isSidebarDark);

  console.log(navbg, "navbg"); // Debugging output

  const colors = {
    cardBg: isDarkEnabled ? "#1a1a1a" : "#ffffff",
    borderColor: isDarkEnabled ? "#333333" : "#dddddd",
    text: isDarkEnabled ? "#ffffff" : "#000000",
  };

  const soltArt = [{ price: 100 }, { price: 150 }];
  const soltMusic = [{ price: 200 }, { price: 250 }];

  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(
      [...soltArt, ...soltMusic].reduce((acc, data) => acc + data.price, 0)
    );
  }, [soltArt, soltMusic]);

  const sideBarLink = [
    { icon: <DashboardIcon fontSize="small" />, link: "Dashboard", href: "/dashboard" },
    { icon: <AddIcon fontSize="small" />, link: "Add Product", href: "/add-product" },
    { icon: <MusicNoteIcon fontSize="small" />, link: "Your Product", href: "/your-products" },
    { icon: <ShoppingBagIcon fontSize="small" />, link: "Purchased Products", href: "/purchased-product" },
    { icon: <PersonIcon fontSize="small" />, link: "Profile", href: "/profile" },
    { icon: <LogoutIcon fontSize="small" />, link: "Logout", href: "/signup" },
  ];

  const handleLinkClick = (href, link) => {
    if (link === "Logout") {
      console.log("Logging out..."); // Debugging output
      dispatch(logout()); // Dispatch the logout action
      navigate(href); // Navigate to other links
      // Adjust the delay if necessary
    } else {
    }
  };

  const cardStyle = {
    backgroundColor: colors.cardBg,
    border: `1px solid ${colors.borderColor}`,
    color: colors.text,
  };

  const activeLinkStyle = {
    backgroundColor: isSidebarDarkEnabled ? "#192555" : navbg || "#f5f5f5",
    color: colors.text,
  };

  return (
    <div
      className={`fixed top-2 left-0 w-[75%] sm:w-[20%] h-screen px-5 py-3 z-20 transition-transform duration-300 ease-in-out transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } sm:translate-x-0`}
    >
      <div className="h-[100%] rounded-2xl p-2 shadow-inner overflow-y-auto" style={cardStyle}>
        <div className="h-[10%] flex gap-2 sm:gap-5 flex-col justify-center items-center">
          <div className="flex gap-2">
            <ShoppingBagIcon fontSize="large" color="primary" />
            <p className={`text-base sm:text-lg font-semibold ${isDarkEnabled ? "text-white" : "text-green-500"}`}>
              Seller Dashboard
            </p>
          </div>
          <div className="w-full">
            <hr className="w-full" style={{ backgroundColor: isDarkEnabled ? "gray" : "lightgray", height: "1px", border: "none" }} />
          </div>
        </div>
        <div className="h-3/5 py-2">
          {sideBarLink.map((item, index) => (
            <div
              className={`h-10 sm:h-12 rounded-xl px-2 flex justify-between items-center cursor-pointer mb-1 ${
                item.href === window.location.pathname
                  ? isDarkEnabled
                    ? "bg-[#192555] shadow-inner"
                    : `bg-[${navbg}] shadow-inner`
                  : ""
              }`}
              key={index}
              onClick={() => handleLinkClick(item.href, item.link)}
              style={item.href === window.location.pathname ? activeLinkStyle : {}}
            >
              <div className="flex items-baseline gap-2 sm:gap-3">
                {item.icon}
                <p className={`text-sm sm:text-base ${item.href === window.location.pathname ? "font-semibold" : ""}`} style={{ color: colors.text }}>
                  {item.link}
                </p>
              </div>
              <ArrowForwardIcon fontSize="small" style={{ color: isDarkEnabled ? "gray" : "black" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
