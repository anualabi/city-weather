import { act, renderHook } from "@testing-library/react-hooks";
import { useDatabase } from "../useDatabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

jest.mock("@react-native-async-storage/async-storage");

describe("useDatabase", () => {
  test("should store data", async () => {
    (AsyncStorage.setItem as jest.Mock).mockResolvedValue(null);

    const { result } = renderHook(() => useDatabase());

    await act(async () => {
      await result.current.storeData("testKey", { test: "data" });
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "testKey",
      JSON.stringify({ test: "data" })
    );
  });

  test("should get data", async () => {
    const data = { test: "data" };
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(data));

    const { result } = renderHook(() => useDatabase());

    let response;
    await act(async () => {
      response = await result.current.getData("testKey");
    });

    expect(response).toEqual({ data, error: null });
  });

  test("should handle an error", async () => {
    const error = new Error("An error occurred");
    (AsyncStorage.getItem as jest.Mock).mockRejectedValue(error);

    const { result, waitForNextUpdate } = renderHook(() => useDatabase());

    let response;
    await act(async () => {
      response = await result.current.getData("testKey");
    });

    expect(response).toEqual({ data: null, error });
  });
});
