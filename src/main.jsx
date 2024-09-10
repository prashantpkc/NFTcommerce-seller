import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "../style.css";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast"; // Import Toaster
import store from "./redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
    <Toaster />
  </Provider>
);
