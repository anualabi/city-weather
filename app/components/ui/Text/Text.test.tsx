import renderer from "react-test-renderer";
import { render } from "@testing-library/react-native";
import "@testing-library/jest-native/extend-expect";

import Text, { TextProps } from "./Text";

describe("Text component", () => {
  test("should render correctly", () => {
    const tree = renderer.create(<Text />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should render text content from the "text" prop', () => {
    const { getByText } = render(<Text text="Hello, World!" />);

    expect(getByText("Hello, World!")).toBeTruthy();
  });

  test("should render children when provided", () => {
    const { getByText } = render(<Text>Hello, World!</Text>);

    expect(getByText("Hello, World!")).toBeTruthy();
  });

  test("should apply custom styles when provided", () => {
    const customStyle: TextProps["style"] = { fontSize: 25, color: "red" };
    const { getByText } = render(
      <Text style={customStyle} text="Styled Text" />
    );
    expect(getByText("Styled Text")).toHaveStyle(customStyle);
  });
});
