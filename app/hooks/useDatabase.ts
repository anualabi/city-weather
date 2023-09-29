import AsyncStorage from "@react-native-async-storage/async-storage";

interface DatabaseResponse<T> {
  data: T | null;
  error: Error | null;
}

export const useDatabase = () => {
  const getData = async <T>(key: string): Promise<DatabaseResponse<T>> => {
    try {
      const data = await AsyncStorage.getItem(key);
      if (data !== null) {
        return { data: JSON.parse(data), error: null };
      }
      return { data: null, error: null };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error : new Error(String(error)),
      };
    }
  };

  const storeData = async <T>(key: string, data: T): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error("Error storing data to database:", error);
      throw error;
    }
  };

  return { getData, storeData };
};
