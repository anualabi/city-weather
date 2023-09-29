import { FormattedWeatherData, TemperatureInfo, WeatherData } from "@/types";

export function convertToCelsius(temp: number, type: string): number {
  switch (type) {
    case "K":
      return temp - 273.15;
    case "F":
      return (temp - 32) / 1.8;
    case "C":
      return temp;
    default:
      throw new Error(`Unsupported temperature type: ${type}`);
  }
}

export function getTemperatures(
  data: WeatherData[],
  cityName: string
): FormattedWeatherData[] {
  const filteredData = data.filter((entry) => entry.city.name === cityName);

  const groupedByDate: { [key: string]: WeatherData[] } = {};

  filteredData.forEach((entry) => {
    const date = new Date(entry.date);
    const key = date.toISOString().split("T")[0];
    groupedByDate[key] = groupedByDate[key] || [];
    groupedByDate[key].push(entry);
  });

  return Object.values(groupedByDate).map((entries) => {
    entries.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const date = new Date(entries[0].date);

    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "long",
      day: "numeric",
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );

    const [day, month, dateNumber] = formattedDate.replace(",", "").split(" ");
    const year = date.getFullYear();

    const temperatures: TemperatureInfo[] = entries.map((entry) => {
      const celsius = convertToCelsius(entry.temp, entry.tempType);

      const entryDate = new Date(entry.date);
      const time = entryDate.toISOString().split("T")[1].substring(0, 8);
      return {
        time,
        degrees: `${celsius.toFixed(2)}°C`,
      };
    });

    return {
      day,
      date: dateNumber,
      month,
      year,
      temperatures,
    };
  });
}
