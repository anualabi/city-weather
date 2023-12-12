import { CityData, WeatherData } from "@/types";
import _ from "lodash";

export function getUniqueSortedCities(apiResponse: WeatherData[]): CityData[] {
  return _.chain(apiResponse)
    .filter((entry) => !!entry?.city?.name && !!entry.city.picture)
    .uniqBy((entry) => entry.city.name)
    .map((entry) => ({ name: entry.city.name, picture: entry.city.picture }))
    .sortBy("name")
    .value();
}
