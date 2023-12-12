import { useQuery } from "@tanstack/react-query";

import { FormattedWeatherData, WeatherData } from "@/types";
import { getTemperatures } from "@/utilities";
import { useDatabase } from "./useDatabase";
import { WEATHER_DATA_KEY } from "@/constants/weather";

const useCity = (cityName: string) => {
  const { getData } = useDatabase();

  return useQuery<FormattedWeatherData[], Error>({
    queryFn: async () => {
      const response = await getData<WeatherData[]>(WEATHER_DATA_KEY);
      const data = response.data;

      if (!data) {
        throw new Error("No data available.");
      }
      return getTemperatures(data, cityName);
    },
    queryKey: ["city", cityName],
  });
};

export default useCity;
