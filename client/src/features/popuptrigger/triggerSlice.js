import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const triggerSlice = createSlice({
  name: "trigger",
  initialState,
  reducers: {
    setTrigger: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setTrigger } = triggerSlice.actions;

export default triggerSlice.reducer;
