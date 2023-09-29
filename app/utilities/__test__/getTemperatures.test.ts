import { convertToCelsius, getTemperatures } from "../getTemperatures";
import mockApiResponse from "@/__data__/weather.json";

describe("convertToCelsius", () => {
  test("should convert Kelvin to Celsius correctly", () => {
    expect(convertToCelsius(300, "K")).toBeCloseTo(26.85, 2);
  });

  test("should convert Fahrenheit to Celsius correctly", () => {
    expect(convertToCelsius(68, "F")).toBeCloseTo(20, 0);
  });

  test("should return Celsius as is", () => {
    expect(convertToCelsius(25, "C")).toBe(25);
  });

  test("should throw error for unsupported temperature type", () => {
    expect(() => convertToCelsius(25, "UnsupportedType" as any)).toThrowError();
  });
});

describe("getTemperatures", () => {
  test("should return an empty array when no matching city is found", () => {
    const temperatures = getTemperatures(mockApiResponse, "Paris");
    expect(temperatures).toEqual([]);
  });
});
