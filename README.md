# DMI Challenge App

This application is an small api that checks if the temperature of some city is above or below 15 degrees celsius.

## Installation

Clone the repo and run the following command

```bash
npm install
```

Set environment variables as addressed in .env.example file and rename it to .env.

Note: please be sure to use a valid APP_ID otherwise the app will not work properly, you can create an account in [OpenWeather](https://home.openweathermap.org) and go to [Api Keys](https://home.openweathermap.org/api_keys).

```bash
APP_ID = YOUR_APP_ID
WEATHER_API_URL = https://api.openweathermap.org/data/2.5/weather
PORT=8000
TEMP_OVER_COMPARISON=15
```

## Usage

Run app

```bash
npm run start
```

You can check if temperature in 'Río Cuarto' city is above 15 degrees celsius, by entering the city latitude and longitude using this curl command:

```bash
curl 'http://localhost:8000/weather/check?lat=-33.115488081397274&lon=-64.36399085898566'
```

or any city, just enter relevant latitude and longitude.

```bash
curl 'http://localhost:8000/weather/check?lat=10.481212949237785&lon=-66.89792114512568'
```

Also, if you want to know the temperature for a city you can use this endpoint:

```bash
curl 'http://localhost:8000/weather?lat=-33.115488081397274&lon=-64.36399085898566'
```

## Caching

The two endpoints are set for a TTL of 15 seconds. So after hitting any of these you'll note that the second request will be faster than the first one because it took the response directly the cache value, after passing 15 seconds the next request will take more than that.

## Tests

Run tests

```bash
npm run test
```
