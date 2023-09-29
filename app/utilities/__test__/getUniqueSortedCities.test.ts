import { getUniqueSortedCities } from "../getUniqueSortedCities";
import { WeatherData, CityData } from "@/types";
import mockApiResponse from "@/__data__/weather.json";

describe("getUniqueSortedCities", () => {
  test("should return sorted unique cities", () => {
    const expected: CityData[] = [
      { name: "Barcelona", picture: "barcelona.jpg" },
      { name: "Hong Kong", picture: "hong_kong.jpg" },
    ];

    const result = getUniqueSortedCities(mockApiResponse);
    expect(result).toEqual(expected);
  });

  test("should handle empty api response gracefully", () => {
    const mockApiResponse: WeatherData[] = [];

    const result = getUniqueSortedCities(mockApiResponse);
    expect(result).toEqual([]);
  });
});
