import React from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

const Layout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 ml-[20%] flex flex-col">
        {/* Header */}
        <Header />
{/* 
        <div className="flex-1 p-4 mt-16">
          <p>Main content goes here.</p>
        </div> */}
      </div>
    </div>
  );
};

export default Layout;
