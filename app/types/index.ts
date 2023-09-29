export type CityData = {
  name: string;
  picture: string;
};

export type WeatherData = {
  date: string;
  city: CityData;
  tempType: string;
  temp: number;
};

export type TemperatureInfo = {
  time: string;
  degrees: string;
};

export type FormattedWeatherData = {
  day: string;
  date: string;
  month: string;
  year: number;
  temperatures: TemperatureInfo[];
};

export type IconName =
  | "arrow-left"
  | "chevron-right"
  | "chevron-down"
  | "cog"
  | "close";
