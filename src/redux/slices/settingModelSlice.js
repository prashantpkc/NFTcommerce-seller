import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
};

const modalSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setSetting(state) {
      state.open = true;
    },
    removeSetting(state) {
      state.open = initialState.open;
    },
  },
});

export const { setSetting, removeSetting } = modalSlice.actions;
export default modalSlice.reducer;
