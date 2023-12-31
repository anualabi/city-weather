import { useNetInfo } from "@react-native-community/netinfo";
import { useQuery } from "@tanstack/react-query";

import { WEATHER_DATA_KEY } from "@/constants/weather";
import weatherService from "@/services/weatherService";
import { CityData, WeatherData } from "@/types";
import { getUniqueSortedCities } from "@/utilities";
import { useDatabase } from "./useDatabase";

const useCities = () => {
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

export default useCities;
