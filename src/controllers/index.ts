import { apiError, checkTempOver, convertKelvinToCelsius } from "../helpers";
import { FastifyRequest, FastifyReply } from "fastify";
import { ICityWeather, IQuerystring, IWeatherCheck } from "../types";
import { getApiWeatherByCity } from "../services/";

/**
 * It receives a request and a reply, then it gets the temperature in celsius degrees from the
 * OpenWeatherMap API, and finally it returns a response with the result of the checkTempOver function
 * @param {FastifyRequest} request - FastifyRequest - the request object
 * @param {FastifyReply} reply - FastifyReply - this is the reply object that will be used to send the
 * response back to the client.
 * @returns An IWeatherCheck object representing whether if the temperature is above or below TEMP_OVER_COMPARISON
 */
export const checkWeatherByCity = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<IWeatherCheck> => {
  try {
    const { city } = request.query as IQuerystring;
    const { temp: kelvinDegrees } = await getApiWeatherByCity(city);
    const celsiusDegrees = Math.floor(convertKelvinToCelsius(kelvinDegrees));
    return reply.send({ result: checkTempOver(celsiusDegrees) });
  } catch (error) {
    if (error instanceof Error) {
      throw apiError(error.message);
    }
    throw new Error("Unexpected error checking weather");
  }
};

/**
 * It gets the weather by city from the OpenWeatherMap API, converts the temperature from Kelvin to
 * Celsius, and returns the city name and temperature in Celsius
 * @param {FastifyRequest} request - FastifyRequest - this is the request object that Fastify will pass
 * to the handler.
 * @param {FastifyReply} reply - FastifyReply - This is the reply object that will be used to send the
 * response back to the client.
 * @returns A ICityWeather object with the resulting temperature for city.
 */
export const getWeatherByCity = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<ICityWeather> => {
  try {
    const { city } = request.query as IQuerystring;
    const { name, temp: kelvinDegrees } = await getApiWeatherByCity(city);
    const celsiusDegrees = Math.floor(convertKelvinToCelsius(kelvinDegrees));
    return reply.send({ name: name, temp: celsiusDegrees });
  } catch (error) {
    if (error instanceof Error) {
      throw apiError(error.message);
    }
    throw new Error("Unexpected error getting weather by city");
  }
};
