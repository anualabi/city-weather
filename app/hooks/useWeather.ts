import { useQuery } from "@tanstack/react-query";

import { getUniqueSortedCities } from "@/utilities";
import { CityData, WeatherData } from "@/types";

import weatherService from "@/services/weatherService";

export const useCities = () => {
  const fetchWeatherData = async (): Promise<WeatherData[]> => {
    const data = await weatherService.getAll();
    return data;
  };

  return useQuery<CityData[], Error>({
    queryFn: async () => {
      const data = await fetchWeatherData();
      return getUniqueSortedCities(data);
    },
    queryKey: ["cities"],
  });
};
