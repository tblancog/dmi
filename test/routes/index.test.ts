import { test } from "tap";
import { build, Test } from "../helper";
import { ImportMock } from "ts-mock-imports";
import * as weatherService from "../../src/services";

test("/weather/check returns json and 200 statusCode", async (t: Test) => {
  const fastify = await build(t);
  const stubGetApiWeatherByCity = ImportMock.mockFunction(
    weatherService,
    "getApiWeatherByCity",
    {
      name: "Some City",
      temp: 285, //285 kelvin degrees,
    }
  );
  t.teardown(() => {
    fastify.close();
    stubGetApiWeatherByCity.restore();
  });
  const response = await fastify.inject({
    method: "GET",
    url: "/weather/check?city=SomeCity",
  });
  t.equal(response.statusCode, 200);
  t.equal(response.headers["content-type"], "application/json; charset=utf-8");
});

test("/weather/check returns 500 statusCode", async (t: Test) => {
  const fastify = await build(t);
  const stubGetApiWeatherByCity = ImportMock.mockFunction(
    weatherService,
    "getApiWeatherByCity",
    {
      name: "Some City",
      temp: 300, //300 kelvin degrees,
    }
  );
  t.teardown(() => {
    fastify.close();
    stubGetApiWeatherByCity.restore();
  });
  const response = await fastify.inject({
    method: "GET",
    url: "/weather/check?city=SomeCity",
  });
  console.log({ response: response.json() });
});

test("/weather/check should return { result: false } when temperature is below 15 degrees celsius (288.15)", async (t: Test) => {
  const fastify = await build(t);
  const stubGetApiWeatherByCity = ImportMock.mockFunction(
    weatherService,
    "getApiWeatherByCity",
    {
      name: "Some City",
      temp: 278, //278 kelvin = 5 celsius,
    }
  );
  t.teardown(() => {
    fastify.close();
    stubGetApiWeatherByCity.restore();
  });
  const response = await fastify.inject({
    method: "GET",
    url: "/weather/check?city=SomeCity",
  });
  t.equal(response.statusCode, 200);
  t.equal(response.headers["content-type"], "application/json; charset=utf-8");
  const json = response.json();
  t.equal(json.result, false);
});
test("/weather/check should return { result: true } when temperature is above 15 degrees celsius (288.15)", async (t: Test) => {
  const fastify = await build(t);
  const stubGetApiWeatherByCity = ImportMock.mockFunction(
    weatherService,
    "getApiWeatherByCity",
    {
      name: "Some City",
      temp: 290, //290 kelvin = 16 celsius,
    }
  );
  t.teardown(() => {
    fastify.close();
    stubGetApiWeatherByCity.restore();
  });
  const response = await fastify.inject({
    method: "GET",
    url: "/weather/check?city=SomeCity",
  });
  t.equal(response.statusCode, 200);
  t.equal(response.headers["content-type"], "application/json; charset=utf-8");
  const json = response.json();
  t.equal(json.result, true);
});
