import { BASE_URL } from "../../../baseUrl"; // Adjust the path as needed
import axios from "axios";

// Create an Axios instance with default settings
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
  },
});


// API request function to get products for a specific seller
export const getSellerCardSummaryApi = async () => {
    try {
      const response = await api.get("/eseller/seller-card-summary");
      return response.data;
    } catch (error) {
      // Extract and throw a more detailed error message if available
      throw error.response?.data || error.message;
    }
};
export const getMonthlySalesDataApi = async (year) => {
    try {
      const response = await api.get(`/eseller/get-monthly-data`, {
        params: {
          year,
          
        }
      });
      return response.data;
    } catch (error) {
      // Extract and throw a more detailed error message if available
      throw error.response?.data || error.message;
    }
  };
  