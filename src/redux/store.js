import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import darkModeReducer from "./slices/darkModeSlice";
import navfixedReducer from "./slices/navfixedSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    darkmode:darkModeReducer,
    navfix:navfixedReducer,

  },
});

export default store;
