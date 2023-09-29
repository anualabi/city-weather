import { CityData, WeatherData } from "@/types";

export function getUniqueSortedCities(apiResponse: WeatherData[]): CityData[] {
  if (!apiResponse || apiResponse.length === 0) {
    return [];
  }

  const cityMap = new Map<string, string>();

  for (const entry of apiResponse) {
    if (entry?.city && entry.city.name && entry.city.picture) {
      cityMap.set(entry.city.name, entry.city.picture);
    }
  }

  const sortedCitiesArray = Array.from(cityMap, ([name, picture]) => ({
    name,
    picture,
  }));

  sortedCitiesArray.sort((a, b) => a.name.localeCompare(b.name));

  return sortedCitiesArray;
}
