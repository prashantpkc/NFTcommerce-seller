import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  color: "#eaedfc",
};

const navfixColorSlice = createSlice({
  name: "sidebarbg",
  initialState,
  reducers: {
    setNavColor(state, action) {
      state.color = action.payload;
    },
  },
});

export const { setNavColor } = navfixColorSlice.actions;
export default navfixColorSlice.reducer;
