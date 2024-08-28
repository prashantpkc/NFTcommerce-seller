import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarDark: false,
};

const sidebarDarkModeSlice = createSlice({
  name: "sidebarDarkMode",
  initialState,
  reducers: {
    setSidebarDark(state) {
      state.isSidebarDark = true;
    },
    setSidebarLight(state) {
      state.isSidebarDark = false;
    },
  },
});

export const { setSidebarDark, setSidebarLight } = sidebarDarkModeSlice.actions;
export default sidebarDarkModeSlice.reducer;
