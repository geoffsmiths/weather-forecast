import { createSlice } from "@reduxjs/toolkit";

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    value: {},
  },
  reducers: {
    addWeather(state, action) {
      state.value = action.payload;
    },
  },
});

export const { addWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
