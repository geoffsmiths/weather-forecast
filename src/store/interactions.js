import { add } from "../features/geo/geoSlice";
import { addWeather } from "../features/weather/weatherSlice";

let dispatch;

// Executed when geolocation is supported
const successCallback = (position) => {
  dispatch(
    add({
      lat: position.coords.latitude,
      long: position.coords.longitude,
      acc: position.coords.accuracy,
    })
  );

  fetch(
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
      position.coords.latitude +
      "&lon=" +
      position.coords.longitude +
      "&units=metric&appid=" +
      process.env.REACT_APP_API_KEY_OPENWEATHER
  )
    .then((res) => res.json())
    .then((jsonData) => {
      dispatch(addWeather(jsonData));
    });
};

// Executed when geolocation is NOT supported
const errorCallback = (error) => {
  console.log(error);
};

// Check if the browser supports geolocation
export const initGeoLocation = async (_dispatch) => {
  dispatch = _dispatch;
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } else {
    console.log("Geolocation not supported");
  }
};
