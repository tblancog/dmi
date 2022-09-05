import axios from "axios";
import { APP_ID, WEATHER_API_URL } from "../config";
import { ICityWeather } from "../types";

/**
 *  * Does an external request to the weather api to determine the temperature for the given latitude and longitude
 * @param {number} lat - number,
 * @param {number} lon - longitude
 * @returns A promise that resolves to an object with the following shape:
 * {
 *   name: string;
 *   temp: number;
 * }
 */
export const getApiWeatherByLatLon = async (
  lat: number,
  lon: number
): Promise<ICityWeather> => {
  const options = {
    method: "GET",
    url: WEATHER_API_URL,
    params: {
      appid: APP_ID,
      lat,
      lon,
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
