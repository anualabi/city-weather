import { WeatherData } from "@/types";
import APIClient from "./apiClient";

export default new APIClient<WeatherData>("/weather");
