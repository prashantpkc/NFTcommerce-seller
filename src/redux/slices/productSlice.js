import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createProductApi, getSellerProductsApi, getSoldCoursesBySellerApi } from "../apis/productApi";

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
  async (_, thunkAPI) => {
    try {
      const data = await getSellerProductsApi();
      return data;
    } catch (error) {
      console.error("Failed to fetch seller products:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Failed to fetch seller products" }
      );
    }
  }
);

// Get Seller Sold Courses Thunk
export const getSoldCoursesBySellerThunk = createAsyncThunk(
  "product/getSoldCoursesBySeller",
  async (_, thunkAPI) => {
    try {
      const data = await getSoldCoursesBySellerApi();
      return data;
    } catch (error) {
      console.error("Failed to fetch sold products:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Failed to fetch sold products" }
      );
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],  // Array to store all products
    soldCourses: [], // Array to store sold products
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
      })

      .addCase(getSoldCoursesBySellerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getSoldCoursesBySellerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.soldCourses = action.payload; // Assuming action.payload is an array of sold courses
      })
      .addCase(getSoldCoursesBySellerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export default productSlice.reducer;
