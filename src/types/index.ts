export interface ICityWeather {
  name: string;
  temp: number;
}

export interface IQuerystring {
  appid: string;
  city: string;
}

export interface IWeatherCheck {
  result: boolean;
}
