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

export type IconName = "chevron-right";
