import { BASE_URL } from "../../../baseUrl"; // Adjust the path as needed
import axios from "axios";
const token = localStorage.getItem("access_token"); // Corrected the token name
console.log(token, "token")

// Create an Axios instance with default settings
const api = axios.create({
  baseURL: BASE_URL, // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Authentication API request functions
export const login = async (payload) => {
  try {
    const response = await api.post("/eseller/login", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (payload) => {
  try {
    const response = await api.post("/eseller/register", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const googleAuth = async (payload) => {
  try {
    const response = await api.post("/eseller/google-auth", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUser = async () => {
  try {
    const response = await api.get("/eseller/get-user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Ensure you return the response data
  } catch (error) {
    throw error;
  }
};

export const editUser = async (payload) => {
  try {
    const response = await api.put("/eseller/edit-user", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


//address

// Add a new address
export const addAddress = async (payload) => {
  try {
    const response = await api.post("/eseller/add-address", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};