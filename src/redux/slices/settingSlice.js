import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  type: "",
};

const openSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openSettingModal(state, actions) {
      state.open = actions.payload.open;
      state.type = actions.payload.type;
    },
  },
});
export const { openSettingModal } = openSlice.actions;
export default openSlice.reducer;
