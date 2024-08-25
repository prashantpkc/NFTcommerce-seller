import { BASE_URL } from "../../../baseUrl"; // Adjust the path as needed
import axios from "axios";

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

export const getSeller = async () => {
  try {
    const token = localStorage.getItem("access_token"); // Corrected the token retrieval
    const response = await api.get("/eseller/get-eseller", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Ensure you return the response data
  } catch (error) {
    throw error;
  }
};

export const editSeller = async (payload) => {
  try {
    const token = localStorage.getItem("access_token"); // Corrected the token retrieval
    const response = await api.put("/eseller/edit-eseller", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Upload profile picture
export const uploadProfilePic = async (payload) => {
  try {
    const token = localStorage.getItem("access_token"); // Corrected the token retrieval

    const response = await api.patch("/eseller/upload-profile-pic", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Upload ID card
export const uploadIdCard = async (payload) => {
  try {
    const token = localStorage.getItem("access_token"); // Corrected the token retrieval

    const response = await api.patch("/eseller/upload-id-card", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
