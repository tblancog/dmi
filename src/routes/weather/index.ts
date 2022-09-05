import { FastifyInstance } from "fastify";
import { checkWeatherByLatLong, getWeatherByLatLon } from "../../controllers";
import { WeatherCheck, Weather, WeatherQueryString } from "../../schemas";

const getWeatherCheckOpts = {
  schema: {
    querystring: WeatherQueryString,
    response: {
      200: WeatherCheck,
    },
  },
  handler: checkWeatherByLatLong,
};
/* Options for Weather */
const getWeatherOpts = {
  schema: {
    querystring: WeatherQueryString,
    response: {
      200: Weather,
    },
  },
  handler: getWeatherByLatLon,
};
/**
 * Defines weather routes for weather check
 * @param {FastifyInstance} fastify - FastifyInstance - this is the fastify instance that we created in
 * the index.ts file.
 */
const routes = async (fastify: FastifyInstance) => {
  await fastify.get("/", getWeatherOpts);
  await fastify.get("/check", getWeatherCheckOpts);
};
export default routes;
