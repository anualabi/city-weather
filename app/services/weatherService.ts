import APIClient from "./apiClient";
import { WeatherData } from "@/types";

export default new APIClient<WeatherData>("/weather");
