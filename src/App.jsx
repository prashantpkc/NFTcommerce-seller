import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header"; // Assuming you have a Header component
import Footer from "./components/Footer/Footer";
import Dashboard from "./components/Dashboard/Dashboard";
import Sidebar from "./components/Sidebar/Sidebar";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login/login";
import Signup from "./components/signup/signup";
import Profile from "./components/Profile/profile";
import AddProduct from "./components/AddProduct/AddProduct";
import Products from "./components/Products/Products";

const App = () => {
  return (
    <Router>
      
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/add-product" element={<AddProduct />}/>
        <Route path="/your-products" element={<Products />}/>

      </Routes>
    
    </Router>
  );
};

export default App;
