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
