import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const forceUpdateSlice = createSlice({
  name: "forceUpdate",
  initialState,
  reducers: {
    setReducerValue: (state) => {
      state.value += 1;
    },
  },
});

export const { setReducerValue } = forceUpdateSlice.actions;
export default forceUpdateSlice.reducer;
