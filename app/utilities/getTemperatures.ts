import { FormattedWeatherData, TemperatureInfo, WeatherData } from "@/types";

// Function to convert temperature from Kelvin, Fahrenheit or Celsius to Celsius
export function convertToCelsius(temp: number, type: string): number {
  switch (type) {
    case "K":
      return temp - 273.15; // Convert from Kelvin to Celsius
    case "F":
      return (temp - 32) / 1.8; // Convert from Fahrenheit to Celsius
    case "C":
      return temp; // Already in Celsius
    default:
      throw new Error(`Unsupported temperature type: ${type}`);
  }
}

// Function to get formatted weather data for a given city
export function getTemperatures(
  data: WeatherData[],
  cityName: string
): FormattedWeatherData[] {
  // Filter the data to include only entries for the specified city
  const filteredData = data.filter((entry) => entry.city.name === cityName);

  // Object to group weather data by date
  const groupedByDate: { [key: string]: WeatherData[] } = {};

  // Group data by date
  filteredData.forEach((entry) => {
    const date = new Date(entry.date);
    const key = date.toISOString().split("T")[0];
    groupedByDate[key] = groupedByDate[key] || [];
    groupedByDate[key].push(entry);
  });

  // Process each group of data
  return Object.values(groupedByDate).map((entries) => {
    // Sort entries by time
    entries.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const date = new Date(entries[0].date);

    // Options for formatting the date
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "long",
      day: "numeric",
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );

    // Extract day, month, and date number from formatted date string
    const [day, month, dateNumber] = formattedDate.replace(",", "").split(" ");
    const year = date.getFullYear();

    // Map each entry to temperature information
    const temperatures: TemperatureInfo[] = entries.map((entry) => {
      const celsius = convertToCelsius(entry.temp, entry.tempType);

      const entryDate = new Date(entry.date);
      const time = entryDate.toISOString().split("T")[1].substring(0, 8);
      return {
        time,
        degrees: `${celsius.toFixed(2)}°C`, // Format temperature with 2 decimal places
      };
    });

    // Return formatted weather data
    return {
      day,
      date: dateNumber,
      month,
      year,
      temperatures,
    };
  });
}
