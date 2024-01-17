import { createSlice } from "@reduxjs/toolkit";

const weatherForecastSlice = createSlice({
  name: "weather",
  initialState: {
    value: {},
  },
  reducers: {
    addWeatherForecast(state, action) {
      state.value = action.payload;
    },
  },
});

export const { addWeatherForecast } = weatherForecastSlice.actions;
export default weatherForecastSlice.reducer;
