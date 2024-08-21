import React from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content Area */}
        <main className="flex-1 ml-[20%] p-4">
          {children}
        </main>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
