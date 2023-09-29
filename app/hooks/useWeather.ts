import { useQuery } from "@tanstack/react-query";
import { useNetInfo } from "@react-native-community/netinfo";

import { CityData, FormattedWeatherData, WeatherData } from "@/types";
import { getTemperatures, getUniqueSortedCities } from "@/utilities";
import { useDatabase } from "./useDatabase";
import weatherService from "@/services/weatherService";

const WEATHER_DATA_KEY = "@weather_data";

export const useCities = () => {
  const { getData, storeData } = useDatabase();
  const { isInternetReachable } = useNetInfo();

  const fetchLocalData = async (): Promise<WeatherData[]> => {
    const { data } = await getData<WeatherData[]>(WEATHER_DATA_KEY);
    if (data) {
      return data;
    }
    throw new Error("No data available.");
  };

  const fetchWeatherDataFromAPI = async (): Promise<WeatherData[]> => {
    if (isInternetReachable === false) {
      return await fetchLocalData();
    }

    try {
      const data = await weatherService.getAll();
      await storeData(WEATHER_DATA_KEY, data);
      return data;
    } catch (error) {
      console.error("Error fetching data from API:", error);
      return await fetchLocalData();
    }
  };

  return useQuery<CityData[], Error>({
    queryFn: async () => {
      const data = await fetchWeatherDataFromAPI();
      return getUniqueSortedCities(data);
    },
    queryKey: ["cities"],
  });
};

export const useCityDetails = (cityName: string) => {
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
