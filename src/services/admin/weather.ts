import axios from "axios";

const weatherApiUrl = import.meta.env.VITE_WEATHER_API;
export const weather = async () => {
  return await axios.get(weatherApiUrl);
};
