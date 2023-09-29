import { render } from "@testing-library/react-native";
import "@testing-library/jest-native/extend-expect";

import LanguageSelector from "./LanguageSelector";

jest.mock("@/contexts/TranslationContext", () => ({
  useTranslation: jest.fn().mockReturnValue({
    currentLanguage: "en",
    setLanguage: jest.fn(),
  }),
}));

describe("LanguageSelector", () => {
  test("should render correctly", () => {
    const { getByTestId } = render(<LanguageSelector />);
    expect(getByTestId("language-selector")).toBeDefined();
  });

  test("should display the current language", () => {
    const { getByText } = render(<LanguageSelector />);

    expect(getByText(/en/i)).toBeDefined();
  });
});
