import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header"; // Assuming you have a Header component
import Footer from "./components/Footer/Footer";
import Dashboard from "./components/Dashboard/Dashboard";
import Sidebar from "./components/Sidebar/Sidebar";
import Layout from "./components/Layout/Layout";

const App = () => {
  return (
    <Router>
        <Layout/>
      {/* <Header />  */}
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>} />

      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
