import { createSlice } from "@reduxjs/toolkit";

const geoSlice = createSlice({
  name: "geo",
  initialState: {
    value: {},
  },
  reducers: {
    add(state, action) {
      state.value = action.payload;
    },
  },
});

export const { add } = geoSlice.actions;
export default geoSlice.reducer;
