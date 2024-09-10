import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/login";
import Signup from "./components/signup/signup";
import Profile from "./components/Profile/profile";
import AddProduct from "./components/AddProduct/AddProduct";
import Products from "./components/Products/Products";
import PurchasedProduct from "./components/PurchasedProduct/PurchasedProduct";
import Pagenotfound from "./components/PageNotFound/Pagenotfound";
import Routeprotect from "./components/Routeprotected/Routeprotect";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <Routeprotect>
              <Dashboard />
            </Routeprotect>
          }
        />
        <Route
          path="/profile"
          element={
            <Routeprotect>
              <Profile />
            </Routeprotect>
          }
        />
        <Route
          path="/add-product"
          element={
            <Routeprotect>
              <AddProduct />
            </Routeprotect>
          }
        />
        <Route
          path="/your-products"
          element={
            <Routeprotect>
              <Products />
            </Routeprotect>
          }
        />
        <Route
          path="/purchased-product"
          element={
            <Routeprotect>
              <PurchasedProduct />
            </Routeprotect>
          }
        />

        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </Router>
  );
};

export default App;
