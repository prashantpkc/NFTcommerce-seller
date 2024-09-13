import React from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';


const Layout = ({ children }) => {
  return (
    <div className="relative flex w-full min-h-screen ">
      <div
        className="fixed top-0 left-0 w-full"
        style={{
          height: "43vh",
           background: "#070a68",
          // background:useSellerThemeColors(isDarkEnabled).layoutbg,
          zIndex: 0,
        }}
      ></div>
      <div
        className="fixed bottom-0 left-0 w-full"
        style={{
          height: "59vh",
          background: "#f4f6f8",
          zIndex: 0,
        }}
      ></div>
      <div className="w-1/5 z-10 fixed hidden lg:block">
        <Sidebar />
      </div>
      <div className="w-full px-4 lg:w-4/5 z-10 ml-auto">
        <div className={true?"mb-2":""}>
          <Header />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
