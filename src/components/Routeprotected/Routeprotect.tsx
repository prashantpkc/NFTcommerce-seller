import React from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import {toast} from "react-hot-toast";

const Routeprotect = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decodedToken: { exp: number } = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      localStorage.clear();
      toast.error("Session expired!")
      
      
      return <Navigate to="/login" replace />;
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }



  return children;
};

export default Routeprotect;


