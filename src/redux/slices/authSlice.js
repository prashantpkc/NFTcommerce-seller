import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  login,
  register,
  googleAuth,
  getSeller as fetchSeller,
  editSeller as updateSeller,
  uploadProfilePic as uploadProfilePicApi,
  uploadIdCard as uploadIdCardApi,
} from "../apis/authApi";

// Login thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload, thunkAPI) => {
    try {
      const data = await login(payload);
      localStorage.setItem("access_token", data.token); // Store the token
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Login failed" }
      );
    }
  }
);

// Signup thunk
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (payload, thunkAPI) => {
    try {
      const data = await register(payload);
      localStorage.setItem("access_token", data.token); // Store the token
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Signup failed" }
      );
    }
  }
);

// Google Auth thunk
export const googleAuthUser = createAsyncThunk(
  "auth/googleAuthUser",
  async (payload, thunkAPI) => {
    try {
      const data = await googleAuth(payload);
      localStorage.setItem("access_token", data.token); // Store the token
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Google Auth failed" }
      );
    }
  }
);

// Get seller thunk
export const getSeller = createAsyncThunk(
  "auth/getSeller",
  async (_, thunkAPI) => {
    try {
      const data = await fetchSeller();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Failed to fetch seller" }
      );
    }
  }
);

// Edit seller thunk
export const editSeller = createAsyncThunk(
  "auth/editSeller",
  async (payload, thunkAPI) => {
    try {
      const data = await updateSeller(payload);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Edit seller failed" }
      );
    }
  }
);

// Upload profile pic thunk
export const uploadProfilePic = createAsyncThunk(
  "auth/uploadProfilePic",
  async (payload, thunkAPI) => {
    try {
      const data = await uploadProfilePicApi(payload);
      // Trigger getSeller after successful upload
      thunkAPI.dispatch(getSeller());
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Upload profile picture failed" }
      );
    }
  }
);

// Upload ID card thunk
export const uploadIdCard = createAsyncThunk(
  "auth/uploadIdCard",
  async (payload, thunkAPI) => {
    try {
      const data = await uploadIdCardApi(payload);
      // Trigger getSeller after successful upload
      thunkAPI.dispatch(getSeller());
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Upload ID card failed" }
      );
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("access_token") || null,
    status: "idle",
    error: null,
    uploadStatus: {
      profilePic: "idle",
      idCard: "idle",
    },
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("access_token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload.data;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      
      // Signup cases
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      
      // Google Auth cases
      .addCase(googleAuthUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(googleAuthUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload.data;
      })
      .addCase(googleAuthUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      
      // Get Seller cases
      .addCase(getSeller.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getSeller.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.data;
      })
      .addCase(getSeller.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      
      // Edit Seller cases
      .addCase(editSeller.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(editSeller.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.data;
      })
      .addCase(editSeller.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      
      // Upload Profile Pic cases
      .addCase(uploadProfilePic.pending, (state) => {
        state.uploadStatus.profilePic = "loading";
        state.error = null;
      })
      .addCase(uploadProfilePic.fulfilled, (state, action) => {
        state.uploadStatus.profilePic = "succeeded";
        state.user.profile_pic = action.payload.data; // Assuming response has profile_pic
      })
      .addCase(uploadProfilePic.rejected, (state, action) => {
        state.uploadStatus.profilePic = "failed";
        state.error = action.payload;
      })
      
      // Upload ID Card cases
      .addCase(uploadIdCard.pending, (state) => {
        state.uploadStatus.idCard = "loading";
        state.error = null;
      })
      .addCase(uploadIdCard.fulfilled, (state, action) => {
        state.uploadStatus.idCard = "succeeded";
        state.user.idCard = action.payload.data; // Assuming response has idCard
      })
      .addCase(uploadIdCard.rejected, (state, action) => {
        state.uploadStatus.idCard = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
