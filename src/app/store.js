import { configureStore } from "@reduxjs/toolkit";
import geoReducer from "../features/geo/geoSlice.js";
import weatherReducer from "../features/weather/weatherSlice.js";
import weatherForecastReducer from "../features/weather/weatherForecastSlice.js";

export default configureStore({
  reducer: {
    geo: geoReducer,
    weather: weatherReducer,
    weatherforecast: weatherForecastReducer,
  },
});
