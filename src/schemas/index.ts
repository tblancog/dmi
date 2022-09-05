export const Weather = {
  type: "object",
  properties: {
    name: { type: "string" },
    temp: { type: "number" },
  },
};

export const WeatherCheck = {
  type: "object",
  properties: {
    result: { type: "boolean" },
  },
};

export const ApiWeatherParams = {
  type: "object",
  properties: {
    lat: { type: "string" },
    lon: { type: "string" },
  },
};

export const WeatherQueryString = {
  type: "object",
  properties: {
    lat: { type: "number" },
    lon: { type: "number" },
  },
};
