// Mandatory, it should be set APP_ID in .env file
export const APP_ID = process.env.APP_ID;

// These constants are optional and may not be set in .env file
export const WEATHER_API_URL =
  process.env.WEATHER_API_URL ||
  "https://api.openweathermap.org/data/2.5/weather";
export const KELVIN_CELSIUS_COMPARISON = 273.15;
export const TEMP_OVER_COMPARISON = process.env.TEMP_OVER_COMPARISON || 15;
