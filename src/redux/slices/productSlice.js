import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createProductApi, getSellerProductsApi } from "../apis/productApi";

// Create Product Thunk
export const createProductThunk = createAsyncThunk(
  "product/createProduct",
  async (payload, thunkAPI) => {
    try {
      const data = await createProductApi(payload);
      return data;
    } catch (error) {
      console.error("Failed to create product:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Failed to create the product" }
      );
    }
  }
);

// Get Seller Products Thunk
export const getSellerProductsThunk = createAsyncThunk(
  "product/getSellerProducts",
  async (sellerId, thunkAPI) => {
    try {
      const data = await getSellerProductsApi(sellerId);
      return data;
    } catch (error) {
      console.error("Failed to fetch seller products:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Failed to fetch seller products" }
      );
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],  // Array to store products
    loading: false,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.products.push(action.payload); // Assuming action.payload is a single product
      })
      .addCase(createProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getSellerProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getSellerProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.products = action.payload; // Assuming action.payload is an array of products
      })
      .addCase(getSellerProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export default productSlice.reducer;
