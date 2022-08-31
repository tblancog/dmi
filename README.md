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

You can check if temperature in 'Río Cuarto' city is above 15 degrees celsius, doing this curl command:

```bash
curl 'http://localhost:8000/weather/check?city=R%C3%ADo%20Cuarto%2C%20C%C3%B3rdoba%2C%20AR'
```

or any city, like 'Caracas,VE'

```bash
curl 'http://localhost:8000/weather/check?city=Caracas%2CVE'
```

The important thing is to specify the location properly, separated by commas. example: 'Buenos Aires, AR​', 'London, UK'.

Also, if you want to know the temperature for a city, you can use the following syntax:

```bash
curl 'http://localhost:8000/weather?city=R%C3%ADo%20Cuarto%2C%20C%C3%B3rdoba%2C%20AR'
```

## Caching

The two endpoints are set for a TTL of 15 seconds. So after hitting any of these you'll note that the second request will be faster than the first one because it took the response directly the the cache value, after passing 15 seconds the next request will take more than that.

## Tests

Run tests

```bash
npm run test
```
