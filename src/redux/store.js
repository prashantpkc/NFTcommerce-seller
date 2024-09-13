import { configureStore } from "@reduxjs/toolkit";
import {persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/authSlice";
import settingSlice from "./slices/settingSlice";
import darkModeReducer from "./slices/darkModeSlice";
import navfixedReducer from "./slices/navfixedSlice";
import sidebarNavColorReducer from "./slices/sidebarNavColorSlice";
import sidebarDarkModeReducer from "./slices/sidebarDarkModeSlice";
import productReducer from "./slices/productSlice";
import cardReducer from "./slices/cardSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistAuth = persistReducer(
  { ...persistConfig, key: "auth" },
  authReducer
);


const settingModal = persistReducer(
  { ...persistConfig, key: "modal" },
  settingSlice
);

const store = configureStore({
  reducer: {
    auth: persistAuth, 
    modal: settingModal,          
    darkmode: darkModeReducer,  
    navfix: navfixedReducer,        
    sidebarbg: sidebarNavColorReducer, 
    product: productReducer,       
    sidebarDarkMode: sidebarDarkModeReducer,
    card: cardReducer,
  },
});


const persistor = persistStore(store);

export { store, persistor };