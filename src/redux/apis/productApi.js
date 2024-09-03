import { BASE_URL } from "../../../baseUrl"; // Adjust the path as needed
import axios from "axios";

// Create an Axios instance with default settings
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
  },
});

// Create Product API request function
export const createProductApi = async (payload) => {
  try {
    const response = await api.post("/eproduct/create-product", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    // Extract and throw a more detailed error message if available
    throw error.response?.data || error.message;
  }
};

// API request function to get products for a specific seller
export const getSellerProductsApi = async () => {
    try {
      const response = await api.get("/eseller/get-seller-products");
      return response.data;
    } catch (error) {
      // Extract and throw a more detailed error message if available
      throw error.response?.data || error.message;
    }
};
