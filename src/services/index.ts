import axios from "axios";
import { APP_ID, WEATHER_API_URL } from "../config";
import { ICityWeather } from "../types";

/**
 * Does an external request to the weather api to determine the temperature for the given city
 * with the city name and temperature
 * @param {string} city - The city name to get the weather for.
 * @returns An object with the name and temperature of the city.
 */
export const getApiWeatherByCity = async (
  city: string
): Promise<ICityWeather> => {
  const options = {
    method: "GET",
    url: WEATHER_API_URL,
    params: {
      appid: APP_ID,
      q: city,
      limit: "1",
    },
  };
  try {
    const res = await axios.request(options);
    const {
      name,
      main: { temp },
    } = res.data;
    return {
      name,
      temp,
    };
  } catch (error) {
    throw new Error("Error while trying to get information from API");
  }
};
