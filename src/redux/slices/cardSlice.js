import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMonthlySalesDataApi, getSellerCardSummaryApi } from '../apis/cardApi'; // Adjust the path as needed

// Initial state for the card slice
const initialState = {
  summaryData: null,
  monthlyData: null,
  loading: false,
  error: null,
};

// Thunk for fetching the seller card summary
export const fetchSellerCardSummary = createAsyncThunk(
  'card/fetchSellerCardSummary',
  async (_, thunkAPI) => {
    try {
      const response = await getSellerCardSummaryApi();
      return response; // Assuming response is the data
    } catch (error) {
      // Return more detailed error information if available
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk for fetching monthly sales data
export const fetchMonthlySalesData = createAsyncThunk(
  'card/fetchMonthlySalesData',
  async ({ year }, thunkAPI) => {
    try {
      const response = await getMonthlySalesDataApi(year);
      return response; // Assuming response is the data
    } catch (error) {
      // Return more detailed error information if available
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create the card slice
const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling seller card summary
      .addCase(fetchSellerCardSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerCardSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summaryData = action.payload;
      })
      .addCase(fetchSellerCardSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handling monthly sales data
      .addCase(fetchMonthlySalesData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMonthlySalesData.fulfilled, (state, action) => {
        state.loading = false;
        state.monthlyData = action.payload;
      })
      .addCase(fetchMonthlySalesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the card reducer to be used in the store
export default cardSlice.reducer;
