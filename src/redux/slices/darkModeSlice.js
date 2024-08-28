import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dark: false,
};

const darkSlice = createSlice({
  name: "darkmode",
  initialState,
  reducers: {
    setDark(state) {
      state.dark = true;  
    },
    removeDark(state) {
      state.dark = false;
    },
  },
});

export const { setDark, removeDark } = darkSlice.actions;
export default darkSlice.reducer;
