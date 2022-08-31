import { FastifyInstance } from "fastify";
import { checkWeatherByCity, getWeatherByCity } from "../../controllers";
import { WeatherCheck, Weather } from "../../schemas";

const getWeatherCheckOpts = {
  schema: {
    response: {
      200: WeatherCheck,
    },
  },
  handler: checkWeatherByCity,
};
/* Options for Weather */
const getWeatherOpts = {
  schema: {
    response: {
      200: Weather,
    },
  },
  handler: getWeatherByCity,
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
