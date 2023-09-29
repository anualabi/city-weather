import { useQuery } from "@tanstack/react-query";

import { WeatherData } from "@/types";

import weatherService from "@/services/weatherService";

export const useCities = () => {
  const fetchWeatherData = async (): Promise<WeatherData[]> => {
    const data = await weatherService.getAll();
    return data;
  };

  return useQuery<WeatherData[], Error>({
    queryFn: fetchWeatherData,
    queryKey: ["cities"],
  });
};
