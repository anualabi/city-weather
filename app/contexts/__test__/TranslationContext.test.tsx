import { Pressable, Text } from "react-native";
import { act, render, waitFor } from "@testing-library/react-native";
import "@testing-library/jest-native/extend-expect";

import { TranslationProvider, useTranslation } from "../TranslationContext";

const TestComponent = () => {
  const { currentLanguage, setLanguage } = useTranslation();

  return (
    <>
      <Text testID="language">{currentLanguage}</Text>
      <Pressable
        testID="changeLanguageButton"
        onPress={() => setLanguage("de")}
      >
        <Text>Change Language</Text>
      </Pressable>
    </>
  );
};

describe("TranslationContext", () => {
  test("should render children", () => {
    const { getByText } = render(
      <TranslationProvider>
        <TestComponent />
      </TranslationProvider>
    );

    expect(getByText("en")).toBeDefined();
  });

  test("should change language when setLanguage is called", async () => {
    const { getByTestId, getByText } = render(
      <TranslationProvider>
        <TestComponent />
      </TranslationProvider>
    );

    act(() => {
      getByTestId("changeLanguageButton").props.onClick();
    });

    await waitFor(() => {
      expect(getByText("de")).toBeDefined();
    });
  });
});
