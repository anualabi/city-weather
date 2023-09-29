import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://us-central1-mobile-assignment-server.cloudfunctions.net",
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = async (): Promise<T[]> => {
    const { data } = await axiosInstance.get<T[]>(this.endpoint);
    return data;
  };
}

export default APIClient;
