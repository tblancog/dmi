import {
  APP_ID,
  KELVIN_CELSIUS_COMPARISON,
  TEMP_OVER_COMPARISON,
  WEATHER_API_URL,
} from "../config";
import axios from "axios";
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

/**
 * Checks if the temperature is over the passed number and returns a boolean.
 * @param {number} temp - number - this is the parameter that we're passing into the function.
 */
export const checkTempOver = (temp: number): boolean =>
  temp > TEMP_OVER_COMPARISON;

/**
 * It takes a string and returns an Error object with the string as the message
 * @param {string} errorMsg - The error message to be displayed.
 */
export const apiError = (errorMsg: string): Error =>
  new Error(`API Error: ${errorMsg}`);

/**
 * Replace all non-word characters with a space, replace all spaces and underscores with a dash, and
 * remove all leading and trailing dashes.
 * @param {string} str - The string to slugify.
 */
export const slugify = (str: string): string =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

/**
 * "Convert a temperature in Kelvin to Celsius."
 *
 * The function takes a number as an argument and returns a number
 * @param {number} kelvin - number - The kelvin temperature to convert.
 */
export const convertKelvinToCelsius = (kelvin: number): number =>
  kelvin - KELVIN_CELSIUS_COMPARISON;
