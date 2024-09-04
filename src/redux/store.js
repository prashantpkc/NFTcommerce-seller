import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import darkModeReducer from "./slices/darkModeSlice";
import navfixedReducer from "./slices/navfixedSlice";
import sidebarNavColorReducer from "./slices/sidebarNavColorSlice";
import sidebarDarkModeReducer from "./slices/sidebarDarkModeSlice";
import productReducer from "./slices/productSlice"; // Importing product slice reducer
import cardReducer from "./slices/cardSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,                   // Manages authentication state
    darkmode: darkModeReducer,           // Manages dark mode state
    navfix: navfixedReducer,             // Manages navbar fixed state
    sidebarbg: sidebarNavColorReducer,   // Manages sidebar background color
    product: productReducer,             // Manages product-related state
    sidebarDarkMode: sidebarDarkModeReducer, // Manages sidebar dark mode state
    card: cardReducer,
  },
});

export default store;
