import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fix: false,
};

const navfixSlice = createSlice({
  name: "nevfix",
  initialState,
  reducers: {
    setNav(state) {
      state.fix = true;
    },
    removeNav(state) {
      state.fix = false;
    },
  },
});

export const { setNav, removeNav } = navfixSlice.actions;
export default navfixSlice.reducer;
