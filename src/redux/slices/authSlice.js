import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  login,
  register,
  googleAuth,
  getUser as fetchUser,
  editUser as updateUser,
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

// Get user thunk
export const getUser = createAsyncThunk("auth/getUser", async (_, thunkAPI) => {
  try {
    const data = await fetchUser();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data || { message: "Failed to fetch user" }
    );
  }
});

// Edit user thunk
export const editUser = createAsyncThunk(
  "auth/editUser",
  async (payload, thunkAPI) => {
    try {
      const data = await updateUser(payload);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Edit user failed" }
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
      .addCase(getUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.data;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(editUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.data;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
